import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Album } from 'src/models/album.interface';
import { CurrentlyExpandedDetails } from 'src/models/currently-expanded-details.type';
import { LocalDB } from 'src/services/local-db/local-db.service';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css'],
})
export class AlbumDetailsComponent {
  @Input() album: Album = {} as Album;

  expandedInfo: CurrentlyExpandedDetails = 'tracks';

  @Output() tagsChangedEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private readonly localDB: LocalDB) {}

  onListenButtonClick() {
    const tag = { id: 1, name: 'Tag1', color: 'fff000' };
    this.localDB.addTag(tag, this.album).subscribe((modified) => {
      this.album = modified;
      this.tagsChangedEvent.emit();
    });
    window.open(this.album.spotifyUrl, '_blank')?.focus();
  }

  onCopyLinkButtonClick() {
    navigator.clipboard.writeText(this.album.spotifyUrl);
    const tag = this.album.tags[0];
    this.localDB.removeTag(tag, this.album).subscribe((modified) => {
      this.album = modified;
      this.tagsChangedEvent.emit();
    });
  }

  onSwitchExpandedDetails() {
    this.expandedInfo = this.expandedInfo === 'tracks' ? 'tags' : 'tracks';
  }
}
