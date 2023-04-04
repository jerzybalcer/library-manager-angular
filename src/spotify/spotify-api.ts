const getAlbums = async (limit: number, offset: number) => {
  const accessToken = localStorage.getItem('access_token');

  const response = await fetch(
    `https://api.spotify.com/v1/me/albums?limit=${limit}&offset=${offset}`,
    {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    }
  );

  return await response.json();
};

export const getAllAlbums = async () => {
  let albums: any[] = [];

  let currentFragment = await getAlbums(50, 0);

  albums = albums.concat(currentFragment.items);

  while (currentFragment.next) {
    currentFragment = await getAlbums(50, albums.length);
    albums = albums.concat(currentFragment.items);
  }

  return albums;
};
