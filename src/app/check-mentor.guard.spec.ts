import { TestBed, async, inject } from '@angular/core/testing';

import { CheckMentorGuard } from './check-mentor.guard';

describe('CheckMentorGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CheckMentorGuard]
    });
  });

  it('should ...', inject([CheckMentorGuard], (guard: CheckMentorGuard) => {
    expect(guard).toBeTruthy();
  }));
});
