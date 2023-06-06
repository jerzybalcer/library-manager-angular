import { Component, Input } from '@angular/core';
import { Track } from 'src/models/track.interface';

@Component({
  selector: 'app-tracks-table',
  templateUrl: './tracks-table.component.html',
  styleUrls: ['./tracks-table.component.css'],
})
export class TracksTableComponent {
  @Input() tracks: Track[] = [];
}
