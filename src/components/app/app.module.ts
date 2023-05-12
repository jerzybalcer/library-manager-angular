import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AlbumsListComponent } from '../albums-list/albums-list.component';
import { AlbumCoverComponent } from '../album-cover/album-cover.component';
import { AlbumDetailsComponent } from '../album-details/album-details.component';
import { PrimaryButtonComponent } from '../primary-button/primary-button.component';
import { UserInfoComponent } from '../user-info/user-info.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { ButtonWithIconComponent } from '../button-with-icon/button-with-icon.component';

@NgModule({
  declarations: [
    AppComponent,
    AlbumsListComponent,
    AlbumCoverComponent,
    AlbumDetailsComponent,
    PrimaryButtonComponent,
    UserInfoComponent,
    ToolbarComponent,
    ButtonWithIconComponent,
  ],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
