import { Injectable } from '@angular/core';
import { Album } from 'src/interfaces/album.interface';

@Injectable()
export class LocalDB {
  sync(spotifyAlbums: any[]) {
    const localAlbums = this.loadAll();

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

    localStorage.setItem('albums', JSON.stringify(syncedAlbums));
  }

  loadAll(): Album[] {
    return JSON.parse(localStorage.getItem('albums') ?? '[]');
  }
}
