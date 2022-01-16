import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { SearchFormComponent } from './search-form.component';
import { AppService } from '../../app.service';

describe('SearchFormComponent', () => {
  let component: SearchFormComponent;
  let fixture: ComponentFixture<SearchFormComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockAppService: jasmine.SpyObj<AppService>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockAppService = jasmine.createSpyObj('AppService', ['']);

    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [SearchFormComponent],
      providers: [
        { provide: AppService, useValue: mockAppService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should search', () => {
    const expectedArtistName = 'Some artist';

    component.onSearch(expectedArtistName);

    expect(mockAppService.artist).toBe(expectedArtistName);
    expect(mockRouter.navigate).toHaveBeenCalledOnceWith(['/search-results']);
  });
});
