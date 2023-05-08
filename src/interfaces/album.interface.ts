import { Track } from './track.interface';

export interface Album {
  title: string;
  artist: string;
  imageUrl: string;
  spotifyUrl: string;
  totalTracks: number;
  addedAt: Date;
  releasedAt: string;
  tracks: Track[];
}
