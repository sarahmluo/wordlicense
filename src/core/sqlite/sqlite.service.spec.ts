import { TestBed } from '@angular/core/testing';

import { WlSqliteService } from './sqlite.service';

describe('SqliteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WlSqliteService = TestBed.get(WlSqliteService);
    expect(service).toBeTruthy();
  });
});
