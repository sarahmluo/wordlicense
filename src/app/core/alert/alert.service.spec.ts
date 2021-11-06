import { TestBed } from '@angular/core/testing';

import { WlAlertService } from './alert.service';

describe('AlertService', () => {
  let service: WlAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WlAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
