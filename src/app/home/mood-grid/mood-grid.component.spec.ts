import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodGridComponent } from './mood-grid.component';

describe('MoodGridComponent', () => {
  let component: MoodGridComponent;
  let fixture: ComponentFixture<MoodGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoodGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
