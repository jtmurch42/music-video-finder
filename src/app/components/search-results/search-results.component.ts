import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';

import { AppService } from '../../app.service';
import { MusicVideo } from '../../music-video.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  musicArtist = this.appService.artist;
  musicVideos: MusicVideo;
  order = 'trackName';
  showError: boolean;

  constructor(private appService: AppService, private orderPipe: OrderPipe, private router: Router) {}

  ngOnInit(): void {
    if (!this.musicArtist) {
      this.router.navigate(['/']);
      return;
    }

    this.appService.getMusicVideos().subscribe(
      (res) => {
        this.musicVideos = res;
        this.musicVideos = this.orderPipe.transform(this.musicVideos, 'trackName');
      },
      () => {
        this.showError = true;
      }
    );
  }
}
