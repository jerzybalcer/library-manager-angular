import { Album } from 'src/models/album.interface';
import { SpotifyAuth } from '../services/spotify/spotify-auth.service';
import { Component } from '@angular/core';
import { Tag } from 'src/models/tag.interface';
import { LocalDB } from 'src/services/local-db/local-db.service';
import { SpotifyApi } from 'src/services/spotify/spotify-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SpotifyAuth],
})
export class AppComponent {
  isAuthenticated: boolean = false;
  albums: Album[] = [];
  chosenAlbum: Album = {} as Album;
  tags: Tag[] = [];

  constructor(
    private readonly spotifyAuth: SpotifyAuth,
    private readonly spotifyApi: SpotifyApi,
    private readonly localDB: LocalDB
  ) {}

  async ngOnInit() {
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get('code');

    if (authorizationCode) {
      this.spotifyAuth.authenticate(authorizationCode).subscribe({
        next: (data) => {
          localStorage.setItem('access_token', data.access_token);
          localStorage.setItem('refresh_token', data.refresh_token);
          window.location.href = '';
        },
        error: (err) => {
          console.error(err.error.message);
          window.location.href = '';
        },
      });
    }

    if (localStorage.getItem('access_token')) {
      this.isAuthenticated = true;
      await this.reloadData();
      this.syncAlbums();
    }
  }

  onLogin = () => {
    this.spotifyAuth.authorize();
  };

  onChooseAlbum(album: Album) {
    this.chosenAlbum = album;
  }

  async reloadData() {
    this.albums = await this.localDB.loadAllAlbums();

    this.chosenAlbum =
      this.albums.find((a) => a.id === this.chosenAlbum.id) ?? ({} as Album);

    this.tags = await this.localDB.loadAllTags();
  }

  async syncAlbums() {
    this.spotifyApi.getAllAlbums().then((spotifyAlbums) => {
      this.localDB
        .sync(spotifyAlbums)
        .then(() =>
          this.localDB.loadAllAlbums().then((albums) => (this.albums = albums))
        );
    });
  }
}
