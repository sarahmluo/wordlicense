import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { WlAlertType } from './enums';
import { WlAlert } from './types';

@Injectable({
  providedIn: 'root'
})
export class WlAlertService {

  constructor() { }

  public emitter: Subject<WlAlert> = new Subject<WlAlert>();

  private defaultCss = {
      [WlAlertType.Error]: 'alert-danger',
      [WlAlertType.Success]: 'alert-success',
      [WlAlertType.Warning]: 'alert-warning',
      [WlAlertType.Info]: 'alert-info'
  };

  /**
   * Show error alert.
   *
   * @param message Text to display in the alert.
   */
  public error(message: string): void {
      this.add({
          text: message,
          type: WlAlertType.Error
      });
  }

  /**
   * Show info alert.
   *
   * @param message Text to display in the alert.
   */
  public success(message: string): void {
      this.add({
          text: message,
          type: WlAlertType.Success
      });
  }

  /**
   * Show warning alert.
   *
   * @param message Text to display in the alert.
   */
  public warning(message: string): void {
      this.add({
          text: message,
          type: WlAlertType.Warning
      });
  }

  /**
   * Show info alert.
   *
   * @param message Text to display in the alert.
   */
  public info(message: string): void {
      this.add({
          text: message,
          type: WlAlertType.Info
      });
  }

  /**
   * Show an alert.
   *
   * @param alert Alert to add.
   */
  public add(alert: WlAlert): void {

      // default config
      alert = Object.assign(new WlAlert(), {
          css: this.defaultCss[alert.type]
      }, alert);

      this.emitter.next(alert);
  }
}
