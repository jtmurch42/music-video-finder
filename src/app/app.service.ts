import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { MusicVideo } from './music-video.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  artist: string;

  constructor(private http: HttpClient) {}

  getMusicVideos(): Observable<MusicVideo> {
    return this.http
      .jsonp<MusicVideo>(
        `https://itunes.apple.com/search?entity=musicVideo&term=${this.artist}&attribute=allArtistTerm&country=US&limit=100`,
        'callback'
      )
      .pipe(
        map((videos) => {
          const filteredVidoes = videos.results.filter((vid) => vid.previewUrl);

          return {
            resultCount: filteredVidoes.length,
            results: filteredVidoes
          };
        })
      );
  }
}
