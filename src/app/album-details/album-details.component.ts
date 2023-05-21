import { Component, Input } from '@angular/core';
import { Album } from 'src/models/album.interface';
import { CurrentlyExpandedDetails } from 'src/models/currently-expanded-details.type';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css'],
})
export class AlbumDetailsComponent {
  @Input() album: Album = {} as Album;

  expandedInfo: CurrentlyExpandedDetails = 'tracks';

  onListenButtonClick() {
    window.open(this.album.spotifyUrl, '_blank')?.focus();
  }

  onCopyLinkButtonClick() {
    navigator.clipboard.writeText(this.album.spotifyUrl);
  }

  onSwitchExpandedDetails() {
    this.expandedInfo = this.expandedInfo === 'tracks' ? 'tags' : 'tracks';
  }
}
