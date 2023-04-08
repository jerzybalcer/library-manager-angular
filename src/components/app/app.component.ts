import { SpotifyAuth } from '../../services/spotify/spotify-auth';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SpotifyAuth]
})
export class AppComponent {
  isAuthenticated: boolean = true;

  constructor(private spotifyAuth: SpotifyAuth) {}

  async ngOnInit(){
    const urlParams = new URLSearchParams(window.location.search);
    const authorizationCode = urlParams.get('code');

    if(authorizationCode){
      await this.spotifyAuth.authenticate(authorizationCode);
    }

    this.isAuthenticated = await this.spotifyAuth.isAuthenticated();
  }

  onLogin = () => {
    this.spotifyAuth.authorize();
  };
}
