import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {
  isDropdownOpen: boolean = false;
  header: string = '';
  selected: string | string[] = '';

  @Input() multiple: boolean = false;
  @Input() options: string[] = ['opt1', 'opt2', 'opt3'];
  @Input() default: string = '';
  @Input() iconSrc: string = '';
  @Input() clickableIcon: boolean = false;
  
  @Output() selectedEvent: EventEmitter<string | string[]> = new EventEmitter<string | string[]>();
  @Output() clickedIconEvent: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit() {
    this.selected = this.multiple ? [] : '';
    this.header = this.multiple ? '0 selected' : this.default;
  }

  onClick() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  onIconClick() {
    this.clickedIconEvent.emit();
  }

  onSelect(option: string) {
    if(this.multiple){
      const existingIndex = (this.selected as string[]).indexOf(option);

      if(existingIndex === -1)
        (this.selected as string[]).push(option);
      else
        (this.selected as string[]).splice(existingIndex, 1);

      this.header = this.selected.length.toString() + ' selected';

    } else {
      (this.selected as string) = option;
      this.header = this.selected as string;
    }

    this.selectedEvent.emit(this.selected);
  }
}
