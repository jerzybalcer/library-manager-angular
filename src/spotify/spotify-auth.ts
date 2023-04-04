const ClientId = '1a23516c50aa48a982b773772fa7447f';
const RedirectUri = 'http://localhost:4200';

const generateRandomString = (length: number) => {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const base64encode = (string: ArrayBuffer) => {
  return btoa(
    String.fromCharCode.apply(null, Array.from(new Uint8Array(string)))
  )
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

const generateCodeChallenge = async (codeVerifier: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const digest = await window.crypto.subtle.digest('SHA-256', data);

  return base64encode(digest);
};

export const authorize = () => {
  let codeVerifier = generateRandomString(128);

  generateCodeChallenge(codeVerifier).then((codeChallenge) => {
    let state = generateRandomString(16);
    let scope = 'user-read-email user-library-read';

    localStorage.setItem('code_verifier', codeVerifier);

    let args = new URLSearchParams({
      response_type: 'code',
      client_id: ClientId,
      scope: scope,
      redirect_uri: RedirectUri,
      state: state,
      code_challenge_method: 'S256',
      code_challenge: codeChallenge,
    });

    window.location.href = 'https://accounts.spotify.com/authorize?' + args;
  });
};

export const authenticate = async (authorizationCode: string) => {
  let codeVerifier = localStorage.getItem('code_verifier');

  let body = new URLSearchParams({
    grant_type: 'authorization_code',
    code: authorizationCode!,
    redirect_uri: RedirectUri,
    client_id: ClientId,
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
