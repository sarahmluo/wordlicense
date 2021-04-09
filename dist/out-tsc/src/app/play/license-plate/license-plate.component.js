var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { WordTimerComponent } from 'src/app/word-common/word-timer/word-timer.component';
import { DictionaryService } from 'src/core/dictionary/dictionary.service';
import { WlSqliteService } from 'src/core/sqlite/sqlite.service';
var LicensePlateComponent = /** @class */ (function () {
    function LicensePlateComponent(alertCtrl, dictionary, navCtrl, sqlite, toast) {
        this.alertCtrl = alertCtrl;
        this.dictionary = dictionary;
        this.navCtrl = navCtrl;
        this.sqlite = sqlite;
        this.toast = toast;
        /**
         * Flag indicating if the game has started.
         */
        this.hasStarted = false;
        /**
         * Dynamic css for image div.
         */
        this.imageCss = {};
        /**
         * Default initials for entering score.
         */
        this.defaultInitials = 'AAA';
        /**
         * Number of license plate images.
         */
        this.numLicensePlates = 15;
    }
    /**
     * On Init.
     */
    LicensePlateComponent.prototype.ngOnInit = function () {
        this.licenseImage.nativeElement.style.backgroundImage = 'url(../../../assets/licensePlates/1.png)';
    };
    /**
     * Start the game.
     */
    LicensePlateComponent.prototype.startGame = function () {
        this.hasStarted = true;
        this.letters = this.dictionary.letters;
        this.numLetters = this.letters.length;
        this.attempts = 0;
        this.successes = 0;
        this.currentIndex = Math.floor(Math.random() * this.numLetters);
        this.getNewLicenseDisplay();
    };
    /**
     * Get a new license display.
     */
    LicensePlateComponent.prototype.getNewLicenseDisplay = function () {
        var num = Math.ceil(Math.random() * this.numLicensePlates);
        this.licenseImage.nativeElement.style.backgroundImage = "url(../../../assets/licensePlates/" + num + ".png";
        this.getNewLetters();
        this.getNewLicenseNumber();
        if (this.timer) {
            this.timer.resetTimer();
        }
    };
    /**
     * Skip the current set of letters.
     */
    LicensePlateComponent.prototype.skip = function () {
        this.attempts++;
        this.wordInput = '';
        this.getNewLicenseDisplay();
    };
    /**
     * Stop the game.
     */
    LicensePlateComponent.prototype.stop = function () {
        if (this.hasStarted) {
            // prompt to save score
            this.timer.stopTimer();
            return this.presentSaveAlert();
        }
        else {
            return Promise.resolve();
        }
    };
    /**
     * Process word submission.
     */
    LicensePlateComponent.prototype.onWordSubmit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var letter1, letter2, letter3, regExp, tst, tst;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        letter1 = this.letters[this.currentIndex][0];
                        letter2 = this.letters[this.currentIndex][1];
                        letter3 = this.letters[this.currentIndex][2];
                        regExp = new RegExp('^([a-z])*' + letter1 + '([a-z])*' + letter2 + '([a-z])*' + letter3 + '([a-z])*$');
                        if (!!regExp.test(this.wordInput.toLowerCase())) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.toast.create({
                                message: 'That word doesn\'t match the given letters!',
                                duration: 2000,
                                position: 'top',
                                showCloseButton: true
                            })];
                    case 1:
                        tst = _a.sent();
                        return [2 /*return*/, tst.present()];
                    case 2:
                        if (!!this.dictionary.dictionary.has(this.wordInput.toLowerCase())) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.toast.create({
                                message: 'That word is not in the dictionary!',
                                duration: 2000,
                                position: 'top',
                                showCloseButton: true
                            })];
                    case 3:
                        tst = _a.sent();
                        return [2 /*return*/, tst.present()];
                    case 4:
                        // Passed checks update score.
                        this.successes++;
                        this.attempts++;
                        this.wordInput = '';
                        this.getNewLicenseDisplay();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Logic to create an present an alert controller to save
     * the user's score.
     */
    LicensePlateComponent.prototype.presentSaveAlert = function () {
        return __awaiter(this, void 0, void 0, function () {
            var saveAlert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Save Score?',
                            message: 'Provide your initials to save your score',
                            inputs: [
                                {
                                    name: 'initials',
                                    type: 'text',
                                    id: 'initials',
                                    placeholder: this.defaultInitials
                                }
                            ],
                            buttons: [
                                {
                                    text: 'No Thanks',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        _this.navCtrl.navigateBack('/home');
                                    }
                                },
                                {
                                    text: 'Save',
                                    handler: function (data) {
                                        return _this.saveScore(data).then(function () {
                                            _this.reset();
                                        });
                                    }
                                }
                            ]
                        })];
                    case 1:
                        saveAlert = _a.sent();
                        return [4 /*yield*/, saveAlert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Save a user's score.
     *
     * @param data User input.
     */
    LicensePlateComponent.prototype.saveScore = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var initials;
            var _this = this;
            return __generator(this, function (_a) {
                initials = data.initials ? data.initials.toString().toUpperCase() : this.defaultInitials;
                return [2 /*return*/, this.sqlite.executeSQL({
                        procName: 'Score__Create',
                        params: {
                            Initials: initials.length > 3 ? initials.substring(0, 3) : initials,
                            Score: this.successes,
                            Total: this.attempts,
                            ScoreDate: new Date().toISOString()
                        }
                    }).then(function () {
                        return _this.alertCtrl.create({
                            header: 'Save Confirmation',
                            message: 'Save Successful!',
                            buttons: ['OK']
                        });
                    })
                        .then(function (res) {
                        return res.present();
                    })];
            });
        });
    };
    /**
     * Reset runtime variables.
     */
    LicensePlateComponent.prototype.reset = function () {
        this.hasStarted = false;
        this.attempts = 0;
        this.successes = 0;
        this.wordInput = '';
        if (this.timer) {
            this.timer.resetTimer();
        }
    };
    /**
     * Get a new set of letters.
     */
    LicensePlateComponent.prototype.getNewLetters = function () {
        var index;
        do {
            index = Math.floor(Math.random() * this.numLetters);
        } while (index === this.currentIndex);
        this.currentIndex = index;
    };
    /**
     * Get a new license number.
     */
    LicensePlateComponent.prototype.getNewLicenseNumber = function () {
        var num = Math.floor(Math.random() * 1000);
        this.licenseNumber = num <= 99 ? ('00' + num).slice(-3) : num.toString();
    };
    __decorate([
        ViewChild(WordTimerComponent),
        __metadata("design:type", WordTimerComponent)
    ], LicensePlateComponent.prototype, "timer", void 0);
    __decorate([
        ViewChild('licenseImage'),
        __metadata("design:type", ElementRef)
    ], LicensePlateComponent.prototype, "licenseImage", void 0);
    LicensePlateComponent = __decorate([
        Component({
            selector: 'app-license-plate',
            templateUrl: './license-plate.component.html',
            styleUrls: ['./license-plate.component.scss']
        }),
        __metadata("design:paramtypes", [AlertController,
            DictionaryService,
            NavController,
            WlSqliteService,
            ToastController])
    ], LicensePlateComponent);
    return LicensePlateComponent;
}());
export { LicensePlateComponent };
//# sourceMappingURL=license-plate.component.js.map