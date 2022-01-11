import { TestBed } from '@angular/core/testing';

import { WlSyncService } from './sync.service';

describe('SyncService', () => {
  let service: WlSyncService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WlSyncService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
