import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { AppService } from '../../app.service';
import { MusicVideo, MusicVideoResult } from '../../music-video.model';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  modalRef: BsModalRef;
  musicArtist = this.appService.artist;
  musicVideos: MusicVideo;
  selectedMusicVideo: MusicVideoResult;
  previewVideoUrl: string;
  order = 'trackName';
  showError: boolean;

  constructor(
    private appService: AppService,
    private orderPipe: OrderPipe,
    private router: Router,
    private modalService: BsModalService
  ) {}

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

  onPreviewVideo(template: TemplateRef<any>, trackId: number): void {
    const video = this.musicVideos.results.find((vid) => vid.trackId === trackId);

    if (video) {
      this.selectedMusicVideo = video;
      this.modalRef = this.modalService.show(template);
    }
  }
}
