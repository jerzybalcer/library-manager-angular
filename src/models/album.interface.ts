import { Tag } from './tag.interface';
import { Track } from './track.interface';

export interface Album {
  id?: number;
  title: string;
  artist: string;
  imageUrl: string;
  spotifyUrl: string;
  totalTracks: number;
  addedAt: Date;
  releasedAt: string;
  tracks: Track[];
  tags: Tag[];
}
