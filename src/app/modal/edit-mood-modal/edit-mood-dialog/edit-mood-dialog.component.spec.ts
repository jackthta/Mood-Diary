import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMoodDialogComponent } from './edit-mood-dialog.component';

describe('EditMoodDialogComponent', () => {
  let component: EditMoodDialogComponent;
  let fixture: ComponentFixture<EditMoodDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMoodDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMoodDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
