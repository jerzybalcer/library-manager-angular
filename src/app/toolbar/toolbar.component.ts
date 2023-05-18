import { Component, Output, EventEmitter } from '@angular/core';
import { AlbumsViewType } from 'src/models/albums-view.type';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  sortIcon: 'sort-dsc' | 'sort-asc' = 'sort-dsc';

  @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() sortEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() changeSortDirectionEvent: EventEmitter<void> =
    new EventEmitter<void>();
  @Output() switchViewEvent: EventEmitter<AlbumsViewType> =
    new EventEmitter<AlbumsViewType>();

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchEvent.emit(target.value);
  }

  onSort(event: Event) {
    const target = event.target as HTMLInputElement;
    this.sortEvent.emit(target.value);
  }

  onChangeSortDirection() {
    this.sortIcon = this.sortIcon === 'sort-dsc' ? 'sort-asc' : 'sort-dsc';
    this.changeSortDirectionEvent.emit();
  }

  onSwitchView(viewType: AlbumsViewType) {
    this.switchViewEvent.emit(viewType);
  }
}
