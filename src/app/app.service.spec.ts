import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AppService } from './app.service';
import { mockMusicVideos } from './mocks/music-videos';

describe('AppService', () => {
  let service: AppService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AppService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get music videos', () => {
    service.artist = 'Someartist';
    service.getMusicVideos().subscribe((res) => {
      expect(res).toEqual(mockMusicVideos);
    });

    const req = httpMock.expectOne(
      'https://itunes.apple.com/search?entity=musicVideo&term=Someartist&attribute=allArtistTerm&country=US&limit=100&callback=JSONP_CALLBACK'
    );
    expect(req.request.method).toEqual('JSONP');
    req.flush(mockMusicVideos);
  });
});
