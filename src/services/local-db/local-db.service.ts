import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { Album } from 'src/models/album.interface';
import { Tag } from 'src/models/tag.interface';
import { getDurationFromMs } from 'src/utils/time-utils';
import { firstValueFrom, switchMap, map, of, iif, EMPTY } from 'rxjs';

@Injectable()
export class LocalDB {
  constructor(private dbService: NgxIndexedDBService) {}

  async sync(spotifyAlbums: any[]) {
    const localAlbums = await this.loadAllAlbums();
    const syncedAlbums = localAlbums;

    spotifyAlbums.forEach((spotify) => {
      if (
        localAlbums.some(
          (local) =>
            local.artist === spotify.album.artists[0].name &&
            local.title === spotify.album.name
        ) === false
      ) {
        syncedAlbums.push({
          title: spotify.album.name,
          artist: spotify.album.artists[0].name,
          imageUrl: spotify.album.images[0].url,
          spotifyUrl: spotify.album.external_urls.spotify,
          totalTracks: spotify.album.total_tracks,
          addedAt: spotify.added_at,
          releasedAt: spotify.album.release_date,
          tags: [],
          tracks: spotify.album.tracks.items.map((t: any) => {
            return {
              title: t.name,
              artists: t.artists.map((a: any) => a.name),
              duration: getDurationFromMs(t.duration_ms),
            };
          }),
        });
      }
    });

    localAlbums.forEach((local, index) => {
      if (
        spotifyAlbums.some(
          (spotify) =>
            spotify.album.artists[0].name === local.artist &&
            spotify.album.name === local.title
        ) === false
      ) {
        syncedAlbums.splice(index, 1);
      }
    });

    await firstValueFrom(this.dbService.bulkAdd('albums', syncedAlbums));
  }

  async loadAllAlbums(): Promise<Album[]> {
    return await firstValueFrom(this.dbService.getAll<Album>('albums'));
  }

  async loadAllTags(): Promise<Tag[]> {
    return await firstValueFrom(this.dbService.getAll<Tag>('tags'));
  }

  addTag(newTag: Tag, album: Album) {
    if (!album.id) return of(album);

    if (album.tags.some((t) => t.name === newTag.name)) return of(album);

    const modifiedAlbum = album;

    if (newTag.id) {
      modifiedAlbum.tags.push(newTag);

      return this.dbService.update<Album>('albums', modifiedAlbum).pipe(
        map(() => {
          return modifiedAlbum;
        })
      );
    } else {
      return this.dbService.add<Tag>('tags', newTag).pipe(
        switchMap((addedTag) => {
          modifiedAlbum.tags.push(addedTag);

          return this.dbService.update<Album>('albums', modifiedAlbum).pipe(
            map(() => {
              return modifiedAlbum;
            })
          );
        })
      );
    }
  }

  removeTag(toRemove: Tag, album: Album) {
    if (!album.id || !toRemove.id) return of(album);

    if (!album.tags.some((t) => t.name === toRemove.name)) return of(album);

    const modifiedAlbum = album;

    modifiedAlbum.tags.splice(modifiedAlbum.tags.indexOf(toRemove), 1);

    return this.dbService.update<Album>('albums', modifiedAlbum).pipe(
      switchMap(() => {
        return this.dbService.getAll<Album>('albums').pipe(
          switchMap((albums: Album[]) => {
            const otherAlbumsWithTag = albums.filter((a) =>
              a.tags.some((t) => t.name === toRemove.name)
            );

            if (otherAlbumsWithTag.length === 0)
              return this.dbService
                .delete<Tag>('tags', toRemove.id!)
                .pipe(map(() => modifiedAlbum));

            return EMPTY;
          })
        );
      })
    );
  }
}
