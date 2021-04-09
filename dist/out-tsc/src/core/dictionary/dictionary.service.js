var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
var DictionaryService = /** @class */ (function () {
    function DictionaryService(file, http) {
        this.file = file;
        this.http = http;
    }
    Object.defineProperty(DictionaryService.prototype, "dictionary", {
        /**
         * Getter for dictionary.
         */
        get: function () {
            return this._dictionary;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DictionaryService.prototype, "letters", {
        /**
         * Getter for the letter list.
         */
        get: function () {
            return this._letters;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DictionaryService.prototype, "wordList", {
        /**
         * Getter for the letter list.
         */
        get: function () {
            return this._wordList;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Load dictionary into memory.
     */
    DictionaryService.prototype.loadDictionary = function () {
        var _this = this;
        return this.http.get('../assets/words/websters.json')
            .toPromise()
            .then(function (res) {
            _this._dictionary = new Set(Object.keys(res));
        });
        // as of 12/5/2018, cannot debug File plugin on
        // device bc sourcemaps are not loaded in Ionic 4
        // for Android. So for now, using http as above.
        /* console.log('loading dictinary file');
        return new Promise<void>((resolve, reject) => {
          this.file.checkDir(this.file.applicationStorageDirectory, 'assets')
          .then(() => {
            console.log('checking file...');
            return this.file.checkFile('../assets/', 'words.txt')
          })
          .then(() => {
            console.log('reading file...');
            return this.file.readAsText('../assets/', 'words.txt');
          })
          .then((res: string) => {
            const dict: string[]  = res.split('\n');
            this._dictionary = new Set(dict);
            console.log('Dictionary loaded!');
            console.log(this._dictionary.size);
          })
        }); */
    };
    /**
     * Generate the list of letter strings.
     */
    DictionaryService.prototype.loadLetterList = function () {
        var _this = this;
        return this.http.get('../assets/words/lettersNew.json')
            .toPromise()
            .then(function (res) {
            _this._letters = Object.keys(res);
        });
    };
    /**
     * Fetch the list of words for each letter combination.
     */
    DictionaryService.prototype.loadWordList = function () {
        var _this = this;
        return this.http.get('../assets/words/wordList.json')
            .toPromise()
            .then(function (res) {
            _this._wordList = res;
        });
    };
    DictionaryService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [File,
            HttpClient])
    ], DictionaryService);
    return DictionaryService;
}());
export { DictionaryService };
//# sourceMappingURL=dictionary.service.js.map