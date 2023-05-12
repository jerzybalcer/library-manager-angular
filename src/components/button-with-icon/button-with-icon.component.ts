import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-with-icon',
  templateUrl: './button-with-icon.component.html',
  styleUrls: ['./button-with-icon.component.css'],
})
export class ButtonWithIconComponent {
  @Input() variant!: 'listen' | 'link' | 'remove';

  @Output() clickEvent = new EventEmitter<void>();

  onClick() {
    this.clickEvent.emit();
  }

  iconSrc: string = '';

  ngOnInit() {
    this.iconSrc = `assets/icons/${this.variant}.svg`;
  }
}
