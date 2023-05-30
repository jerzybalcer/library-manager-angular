import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  Input,
  ViewChild,
} from '@angular/core';
import { Tag } from 'src/models/tag.interface';

@Component({
  selector: 'app-tag-adder',
  templateUrl: './tag-adder.component.html',
  styleUrls: ['./tag-adder.component.css'],
})
export class TagAdderComponent {
  @ViewChild('textInput') textInputElement!: ElementRef;

  @Input() assignableTags: Tag[] = [];

  isDropdownOpen: boolean = false;
  tagsAfterSearch: Tag[] = [];
  inputText: string = '';

  @Output() addEvent: EventEmitter<Tag> = new EventEmitter<Tag>();

  async ngOnInit() {
    this.tagsAfterSearch = this.assignableTags;
  }

  onClick() {
    this.textInputElement.nativeElement.focus();
  }

  onFocus() {
    this.isDropdownOpen = true;
    this.tagsAfterSearch = this.searchExisting(this.inputText);
  }

  onBlur(event: FocusEvent) {
    const focusedElement = event.relatedTarget as Element;

    if (!focusedElement || !focusedElement.classList.contains('option'))
      this.deactivate();
  }

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;

    this.inputText = target.value;

    this.tagsAfterSearch = this.searchExisting(this.inputText);
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.deactivate();
    }
  }

  onAdd(tag: Tag, event: MouseEvent) {
    event.stopPropagation();
    this.addEvent.emit(tag);
    this.deactivate();
  }

  private deactivate() {
    this.textInputElement.nativeElement.blur();
    this.textInputElement.nativeElement.value = '';
    this.inputText = '';
    this.isDropdownOpen = false;
  }

  private searchExisting(searchPhrase: string) {
    if (searchPhrase) {
      return this.assignableTags;
    } else {
      return this.assignableTags.filter((t) => t.name.includes(searchPhrase));
    }
  }
}
