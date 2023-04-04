export const getAlbums = async () => {
  const accessToken = localStorage.getItem('access_token');

  const response = await fetch('https://api.spotify.com/v1/me/albums', {
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  });

  const data = await response.json();
  return data.items;
};
