import { Component, Output, EventEmitter } from '@angular/core';
import { Album } from '../../interfaces/album.interface';
import { LocalDB } from 'src/services/local-db/local-db.service';
import { SpotifyApi } from 'src/services/spotify/spotify-api.service';

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.css'],
  providers: [SpotifyApi, LocalDB],
})
export class AlbumsListComponent {
  albums: Album[] = [];
  visibleAlbums: Album[] = [];
  searchPhrase: string = '';
  @Output() chooseAlbumEvent: EventEmitter<Album> = new EventEmitter<Album>();

  constructor(private spotifyApi: SpotifyApi, private localDB: LocalDB) {}

  async ngOnInit() {
    this.albums = this.localDB.loadAll();
    this.visibleAlbums = this.albums;

    this.spotifyApi.getAllAlbums().then((albums) => {
      this.localDB.sync(albums);
      this.albums = this.localDB.loadAll();
      this.visibleAlbums = this.albums;

      this.onSearch(this.searchPhrase);
    });
  }

  onChooseAlbum(album: Album) {
    this.chooseAlbumEvent.emit(album);
  }

  onSearch(phrase: string) {
    this.searchPhrase = phrase;
    this.visibleAlbums = this.albums.filter((a) => {
      if (
        a.title.toLowerCase().includes(phrase.toLowerCase()) ||
        a.artist.toLowerCase().includes(phrase.toLowerCase())
      )
        return true;
      else {
        return false;
      }
    });
  }
}
