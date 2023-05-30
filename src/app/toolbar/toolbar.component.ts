import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Tag } from 'src/models/tag.interface';
import { SelectOption } from 'src/models/select-option.interface';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  sortIcon: 'sort-dsc' | 'sort-asc' = 'sort-dsc';
  filteringOptions: SelectOption[] = [];

  private _tags: Tag[] = [];

  @Input() set tags(tags: Tag[]) {
    this.filteringOptions = tags.map((tag) => {
      return { label: tag.name, value: tag.name, color: tag.color };
    });
  }

  readonly sortingOptions: SelectOption[] = [
    { label: 'Title', value: 'title' },
    { label: 'Artist', value: 'artist' },
    { label: 'Released Date', value: 'releasedAt' },
    { label: 'Added Date', value: 'addedAt' },
  ];

  @Output() searchEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() sortEvent: EventEmitter<string> = new EventEmitter<string>();
  @Output() changeSortDirectionEvent: EventEmitter<void> =
    new EventEmitter<void>();
  @Output() filterEvent: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Output() switchViewEvent: EventEmitter<void> = new EventEmitter<void>();

  onSearch(phrase: string) {
    this.searchEvent.emit(phrase);
  }

  onSort(sortBy: string) {
    this.sortEvent.emit(sortBy);
  }

  onFilter(tagsNames: string[]) {
    this.filterEvent.emit(tagsNames);
  }

  onChangeSortDirection() {
    this.sortIcon = this.sortIcon === 'sort-dsc' ? 'sort-asc' : 'sort-dsc';
    this.changeSortDirectionEvent.emit();
  }

  onSwitchView() {
    this.switchViewEvent.emit();
  }

  castSelectedToArray(selected: string | string[]) {
    return selected as string[];
  }
}
