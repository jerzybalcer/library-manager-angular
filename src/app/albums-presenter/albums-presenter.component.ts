import { Component, Output, EventEmitter } from '@angular/core';
import { Album } from '../../models/album.interface';
import { LocalDB } from 'src/services/local-db/local-db.service';
import { SpotifyApi } from 'src/services/spotify/spotify-api.service';
import { SortBy } from 'src/models/sort-by.type';
import { AlbumsViewType } from 'src/models/albums-view.type';
import { AlbumsQueries } from 'src/services/albums/albums-queries';

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
  private filters: string[] = [];

  displayAs: AlbumsViewType = 'grid';
  visibleAlbums: Album[] = [];

  @Output() chooseAlbumEvent: EventEmitter<Album> = new EventEmitter<Album>();

  constructor(
    private spotifyApi: SpotifyApi,
    private localDB: LocalDB,
    private albumsQueries: AlbumsQueries
  ) {}

  async ngOnInit() {
    this.albums = await this.localDB.loadAllAlbums();
    this.visibleAlbums = this.albums;

    this.spotifyApi.getAllAlbums().then(async (albums) => {
      await this.localDB.sync(albums);
      this.albums = await this.localDB.loadAllAlbums();
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

  onFilter(tagsNames: string[]) {
    this.filters = tagsNames;
    this.queryAlbums();
  }

  onSwitchView() {
    this.displayAs = this.displayAs === 'grid' ? 'list' : 'grid';
  }

  async loadAlbums() {
    this.albums = await this.localDB.loadAllAlbums();
    this.queryAlbums();
  }

  private queryAlbums() {
    const albumsAfterSearch = this.albumsQueries.searchAlbums(
      this.albums,
      this.searchPhrase
    );
    const albumsAfterFilter = this.albumsQueries.filterAlbums(
      albumsAfterSearch,
      this.filters
    );
    const albumsAfterSort = this.albumsQueries.sortAlbums(
      albumsAfterFilter,
      this.sortBy,
      this.isSortAscending
    );

    this.visibleAlbums = albumsAfterSort;
  }
}
