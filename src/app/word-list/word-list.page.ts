import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, PopoverController } from '@ionic/angular';

import { WlSqliteService } from '../core/sqlite/sqlite.service';
import { DefPopoverComponent } from './def-popover/def-popover.component';

@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.page.html',
  styleUrls: ['./word-list.page.scss']
})
export class WordListPage implements OnInit {
  constructor(
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private sqlite: WlSqliteService,
    private popoverController: PopoverController
  ) { }

  /**
   * List of words to display.
   */
  public wordList: string[] = [];

  /**
   * User input.
   */
  public letterInput: string;

  /**
   * Flag indicating whether to show no words message.
   */
  public showMsg: boolean = false;

  /**
   * Message to display to the user.
   */
  public resMsg: string = '';

  /**
   * On Init.
   */
  public ngOnInit(): void {
  }

  /**
   * Navigate to previous page.
   */
  public goBack(): void {
    this.navCtrl.navigateBack('/home');
  }

  /**
   * Get list of words to display.
   */
  public async onLetterSubmit(): Promise<any> {

    const loading = await this.loadingCtrl.create({
      message: 'Loading word list'
    });

    await loading.present();

    return this.sqlite.executeSQL({
      procName: 'Words__Read_By_Letter_Combo',
      params: { letter1: this.letterInput[0],
                letter2: this.letterInput[1],
                letter3: this.letterInput[2]
      }
    }).then((res: any[]) => {
        this.wordList = res.map(x => x.Word);
        if (!this.wordList.length) {
          this.resMsg = 'We don\'t have any words for those letters';
          this.showMsg = true;
        }
        loading.dismiss();
    }).
    catch(err => {
      console.log(err.message);
      this.resMsg = 'There was an error retrieving the word list. Restart the app and try again.';
      this.showMsg = true;
      loading.dismiss();
    });
  }

  /**
   * Clear word list.
   */
  public clearWordList(): void {
    this.showMsg = false;

    if (this.letterInput.length == 0) {
      this.wordList = [];
    }
  }

  /**
   * Show definition popover.
   */
  public async showDefinition(event, word: string) {
    const popover = await this.popoverController.create({
      component: DefPopoverComponent,
      backdropDismiss: true,
      componentProps: {
        "word": word
      },
      cssClass : 'word-list-popover'
    });

    await popover.present();
  }

}
