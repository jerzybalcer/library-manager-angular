import { Component } from '@angular/core';
import { authenticate } from 'src/spotify/spotify-auth';
import { Album } from '../interfaces/album.interface';
import { getAlbums } from 'src/spotify/spotify-api';

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.css'],
})
export class AlbumsListComponent {
  albums: Album[] = [];

  async ngOnInit() {
    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');

    if (code) {
      await authenticate(code);
      const albumsResponse = await getAlbums();
      this.albums = albumsResponse.map((a: any) => {
        return {
          title: a.album.name,
          artist: a.album.artists[0].name,
          imageUrl: a.album.images[1].url,
        };
      });
    }
  }
}
