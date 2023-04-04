import { Component, Input } from '@angular/core';
import { Album } from './../interfaces/album.interface';

@Component({
  selector: 'app-album-cover',
  templateUrl: './album-cover.component.html',
  styleUrls: ['./album-cover.component.css'],
})
export class AlbumCoverComponent {
  @Input() album: Album = {} as Album;
}
