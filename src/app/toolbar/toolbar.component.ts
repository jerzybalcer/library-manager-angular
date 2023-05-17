import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() sortEvent: EventEmitter<string> = new EventEmitter<string>();

  onSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchEvent.emit(target.value);
  }

  onSort(event: Event) {
    const target = event.target as HTMLInputElement;
    this.sortEvent.emit(target.value);
  }
}
