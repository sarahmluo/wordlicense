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
import { NavController } from '@ionic/angular';
import { WlSqliteService } from 'src/core/sqlite/sqlite.service';
var ScoreHistoryPage = /** @class */ (function () {
    function ScoreHistoryPage(navCtrl, sqlite) {
        this.navCtrl = navCtrl;
        this.sqlite = sqlite;
    }
    /**
     * On Init.
     */
    ScoreHistoryPage.prototype.ngOnInit = function () {
        this.hydrateScores();
    };
    /**
     * Navigate Back to home screen.
     */
    ScoreHistoryPage.prototype.goBack = function () {
        this.navCtrl.navigateBack('/home');
    };
    /**
     * Hydrate scores.
     */
    ScoreHistoryPage.prototype.hydrateScores = function () {
        var _this = this;
        return this.sqlite.executeSQL({
            procName: 'Score__Read_All',
        }).then(function (res) {
            _this.userScores = res;
        });
    };
    ScoreHistoryPage = __decorate([
        Component({
            selector: 'app-score-history',
            templateUrl: './score-history.page.html',
            styleUrls: ['./score-history.page.scss'],
        }),
        __metadata("design:paramtypes", [NavController,
            WlSqliteService])
    ], ScoreHistoryPage);
    return ScoreHistoryPage;
}());
export { ScoreHistoryPage };
//# sourceMappingURL=score-history.page.js.map