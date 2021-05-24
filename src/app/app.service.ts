import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  artist: string;

  constructor(private http: HttpClient) {}

  getMusicVideos(): Observable<any> {
    return this.http.get(
      `https://itunes.apple.com/search?entity=musicVideo&term=${this.artist}&attribute=allArtistTerm&country=US`
    );
  }
}
