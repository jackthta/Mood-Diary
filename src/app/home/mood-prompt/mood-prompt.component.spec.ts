import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoodPromptComponent } from './mood-prompt.component';

describe('MoodPromptComponent', () => {
  let component: MoodPromptComponent;
  let fixture: ComponentFixture<MoodPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoodPromptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoodPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
