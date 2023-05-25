import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-switch[leftIconSrc][rightIconSrc]',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.css'],
})
export class AlbumsViewSwitchComponent {
  @Input() default: 'left' | 'right' = 'left';
  @Input() leftIconSrc: string = '';
  @Input() rightIconSrc: string = '';
  @Input() label: string = '';

  @Output() toggleEvent: EventEmitter<void> = new EventEmitter<void>();

  onClick() {
    this.toggleEvent.emit();
  }
}
