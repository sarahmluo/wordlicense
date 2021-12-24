import { Component, Input } from "@angular/core";
import { ModalController } from "@ionic/angular";

@Component({
  selector: 'app-submit-word-modal',
  templateUrl: 'submit-word-modal.component.html'
})
export class SubmitWordModalComponent {
  constructor(
    private modalCtrl : ModalController
  ){}

  @Input()
  public wordInput: string;

  public onYes(): void {
    this.modalCtrl.dismiss();
  }

  public onNo(): void {
    this.modalCtrl.dismiss();
  }

}
