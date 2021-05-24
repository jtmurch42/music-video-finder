import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { MusicVideo } from './music-video.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  artist: string;

  constructor(private http: HttpClient) {}

  getMusicVideos(): Observable<MusicVideo> {
    return this.http.get<MusicVideo>(
      `https://itunes.apple.com/search?entity=musicVideo&term=${this.artist}&attribute=allArtistTerm&country=US`
    );
  }
}
