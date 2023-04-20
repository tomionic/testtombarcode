import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ModalController } from '@ionic/angular';
import { ScanPage } from './scan/scan.page';

@Injectable({
  providedIn: 'root'
})
export class ScanService {

  constructor(private modalCtrl: ModalController) { }

  async prepare() {
    BarcodeScanner.prepare();
  }

  async scan(): Promise<string> {

    const modal = await this.modalCtrl.create({ component: ScanPage });
    await modal.present();
    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      await modal.dismiss();
      return data;
    }
    return undefined;
  }

}
