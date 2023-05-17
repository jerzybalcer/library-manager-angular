import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Album } from '../../models/album.interface';

@Component({
  selector: 'app-album-cover',
  templateUrl: './album-cover.component.html',
  styleUrls: ['./album-cover.component.css'],
})
export class AlbumCoverComponent {
  @Input() album: Album = {} as Album;

  @Output() chooseAlbumEvent: EventEmitter<Album> = new EventEmitter<Album>();

  onClickCover() {
    this.chooseAlbumEvent.emit(this.album);
  }
}
