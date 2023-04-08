import { Injectable } from "@angular/core";

@Injectable()
export class SpotifyAuth {
  private readonly ClientId = '1a23516c50aa48a982b773772fa7447f';
  private readonly RedirectUri = 'http://localhost:4200';
  
  authorize = () => {
    const codeVerifier = this.generateRandomString(128);
  
    this.generateCodeChallenge(codeVerifier).then((codeChallenge) => {
      const state = this.generateRandomString(16);
      const scope = 'user-read-email user-library-read';
  
      localStorage.setItem('code_verifier', codeVerifier);
  
      const args = new URLSearchParams({
        response_type: 'code',
        client_id: this.ClientId,
        scope: scope,
        redirect_uri: this.RedirectUri,
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
      redirect_uri: this.RedirectUri,
      client_id: this.ClientId,
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

