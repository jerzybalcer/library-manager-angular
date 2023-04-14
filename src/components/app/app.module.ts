import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AlbumsListComponent } from '../albums-list/albums-list.component';
import { AlbumCoverComponent } from '../album-cover/album-cover.component';
import { AlbumDetailsComponent } from '../album-details/album-details.component';
import { ButtonComponent } from '../button/button.component';
import { UserInfoComponent } from '../user-info/user-info.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@NgModule({
  declarations: [AppComponent, AlbumsListComponent, AlbumCoverComponent, AlbumDetailsComponent, ButtonComponent, UserInfoComponent, ToolbarComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
