import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeekDonationsComponent } from './seek-donations.component';

describe('SeekDonationsComponent', () => {
  let component: SeekDonationsComponent;
  let fixture: ComponentFixture<SeekDonationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeekDonationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeekDonationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
