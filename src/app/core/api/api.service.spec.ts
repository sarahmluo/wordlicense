import { TestBed } from '@angular/core/testing';

import { WlApiService } from './api.service';

describe('ApiService', () => {
  let service: WlApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WlApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
