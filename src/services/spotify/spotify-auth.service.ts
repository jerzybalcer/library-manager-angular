import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class SpotifyAuth {
  constructor(private httpClient: HttpClient) {}

  authorize = () => {
    const codeVerifier = this.generateRandomString(128);

    this.generateCodeChallenge(codeVerifier).then((codeChallenge) => {
      const state = this.generateRandomString(16);
      const scope = 'user-read-email user-library-read';

      localStorage.setItem('code_verifier', codeVerifier);

      const args = new URLSearchParams({
        response_type: 'code',
        client_id: environment.SpotifyClientId,
        scope: scope,
        redirect_uri: environment.SpotifyRedirectUri,
        state: state,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge,
      });

      window.location.href = 'https://accounts.spotify.com/authorize?' + args;
    });
  };

  authenticate = (authorizationCode: string) => {
    const codeVerifier = localStorage.getItem('code_verifier');

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: authorizationCode,
      redirect_uri: environment.SpotifyRedirectUri,
      client_id: environment.SpotifyClientId,
      code_verifier: codeVerifier ?? '',
    });

    return this.httpClient.post<any>(
      'https://accounts.spotify.com/api/token',
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  };

  refresh = (refreshToken: string): Observable<any> => {
    const body = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id: environment.SpotifyClientId,
    });

    return this.httpClient.post<any>(
      'https://accounts.spotify.com/api/token',
      body,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  };

  private generateRandomString = (length: number) => {
    let text = '';
    const possible =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  private base64encode = (string: ArrayBuffer) => {
    return btoa(
      String.fromCharCode.apply(null, Array.from(new Uint8Array(string)))
    )
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  };

  private generateCodeChallenge = async (codeVerifier: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);

    return this.base64encode(digest);
  };
}
