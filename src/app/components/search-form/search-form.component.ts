import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent {
  constructor(private appService: AppService, private router: Router) {}

  onSearch(artist: string): void {
    this.appService.artist = artist;
    this.router.navigate(['/search-results']);
  }
}
