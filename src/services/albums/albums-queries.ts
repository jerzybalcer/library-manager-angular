import { Injectable } from '@angular/core';
import { Album } from 'src/models/album.interface';
import { SortBy } from 'src/models/sort-by.type';

@Injectable()
export class AlbumsQueries {
  searchAlbums(albums: Album[], searchPhrase: string): Album[] {
    return albums.filter((a) => {
      if (
        a.title.toLowerCase().includes(searchPhrase.toLowerCase()) ||
        a.artist.toLowerCase().includes(searchPhrase.toLowerCase())
      )
        return true;
      else {
        return false;
      }
    });
  }

  sortAlbums(albums: Album[], sortBy: SortBy, isAscending: boolean): Album[] {
    return albums.sort((album1, album2) => {
      const value1 = album1[sortBy as keyof Album] as string;
      const value2 = album2[sortBy as keyof Album] as string;

      if (isAscending)
        return value1.toLowerCase() > value2.toLowerCase() ? 1 : -1;
      else return value1.toLowerCase() > value2.toLowerCase() ? -1 : 1;
    });
  }

  filterAlbums(albums: Album[], filters: string[]): Album[] {
    if (filters.length === 0) return albums;

    return albums.filter((a) => a.tags.some((t) => filters.includes(t.name)));
  }
}
