import { Component, Output, EventEmitter } from '@angular/core';
import { AlbumsViewType } from 'src/models/albums-view.type';

@Component({
  selector: 'app-albums-view-switch',
  templateUrl: './albums-view-switch.component.html',
  styleUrls: ['./albums-view-switch.component.css'],
})
export class AlbumsViewSwitchComponent {
  selected: AlbumsViewType = 'grid';

  @Output() switchViewTypeEvent: EventEmitter<AlbumsViewType> =
    new EventEmitter<AlbumsViewType>();

  onClick() {
    this.selected = this.selected === 'grid' ? 'list' : 'grid';

    this.switchViewTypeEvent.emit(this.selected);
  }
}
