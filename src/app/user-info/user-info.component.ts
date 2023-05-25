import { Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { SpotifyApi } from 'src/services/spotify/spotify-api.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
  providers: [SpotifyApi],
})
export class UserInfoComponent {
  username: string = '';
  imageUrl: string = '';
  profileUrl: string = '';
  isDropdownOpen: boolean = false;

  constructor(private spotifyApi: SpotifyApi) {}

  async ngOnInit() {
    const userProfile = await firstValueFrom(this.spotifyApi.getUser());
    this.username = userProfile.display_name;
    this.imageUrl = userProfile.images[0].url;
    this.profileUrl = userProfile.external_urls.spotify;
  }

  onClick() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '';
  }
}
