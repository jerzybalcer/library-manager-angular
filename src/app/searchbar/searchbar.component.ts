import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.css'],
})
export class SearchbarComponent {
  @ViewChild('textInput') textInput!: ElementRef;

  @Input() iconSrc: string = '';

  @Output() inputEvent: EventEmitter<string> = new EventEmitter<string>();

  onInput(event: Event) {
    const target = event.target as HTMLInputElement;
    this.inputEvent.emit(target.value);
  }

  onClick() {
    this.textInput.nativeElement.focus();
  }

  onClear() {
    this.textInput.nativeElement.value = '';
    this.inputEvent.emit('');
  }
}
