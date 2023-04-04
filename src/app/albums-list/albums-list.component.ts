import { Component } from '@angular/core';

@Component({
  selector: 'app-albums-list',
  templateUrl: './albums-list.component.html',
  styleUrls: ['./albums-list.component.css'],
})
export class AlbumsListComponent {
  albums = [
    {
      artist: 'O.S.T.R.',
      imageUrl:
        'https://i.scdn.co/image/ab67616d00001e02d4fa4e1a9b1e91c978b52647',
      title: 'HAOS',
    },
    {
      artist: 'Kuban',
      imageUrl:
        'https://i.scdn.co/image/ab67616d00001e029486fb8846b49c619bce4f46',
      title: 'spokój.',
    },
    {
      artist: 'Ruben Gonzalez',
      imageUrl:
        'https://i.scdn.co/image/ab67616d00001e0270d457d40ad73285e35901d2',
      title: 'Introducing',
    },
    {
      artist: 'club2020',
      imageUrl:
        'https://i.scdn.co/image/ab67616d00001e02d2b86b3469b70a6945fdaa7d',
      title: 'club2020',
    },
  ];
}
