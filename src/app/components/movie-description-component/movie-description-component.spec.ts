import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDescriptionComponent } from './movie-description-component';

describe('MovieDescriptionComponent', () => {
  let component: MovieDescriptionComponent;
  let fixture: ComponentFixture<MovieDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
