import { Component, OnInit } from '@angular/core';

import { WlAlertService } from '../alert.service';
import { WlAlert } from '../types';

@Component({
  selector: 'wl-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class WlAlertComponent implements OnInit {
  constructor(
    private alertService: WlAlertService
) { }

/**
 * Collection of active alerts.
 */
public alerts: WlAlert[] = [];
/**
 * Init.
 */
public ngOnInit(): void {
    this.alertService.emitter.subscribe((alert: WlAlert) => {
        this.add(alert);
    });
}

/**
 * Add an alert from the collection.
 *
 * @param alert Alert to add.
 */
private add(alert: WlAlert): void {
    let dupe: WlAlert = this.alerts.find(x => x.type === alert.type && x.text === alert.text);

    if (dupe) {
        dupe.count++;
        alert = dupe;
    } else {
        this.alerts.push(alert);
    }

    // clear potential timeout from dupe
    if (alert.timeoutId) {
        clearTimeout(alert.timeoutId);
    }

    // auto remove after duration
    if (alert.duration) {
        setTimeout(() => this.remove(alert), alert.duration);
    }
}

/**
 * Remove an alert from the collection.
 *
 * @param alert Alert to remove.
 */
private remove(alert: WlAlert): void {
    let index: number = this.alerts.indexOf(alert);

    if (index !== -1)  {
        this.alerts.splice(index, 1);
    }
}

}
