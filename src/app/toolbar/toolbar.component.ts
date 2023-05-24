import { Component, Output, EventEmitter } from '@angular/core';

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
  @Output() switchViewEvent: EventEmitter<void> = new EventEmitter<void>();

  onSearch(phrase: string) {
    this.searchEvent.emit(phrase);
  }

  onSort(sortBy: string) {
    this.sortEvent.emit(sortBy);
  }

  onChangeSortDirection() {
    this.sortIcon = this.sortIcon === 'sort-dsc' ? 'sort-asc' : 'sort-dsc';
    this.changeSortDirectionEvent.emit();
  }

  onSwitchView() {
    this.switchViewEvent.emit();
  }
}
