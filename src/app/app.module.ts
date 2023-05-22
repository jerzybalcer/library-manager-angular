import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AlbumsPresenterComponent } from './albums-presenter/albums-presenter.component';
import { AlbumCoverComponent } from './album-cover/album-cover.component';
import { AlbumDetailsComponent } from './album-details/album-details.component';
import { PrimaryButtonComponent } from './primary-button/primary-button.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ButtonWithIconComponent } from './button-with-icon/button-with-icon.component';
import { httpInterceptorProviders } from '../interceptors';
import { HttpClientModule } from '@angular/common/http';
import { SpotifyAuth } from 'src/services/spotify/spotify-auth.service';
import { SpotifyApi } from 'src/services/spotify/spotify-api.service';
import { LocalDB } from 'src/services/local-db/local-db.service';
import { AlbumListItemComponent } from './album-list-item/album-list-item.component';
import { AlbumsViewSwitchComponent } from './switch/switch.component';
import { SelectComponent } from './select/select.component';

@NgModule({
  declarations: [
    AppComponent,
    AlbumsPresenterComponent,
    AlbumCoverComponent,
    AlbumDetailsComponent,
    PrimaryButtonComponent,
    UserInfoComponent,
    ToolbarComponent,
    ButtonWithIconComponent,
    AlbumListItemComponent,
    AlbumsViewSwitchComponent,
    SelectComponent,
  ],
  imports: [BrowserModule, HttpClientModule],
  providers: [httpInterceptorProviders, SpotifyAuth, SpotifyApi, LocalDB],
  bootstrap: [AppComponent],
})
export class AppModule {}
