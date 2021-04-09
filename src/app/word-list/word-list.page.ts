import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { DictionaryService } from 'src/core/dictionary/dictionary.service';

@Component({
  selector: 'app-word-list',
  templateUrl: './word-list.page.html',
  styleUrls: ['./word-list.page.scss']
})
export class WordListPage implements OnInit {
  constructor(
    private dictionary: DictionaryService,
    private navCtrl: NavController,
    private toast: ToastController
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
   * Flag indicating first entry.
   */
  public firstEntry: boolean = true;

  /**
   * Flag indicating whether to show no words message.
   */
  public showMsg: boolean = false;

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

    this.firstEntry = false;
    this.showMsg = true;
    // validate user input
    const regex: RegExp = new RegExp('^([a-z]){3}$');
    if (!regex.test(this.letterInput.toLowerCase())) {
      const tst: HTMLIonToastElement = await this.toast.create({
        message: 'Please enter three letters only',
        duration: 2000,
        position: 'top',
        buttons: [
          {
          text: 'Close',
          role: 'cancel'
          }
        ]
      });

      return tst.present();
    }

    // hydrate word list
    this.wordList = this.dictionary.wordList[this.letterInput.toLowerCase()] || [];
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

}
