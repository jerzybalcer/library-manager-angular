import { Component, Output, EventEmitter } from '@angular/core';
import { Album } from '../../models/album.interface';
import { LocalDB } from 'src/services/local-db/local-db.service';
import { SpotifyApi } from 'src/services/spotify/spotify-api.service';
import { SortBy } from 'src/models/sort-by.type';
import { AlbumsViewType } from 'src/models/albums-view.type';

@Component({
  selector: 'app-albums-presenter',
  templateUrl: './albums-presenter.component.html',
  styleUrls: ['./albums-presenter.component.css'],
  providers: [SpotifyApi, LocalDB],
})
export class AlbumsPresenterComponent {
  private albums: Album[] = [];
  private searchPhrase: string = '';
  private sortBy: SortBy = 'addedAt';
  private isSortAscending: boolean = false;

  displayAs: AlbumsViewType = 'grid';
  visibleAlbums: Album[] = [];

  @Output() chooseAlbumEvent: EventEmitter<Album> = new EventEmitter<Album>();

  constructor(private spotifyApi: SpotifyApi, private localDB: LocalDB) {}

  async ngOnInit() {
    this.albums = this.localDB.loadAll();
    this.visibleAlbums = this.albums;

    this.spotifyApi.getAllAlbums().then((albums) => {
      this.localDB.sync(albums);
      this.albums = this.localDB.loadAll();
      this.visibleAlbums = this.albums;

      this.queryAlbums();
    });
  }

  onChooseAlbum(album: Album) {
    this.chooseAlbumEvent.emit(album);
  }

  onSearch(phrase: string) {
    this.searchPhrase = phrase;
    this.queryAlbums();
  }

  onSort(sortBy: string) {
    this.sortBy = sortBy as SortBy;
    this.queryAlbums();
  }

  onChangeSortDirection() {
    this.isSortAscending = !this.isSortAscending;
    this.queryAlbums();
  }

  onSwitchView() {
    this.displayAs = this.displayAs === 'grid' ? 'list' : 'grid';
  }

  private queryAlbums() {
    const albumsAfterSearch = this.searchAlbums(this.albums);
    const albumsAfterSort = this.sortAlbums(albumsAfterSearch);

    this.visibleAlbums = albumsAfterSort;
  }

  private searchAlbums(albums: Album[]): Album[] {
    return albums.filter((a) => {
      if (
        a.title.toLowerCase().includes(this.searchPhrase.toLowerCase()) ||
        a.artist.toLowerCase().includes(this.searchPhrase.toLowerCase())
      )
        return true;
      else {
        return false;
      }
    });
  }

  private sortAlbums(albums: Album[]): Album[] {
    return albums.sort((album1, album2) => {
      const value1 = album1[this.sortBy as keyof Album] as string;
      const value2 = album2[this.sortBy as keyof Album] as string;

      if (this.isSortAscending)
        return value1.toLowerCase() > value2.toLowerCase() ? 1 : -1;
      else return value1.toLowerCase() > value2.toLowerCase() ? -1 : 1;
    });
  }
}
