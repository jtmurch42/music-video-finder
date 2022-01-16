export interface MusicVideoResult {
  wrapperType: string;
  kind: string;
  artistId: number;
  trackId: number;
  artistName: string;
  trackName: string;
  trackCensoredName: string;
  artistViewUrl: string;
  trackViewUrl: string;
  previewUrl: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
  collectionPrice: number;
  trackPrice: number;
  releaseDate: string;
  collectionExplicitness: string;
  trackExplicitness: string;
  trackTimeMillis: number;
  country: string;
  currency: string;
  primaryGenreName: string;
}

export interface MusicVideo {
  resultCount: number;
  results: MusicVideoResult[];
}
