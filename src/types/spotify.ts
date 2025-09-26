export interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  external_urls: { spotify: string };
}

export interface SpotifyApiResponse {
  items: SpotifyTrack[];
}
