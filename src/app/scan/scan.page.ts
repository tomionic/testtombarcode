import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage {

  constructor(private modalCtrl: ModalController) { }

  ionViewWillEnter() {
    this.scan();
  }

  async scan() {
    await BarcodeScanner.checkPermission({ force: true });
    BarcodeScanner.hideBackground();
    document.querySelector('body').classList.add('scanner-active');

    const result = await BarcodeScanner.startScan();

    document.querySelector('body').classList.remove('scanner-active');
    if (result.hasContent) {
      this.modalCtrl.dismiss(result.content, 'confirm');
    } else {
      this.modalCtrl.dismiss(undefined, 'cancel');
    }
  }

  cancel() {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body').classList.remove('scanner-active');
    this.modalCtrl.dismiss(undefined, 'cancel');
  }
}
