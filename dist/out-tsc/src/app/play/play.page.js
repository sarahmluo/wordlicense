var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { LicensePlateComponent } from './license-plate/license-plate.component';
var PlayPage = /** @class */ (function () {
    function PlayPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    /**
     * Navigate to previous page.
     */
    PlayPage.prototype.goBack = function () {
        var _this = this;
        this.license.stop().then(function () {
            _this.navCtrl.navigateBack('/home');
        });
    };
    __decorate([
        ViewChild(LicensePlateComponent),
        __metadata("design:type", LicensePlateComponent)
    ], PlayPage.prototype, "license", void 0);
    PlayPage = __decorate([
        Component({
            selector: 'app-play',
            templateUrl: './play.page.html',
            styleUrls: ['./play.page.scss']
        }),
        __metadata("design:paramtypes", [NavController])
    ], PlayPage);
    return PlayPage;
}());
export { PlayPage };
//# sourceMappingURL=play.page.js.map