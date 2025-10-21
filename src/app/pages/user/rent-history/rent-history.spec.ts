import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentHistory } from './rent-history';

describe('RentHistory', () => {
  let component: RentHistory;
  let fixture: ComponentFixture<RentHistory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentHistory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentHistory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
