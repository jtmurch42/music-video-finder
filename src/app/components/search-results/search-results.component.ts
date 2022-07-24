import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { AppService } from '../../app.service';
import { MusicVideo, MusicVideoResult } from '../../music-video.model';

enum SearchOrder {
  TrackName = 'trackName',
  ReleaseDate = 'releaseDate'
}

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  modalRef: BsModalRef;
  musicArtist: string;
  musicVideos: MusicVideo;
  selectedMusicVideo: MusicVideoResult;
  searchOrder = SearchOrder.TrackName;
  showError: boolean;

  constructor(private appService: AppService, private router: Router, private modalService: BsModalService) {}

  ngOnInit(): void {
    this.musicArtist = this.appService.artist;

    if (!this.musicArtist) {
      this.router.navigate(['/']);
      return;
    }

    this.appService.getMusicVideos().subscribe(
      (res) => {
        this.musicVideos = res;
        this.sortMusicVideos(this.searchOrder);
      },
      () => {
        this.showError = true;
      }
    );
  }

  onChangeSearchOrder(): void {
    switch (this.searchOrder) {
      case SearchOrder.TrackName:
        this.sortMusicVideos(SearchOrder.TrackName);
        break;

      case SearchOrder.ReleaseDate:
        this.sortMusicVideos(SearchOrder.ReleaseDate, true);
        break;

      default:
        break;
    }
  }

  onPreviewVideo(template: TemplateRef<any>, trackId: number): void {
    const video = this.musicVideos.results.find((vid) => vid.trackId === trackId);

    if (video) {
      this.selectedMusicVideo = video;
      this.modalRef = this.modalService.show(template);
    }
  }

  private sortMusicVideos(order: SearchOrder, reversed = false): void {
    if (!this.musicVideos?.results) {
      return;
    }

    this.musicVideos.results.sort((v1, v2) => {
      if (reversed) {
        return v1[order] > v2[order] ? -1 : 1;
      }
      return v1[order] > v2[order] ? 1 : -1;
    });
  }
}
