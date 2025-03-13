// export const environment = {
//     SpotifyClientId: '',
//     SpotifyRedirectUri: ''
// };

export const environment = {
    production: true,
    SpotifyClientId: process.env['NG_SpotifyClientId'],
    SpotifyRedirectUri: process.env['NG_SpotifyRedirectUri'],
};