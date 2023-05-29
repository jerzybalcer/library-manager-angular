import { Component, Output, EventEmitter } from '@angular/core';
import { LocalDB } from 'src/services/local-db/local-db.service';
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

  constructor(private readonly localDB: LocalDB) {}

  async ngOnInit() {
    this.filteringOptions = await this.getFilteringOptions();
  }

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

  async refetchFilteringOptions() {
    this.filteringOptions = await this.getFilteringOptions();
  }

  castSelectedToArray(selected: string | string[]) {
    return selected as string[];
  }

  private async getFilteringOptions(): Promise<SelectOption[]> {
    const tags: Tag[] = await this.localDB.loadAllTags();

    const selectOptions: SelectOption[] = tags.map((tag) => {
      return { label: tag.name, value: tag.name, color: tag.color };
    });

    return selectOptions;
  }
}
