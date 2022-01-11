import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { WlAlertService } from '../core/alert/alert.service';

import { WlSyncService } from '../core/sync/sync.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  constructor(
    private alert: WlAlertService,
    private loadingCtrl: LoadingController,
    private sync: WlSyncService ) { }

  /**
   * Calls the sync method.
   */
  public async syncDictionary(): Promise<boolean | void> {
    const loading = await this.loadingCtrl.create({
      message: 'Syncing Dictionary...',
    });
    await loading.present();

    return this.sync.syncDictionary()
      .then(() => {
        loading.dismiss();
        this.alert.info('Dictionary synced!');
      })
      .catch(() => loading.dismiss());
  }
}
