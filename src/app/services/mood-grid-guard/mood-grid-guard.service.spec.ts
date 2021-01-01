import { TestBed } from '@angular/core/testing';

import { MoodGridGuardService } from './mood-grid-guard.service';

describe('MoodGridGuardService', () => {
  let service: MoodGridGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoodGridGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
