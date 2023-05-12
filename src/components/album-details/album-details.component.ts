import { Component, Input } from '@angular/core';
import { Album } from 'src/interfaces/album.interface';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css'],
})
export class AlbumDetailsComponent {
  @Input() album: Album = {} as Album;

  onListenButtonClick() {
    window.open(this.album.spotifyUrl, '_blank')?.focus();
  }

  onCopyLinkButtonClick() {
    navigator.clipboard.writeText(this.album.spotifyUrl);
  }
}
