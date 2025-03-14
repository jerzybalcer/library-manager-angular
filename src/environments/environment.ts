export const environment = {
    production: true,
    SpotifyClientId: import.meta.env.NG_SPOTIFY_CLIENT_ID,
    SpotifyRedirectUri: import.meta.env.NG_SPOTIFY_REDIRECT_URI,
};

console.log(environment);