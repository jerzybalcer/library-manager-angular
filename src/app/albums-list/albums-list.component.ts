import { Component } from '@angular/core';
import { authenticate } from 'src/spotify/spotify-auth';
import { Album } from '../interfaces/album.interface';
import { getAllAlbums } from 'src/spotify/spotify-api';
import { LocalDB } from 'src/local-db/local-db';

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
      //const albumsResponse = await getAllAlbums();
      //LocalDB.sync(albumsResponse);
      this.albums = LocalDB.loadAll();
    }
  }
}
