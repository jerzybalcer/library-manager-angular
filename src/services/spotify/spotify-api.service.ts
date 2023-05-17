import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SpotifyApi {
  constructor(private httpClient: HttpClient) {}

  getUser = () => {
    const accessToken = localStorage.getItem('access_token');

    return this.httpClient.get<any>('https://api.spotify.com/v1/me/', {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
      withCredentials: false,
    });
  };

  getAllAlbums = async () => {
    let albums: any[] = [];

    let currentFragment = await firstValueFrom(this.getAlbums(50, 0));

    albums = albums.concat(currentFragment.items);

    while (currentFragment.next) {
      currentFragment = await firstValueFrom(this.getAlbums(50, albums.length));
      albums = albums.concat(currentFragment.items);
    }

    return albums;
  };

  private getAlbums = (limit: number, offset: number) => {
    const accessToken = localStorage.getItem('access_token');

    return this.httpClient.get<any>(
      `https://api.spotify.com/v1/me/albums?limit=${limit}&offset=${offset}`,
      {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
        withCredentials: false,
      }
    );
  };
}
