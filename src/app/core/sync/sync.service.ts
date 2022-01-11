import { Injectable } from '@angular/core';

import { WlAlertService } from '../alert/alert.service';
import { WlApiService } from '../api/api.service';
import { WlSqliteService } from '../sqlite/sqlite.service';
import { WlDictionaryEntry } from './types';

@Injectable({
  providedIn: 'root'
})
export class WlSyncService {
  constructor(
    private alert: WlAlertService,
    private api : WlApiService,
    private sqlite : WlSqliteService ) { }

  /**
   * Syncs the dictionary.
   */
  public async syncDictionary(): Promise<number | void | any[]> {

    const syncDate = await this.sqlite.executeSQL({
      procName: 'Sync__Read'
    });

    const data = await this.api.get('sync', { clientSyncDate: syncDate[0].LastSyncDate }).toPromise();

    const dataToSync: WlDictionaryEntry[] = data;
    if (dataToSync.length === 0) {
      return Promise.resolve();
    }

    const syncPromises: Promise<any>[] = [];

    for (const syncItem of dataToSync) {
      // loose equality also checks for undefined
      // Words to delete
      if (syncItem.deleteDate != null) {
        syncPromises.push(this.sqlite.executeSQL({
          procName: 'Words__Delete',
          params: {
            serverId: syncItem.id
          }
        }));
      }

      // Words to update
      if (syncItem.deleteDate == null && syncItem.updateDate != null) {
        syncPromises.push(this.sqlite.executeSQL({
          procName: 'Words__Update',
          params: {
            word: syncItem.word,
            serverId: syncItem.id
          }
        }));
      }

      // New words to insert
      if (syncItem.deleteDate == null && syncItem.updateDate == null) {
        syncPromises.push(this.sqlite.executeSQL({
          procName: 'Words__Create',
          params: {
            serverId: syncItem.id,
            word: syncItem.word
          }
        }));
      }
    }

    return Promise.all(syncPromises)
    .then(() => {
      return this.sqlite.executeSQL({
        procName: 'Sync__Update',
        params: {
          syncDate: syncDate[0].LastSyncDate,
          syncId: syncDate[0].SyncId
        }
      });
    })
    .catch(err => {
      this.alert.error('There was an error syncing the dictionary: ' + err.message);
    });
  }
}
