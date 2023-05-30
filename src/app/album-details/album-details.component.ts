import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Album } from 'src/models/album.interface';
import { CurrentlyExpandedDetails } from 'src/models/currently-expanded-details.type';
import { Tag } from 'src/models/tag.interface';
import { LocalDB } from 'src/services/local-db/local-db.service';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css'],
})
export class AlbumDetailsComponent {
  private _allTags: Tag[] = [];
  private _album: Album = {} as Album;

  @Input() set album(album: Album) {
    this._album = album;
    this.assignableTags = this.getOnlyAssignableTags(this._allTags);
  }

  @Input() set allTags(tags: Tag[]) {
    this._allTags = tags;
    this.assignableTags = this.getOnlyAssignableTags(tags);
  }

  get album() {
    return this._album;
  }

  assignableTags: Tag[] = [];
  expandedInfo: CurrentlyExpandedDetails = 'tags';

  @Output() tagsChangedEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private readonly localDB: LocalDB) {}

  onListenButtonClick() {
    window.open(this.album.spotifyUrl, '_blank')?.focus();
  }

  onCopyLinkButtonClick() {
    navigator.clipboard.writeText(this.album.spotifyUrl);
  }

  onSwitchExpandedDetails() {
    this.expandedInfo = this.expandedInfo === 'tracks' ? 'tags' : 'tracks';
  }

  onTagRemove(tag: Tag) {
    this.localDB.removeTag(tag, this.album).subscribe((modified) => {
      this.album = modified;
      this.tagsChangedEvent.emit();
    });
  }

  onTagAdd(tag: Tag) {
    this.localDB.addTag(tag, this.album).subscribe((modified) => {
      this.album = modified;
      this.tagsChangedEvent.emit();
    });
  }

  private getOnlyAssignableTags(allTags: Tag[]) {
    return allTags.filter(
      (tag) => !this.album.tags.some((albumTag) => albumTag.name === tag.name)
    );
  }
}
