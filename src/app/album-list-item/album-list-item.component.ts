import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Album } from 'src/models/album.interface';

@Component({
  selector: 'app-album-list-item',
  templateUrl: './album-list-item.component.html',
  styleUrls: ['./album-list-item.component.css'],
})
export class AlbumListItemComponent {
  @Input() album: Album = {} as Album;

  @Output() chooseAlbumEvent: EventEmitter<Album> = new EventEmitter<Album>();

  onClick() {
    this.chooseAlbumEvent.emit(this.album);
  }
}
