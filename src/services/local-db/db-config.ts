import { DBConfig } from 'ngx-indexed-db';

export const dbConfig: DBConfig = {
  name: 'Library',
  version: 1,
  objectStoresMeta: [
    {
      store: 'albums',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'title', keypath: 'title', options: { unique: false } },
        { name: 'artist', keypath: 'artist', options: { unique: false } },
        { name: 'imageUrl', keypath: 'imageUrl', options: { unique: false } },
        {
          name: 'spotifyUrl',
          keypath: 'spotifyUrl',
          options: { unique: true },
        },
        {
          name: 'totalTracks',
          keypath: 'totalTracks',
          options: { unique: false },
        },
        { name: 'addedAt', keypath: 'addedAt', options: { unique: false } },
        {
          name: 'releasedAt',
          keypath: 'releasedAt',
          options: { unique: false },
        },
        { name: 'tracks', keypath: 'tracks', options: { unique: false } },
        { name: 'tags', keypath: 'tags', options: { unique: false } },
      ],
    },
    {
      store: 'tags',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [
        { name: 'name', keypath: 'name', options: { unique: true } },
        { name: 'color', keypath: 'color', options: { unique: false } },
      ],
    },
  ],
};
