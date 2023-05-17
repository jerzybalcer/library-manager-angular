import { Album } from 'src/models/album.interface';
import { SpotifyAuth } from '../services/spotify/spotify-auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SpotifyAuth],
})
export class AppComponent {
  isAuthenticated: boolean = false;
  chosenAlbum: Album = {} as Album;

  constructor(private spotifyAuth: SpotifyAuth) {}

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
    }
  }

  onLogin = () => {
    this.spotifyAuth.authorize();
  };

  onChooseAlbum(album: Album) {
    this.chosenAlbum = album;
  }
}
