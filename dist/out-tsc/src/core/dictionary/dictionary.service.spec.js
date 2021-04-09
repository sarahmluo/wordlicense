import { TestBed } from '@angular/core/testing';
import { DictionaryService } from './dictionary.service';
describe('DictionaryService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(DictionaryService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=dictionary.service.spec.js.map