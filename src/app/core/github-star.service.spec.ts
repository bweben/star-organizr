import { TestBed, inject } from '@angular/core/testing';

import { GithubStarService } from './github-star.service';

describe('GithubStarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GithubStarService]
    });
  });

  it('should be created', inject([GithubStarService], (service: GithubStarService) => {
    expect(service).toBeTruthy();
  }));
});
