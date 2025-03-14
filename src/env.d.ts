declare interface Env {
  readonly NODE_ENV: string;
  readonly NG_APP_SPOTIFY_CLIENT_ID: string;
  readonly NG_APP_SPOTIFY_REDIRECT_URI: string;
}

declare interface ImportMeta {
  readonly env: Env;
}
