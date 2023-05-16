import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class SpotifyAuth {
  isAuthenticated = async (): Promise<boolean> => {
    const accessToken = localStorage.getItem('access_token');

    if (!accessToken) return false;

    const response = await fetch(`https://api.spotify.com/v1/me/`, {
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    });

    if (response.ok) return true;
    else return false;
  };

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

  authenticate = async (authorizationCode: string) => {
    const codeVerifier = localStorage.getItem('code_verifier');

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code: authorizationCode,
      redirect_uri: environment.SpotifyRedirectUri,
      client_id: environment.SpotifyClientId,
      code_verifier: codeVerifier ?? '',
    });

    await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('HTTP status ' + response.status);
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
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
