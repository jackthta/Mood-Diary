import { TestBed } from '@angular/core/testing';

import { MoodPromptGuardService } from './mood-prompt-guard.service';

describe('MoodPromptGuardService', () => {
  let service: MoodPromptGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MoodPromptGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
