import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoachInfoComponent } from './coach-info.component';

describe('CoachInfoComponent', () => {
  let component: CoachInfoComponent;
  let fixture: ComponentFixture<CoachInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoachInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoachInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
