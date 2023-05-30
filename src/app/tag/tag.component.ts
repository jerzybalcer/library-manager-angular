import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Tag } from 'src/models/tag.interface';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css'],
})
export class TagComponent {
  @Input() tag: Tag = {} as Tag;
  textColor: string = '';
  invertIconColor: boolean = false;

  @Output() removedEvent: EventEmitter<Tag> = new EventEmitter<Tag>();

  ngOnInit() {
    this.textColor = this.getGoodContrastTextColor();

    if (
      this.textColor ===
      getComputedStyle(document.documentElement).getPropertyValue('--white')
    ) {
      this.invertIconColor = true;
    }
  }

  onRemove() {
    this.removedEvent.emit(this.tag);
  }

  private getGoodContrastTextColor(): string {
    const redConst = 0.241;
    const greenConst = 0.691;
    const blueConst = 0.068;
    const brightnessThreshold = 130;

    const rgb = this.hexToRgb(this.tag.color);

    const brightness = Math.sqrt(
      rgb.r * rgb.r * redConst +
        rgb.g * rgb.g * greenConst +
        rgb.b * rgb.b * blueConst
    );

    return getComputedStyle(document.documentElement).getPropertyValue(
      brightness > brightnessThreshold ? '--black' : '--white'
    );
  }

  private hexToRgb(hex: string) {
    hex = hex.replace('#', '');
    const intColor = parseInt(hex, 16);
    const r = (intColor >> 16) & 255;
    const g = (intColor >> 8) & 255;
    const b = intColor & 255;

    return { r, g, b };
  }
}
