import { Component } from '@angular/core';
import { SpotifyApi } from 'src/services/spotify/spotify-api';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
  providers: [SpotifyApi]
})
export class UserInfoComponent {
  username: string = '';
  imageUrl: string = '';

  constructor(private spotifyApi: SpotifyApi) {}

  async ngOnInit() {
    const userProfile = await this.spotifyApi.getUser();
    this.username = userProfile.display_name;
    this.imageUrl = userProfile.images[0].url;
  }
}
