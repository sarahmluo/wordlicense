var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as moment from 'moment';
var WordTimerComponent = /** @class */ (function () {
    function WordTimerComponent() {
        /**
         * Display text. Defaults to 'Time.'
         */
        this.displayText = 'Time';
        /**
         * Color in hex string format. Defaults to black.
         */
        this.color = '#000';
        /**
         * Shape. 'round' for rounded ends, 'full' for cornered ends.
         * Defaults to 'round'.
         */
        this.shape = 'round';
        /**
         * Fill. Defaults to 'solid'.
         */
        this.fill = 'solid';
        /**
         * Start time in milliseconds. Defaults to 5 seconds.
         */
        this.startTime = 5000;
        /**
         * Event emitted when timer finishes.
         */
        this.timesUp = new EventEmitter();
    }
    /**
     * On Init.
     */
    WordTimerComponent.prototype.ngOnInit = function () {
        this.setCss();
        this.resetTimer();
    };
    /**
     * Reset the timer.
     */
    WordTimerComponent.prototype.resetTimer = function () {
        clearTimeout(this.timer);
        this.timeRemaining = this.startTime;
        this.setDisplayTime(this.timeRemaining);
        this.runTimer();
    };
    /**
     * Stop the timer.
     */
    WordTimerComponent.prototype.stopTimer = function () {
        clearTimeout(this.timer);
    };
    /**
     * Run the timer.
     */
    WordTimerComponent.prototype.runTimer = function () {
        var _this = this;
        this.timer = setTimeout(function () {
            _this.timeRemaining -= 1000;
            _this.setDisplayTime(_this.timeRemaining);
            if (_this.timeRemaining <= 0) {
                _this.timesUp.emit();
            }
            else {
                _this.runTimer();
            }
        }, 1000);
    };
    /**
     * Initialize timer CSS.
     */
    WordTimerComponent.prototype.setCss = function () {
        // todo: move hard coded values elsewhere
        this.css = {
            'background-color': this.fill === 'solid' ? this.color : '#fff',
            'border': this.fill === 'outline' ? '2px solid ' + this.color : '0px',
            'border-radius': this.shape === 'full' ? '0px' : '50px',
            'color': this.fill === 'solid' ? '#fff' : this.color,
            'display': 'inline-block',
            'padding': '5px 10px'
        };
    };
    /**
     * Set the display time.
     *
     * @param time the time to display.
     */
    WordTimerComponent.prototype.setDisplayTime = function (time) {
        this.displayTime = moment().startOf('day').milliseconds(time).format('HH:mm:ss');
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], WordTimerComponent.prototype, "displayText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], WordTimerComponent.prototype, "color", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], WordTimerComponent.prototype, "shape", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], WordTimerComponent.prototype, "fill", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], WordTimerComponent.prototype, "startTime", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], WordTimerComponent.prototype, "timesUp", void 0);
    WordTimerComponent = __decorate([
        Component({
            selector: 'app-word-timer',
            templateUrl: './word-timer.component.html',
            styleUrls: ['./word-timer.component.scss']
        }),
        __metadata("design:paramtypes", [])
    ], WordTimerComponent);
    return WordTimerComponent;
}());
export { WordTimerComponent };
//# sourceMappingURL=word-timer.component.js.map