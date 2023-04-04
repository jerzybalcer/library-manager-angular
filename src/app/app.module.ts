import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AlbumsListComponent } from './albums-list/albums-list.component';
import { AlbumCoverComponent } from './album-cover/album-cover.component';

@NgModule({
  declarations: [AppComponent, AlbumsListComponent, AlbumCoverComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
