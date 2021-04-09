var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { WlSqliteService } from 'src/core/sqlite/sqlite.service';
import { DictionaryService } from '../core/dictionary/dictionary.service';
var AppComponent = /** @class */ (function () {
    function AppComponent(dictionary, platform, splashScreen, sqlite, statusBar) {
        this.dictionary = dictionary;
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.sqlite = sqlite;
        this.statusBar = statusBar;
        this.initializeApp();
    }
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            // Load dictionary and letters
            return _this.dictionary.loadDictionary()
                .then(function () {
                return _this.dictionary.loadLetterList();
            })
                .then(function () {
                return _this.dictionary.loadWordList();
            })
                .then(function () {
                return _this.sqlite.openDatabase({
                    name: 'UserScores',
                    location: 'default'
                });
            })
                .then(function () {
                // create score table
                return _this.sqlite.executeSQL({
                    procName: 'Score__Table'
                });
            });
        })
            .catch(function (err) {
            console.log(err);
        });
    };
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            templateUrl: 'app.component.html'
        }),
        __metadata("design:paramtypes", [DictionaryService,
            Platform,
            SplashScreen,
            WlSqliteService,
            StatusBar])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map