import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectOption } from 'src/models/select-option.interface';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class SelectComponent {
  isDropdownOpen: boolean = false;
  header: string = '';
  selected: SelectOption | SelectOption[] = {} as SelectOption;
  currentIconSrc: string = '';

  @Input() multiple: boolean = false;
  @Input() options: SelectOption[] = [];
  @Input() defaultValue: string = '';
  @Input() iconSrc: string = '';
  @Input() altIconSrc: string = '';
  @Input() clickableIcon: boolean = false;
  @Input() label: string = '';

  @Output() selectedEvent: EventEmitter<string | string[]> = new EventEmitter<
    string | string[]
  >();
  @Output() clickedIconEvent: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit() {
    this.handleDefaultValue();

    this.header = this.multiple
      ? '0 selected'
      : (this.selected as SelectOption).label;
    this.currentIconSrc = this.iconSrc;
  }

  onClick() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onIconClick(event: MouseEvent) {
    if (this.clickableIcon) {
      event.stopPropagation();
      this.currentIconSrc =
        this.currentIconSrc === this.iconSrc ? this.altIconSrc : this.iconSrc;
      this.clickedIconEvent.emit();
    }
  }

  onSelect(option: SelectOption) {
    if (this.multiple && Array.isArray(this.selected)) {
      const existingIndex = this.selected.indexOf(option);

      if (existingIndex === -1) this.selected.push(option);
      else this.selected.splice(existingIndex, 1);

      this.header = this.selected.length + ' selected';

      this.selectedEvent.emit(this.selected.map((o) => o.value));
    } else {
      this.selected = option;
      this.header = this.selected.label;

      this.selectedEvent.emit(this.selected.value);
    }
  }

  isSelected(option: SelectOption) {
    return this.multiple
      ? (this.selected as SelectOption[]).includes(option)
      : (this.selected as SelectOption) === option;
  }

  private handleDefaultValue() {
    if (!this.defaultValue) {
      this.selected = this.multiple ? [] : ({} as SelectOption);
    } else {
      this.selected =
        this.options.find((o) => o.value === this.defaultValue) ??
        ({} as SelectOption);
    }
  }
}
