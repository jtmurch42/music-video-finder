import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { OrderModule, OrderPipe } from 'ngx-order-pipe';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';

import { SearchResultsComponent } from './search-results.component';
import { mockMusicVideos } from 'src/app/mocks/music-videos';
import { AppService } from '../../app.service';

class MockAppService {
  artist = 'Some artist';
  getMusicVideos = jasmine.createSpy();
}

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;
  let mockAppService: any;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockOrderPipe: jasmine.SpyObj<OrderPipe>;
  let mockBsModalService: jasmine.SpyObj<BsModalService>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockOrderPipe = jasmine.createSpyObj('OrderPipe', ['transform']);
    mockBsModalService = jasmine.createSpyObj('BsModelService', ['show']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, OrderModule],
      declarations: [SearchResultsComponent],
      providers: [
        { provide: AppService, useClass: MockAppService },
        { provide: OrderPipe, useValue: mockOrderPipe },
        { provide: Router, useValue: mockRouter },
        { provide: BsModalService, useValue: mockBsModalService }
      ]
    }).compileComponents();

    mockAppService = TestBed.inject(AppService);
  });

  beforeEach(() => {
    mockAppService.getMusicVideos.and.returnValue(of(mockMusicVideos));
    mockOrderPipe.transform.and.returnValue(mockMusicVideos);

    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('ngOnInit', () => {
    it('should get music videos', () => {
      expect(mockOrderPipe.transform).toHaveBeenCalledOnceWith(mockMusicVideos, 'trackName');
      expect(component.musicVideos).toEqual(mockMusicVideos);
    });

    it('should display error', () => {
      mockAppService.getMusicVideos.and.returnValue(throwError('Error getting music videos'));

      component.ngOnInit();
      fixture.detectChanges();

      const el: HTMLElement = fixture.debugElement.query(By.css('.text-danger')).nativeElement;
      expect(el.textContent).toContain('An error occurred while loading the data');
    });

    it('should navigate', () => {
      mockAppService.artist = null;

      component.ngOnInit();

      expect(mockRouter.navigate).toHaveBeenCalledOnceWith(['/']);
    });
  });

  describe('onPreviewVideo', () => {
    it('should get music video', () => {
      component.onPreviewVideo(null as any, mockMusicVideos.results[1].trackId);

      expect(component.selectedMusicVideo).toEqual(mockMusicVideos.results[1]);
    });
  });
});
