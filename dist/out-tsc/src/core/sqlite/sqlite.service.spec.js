import { TestBed } from '@angular/core/testing';
import { WlSqliteService } from './sqlite.service';
describe('SqliteService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(WlSqliteService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=sqlite.service.spec.js.map