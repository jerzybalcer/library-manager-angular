import { Component, Output, EventEmitter } from '@angular/core';
import { Album } from '../../interfaces/album.interface';
import { LocalDB } from 'src/services/local-db/local-db';
import { SpotifyApi } from 'src/services/spotify/spotify-api';

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.css'],
  providers: [SpotifyApi, LocalDB]
})
export class AlbumsListComponent {
  albums: Album[] = [];
  @Output() chooseAlbumEvent: EventEmitter<Album> = new EventEmitter<Album>();

  constructor(private spotifyApi: SpotifyApi, private localDB: LocalDB) {}

  async ngOnInit() {
    const albumsResponse = await this.spotifyApi.getAllAlbums();
    this.localDB.sync(albumsResponse);
    this.albums = this.localDB.loadAll();
  }

  onChooseAlbum(album: Album) {
    this.chooseAlbumEvent.emit(album);
  }
}
