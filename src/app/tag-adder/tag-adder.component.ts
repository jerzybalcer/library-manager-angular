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

  private _allTags: Tag[] = [];

  @Input() assignedTags: Tag[] = [];
  @Input() set allTags(allTags: Tag[]) {
    this._allTags = allTags;
  }

  get allTags() {
    return this._allTags.sort((t) => (this.isAlreadyAssigned(t) ? 1 : -1));
  }

  isDropdownOpen: boolean = false;
  tagsAfterSearch: Tag[] = [];
  inputText: string = '';

  @Output() addEvent: EventEmitter<Tag> = new EventEmitter<Tag>();

  async ngOnInit() {
    this.tagsAfterSearch = this.allTags;
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

    this.inputText = target.value.trim().toUpperCase();

    this.tagsAfterSearch = this.searchExisting(this.inputText);

    this.textInputElement.nativeElement.value = this.inputText.toUpperCase();
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.deactivate();
    }
  }

  onAdd(tag: Tag, event: MouseEvent) {
    event.stopPropagation();

    // Temporary solution, generate random color
    if (!tag.color)
      tag.color = '#' + Math.floor(Math.random() * 16777215).toString(16);

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
    if (!searchPhrase) {
      return this.allTags;
    } else {
      return this.allTags.filter((t) =>
        t.name.toLowerCase().includes(searchPhrase.toLowerCase())
      );
    }
  }

  isAlreadyAssigned(tag: Tag) {
    return this.assignedTags.some((t) => t.name == tag.name);
  }
}
