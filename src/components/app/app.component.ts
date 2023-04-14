import { Album } from 'src/interfaces/album.interface';
import { SpotifyAuth } from '../../services/spotify/spotify-auth';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SpotifyAuth]
})
export class AppComponent {
  isAuthenticated: boolean = true;
  chosenAlbum: Album = {} as Album;

  constructor(private spotifyAuth: SpotifyAuth) {}

  async ngOnInit(){
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get('code');

    if(authorizationCode){
      await this.spotifyAuth.authenticate(authorizationCode);
      window.location.href = '';
    }

    this.isAuthenticated = await this.spotifyAuth.isAuthenticated();
  }

  onLogin = () => {
    this.spotifyAuth.authorize();
  };

  onChooseAlbum(album: Album) {
    this.chosenAlbum = album;
  }
}
