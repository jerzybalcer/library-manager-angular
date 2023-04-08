import { Component } from '@angular/core';
import { Album } from '../interfaces/album.interface';
import { LocalDB } from 'src/local-db/local-db';
import { SpotifyApi } from 'src/spotify/spotify-api';

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.css'],
  providers: [SpotifyApi, LocalDB]
})
export class AlbumsListComponent {
  albums: Album[] = [];

  constructor(private spotifyApi: SpotifyApi, private localDB: LocalDB) {}

  async ngOnInit() {
    const albumsResponse = await this.spotifyApi.getAllAlbums();
    this.localDB.sync(albumsResponse);
    this.albums = this.localDB.loadAll();
  }
}
