import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';

import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  musicArtist = this.appService.artist;
  musicArtistResults: any;
  order = 'trackName';
  reversed = false;

  constructor(private appService: AppService, private orderPipe: OrderPipe, private router: Router) {}

  ngOnInit(): void {
    if (!this.musicArtist) {
      this.router.navigate(['/']);
      return;
    }

    this.appService.getMusicVideos().subscribe((res) => {
      this.musicArtistResults = res;
      this.musicArtistResults = this.orderPipe.transform(this.musicArtistResults, 'trackName');
    });
  }

  sortBy(order: string, reversed: boolean): void {
    this.order = order;
    this.reversed = reversed;
  }
}
