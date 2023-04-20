import { Component, OnInit } from '@angular/core';
import { ScanService } from '../scan.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  scanning = false;
  scanResult: string;


  constructor(private scanService: ScanService) { }

  async scan() {
    try {
      this.scanning = true;
      const result = await this.scanService.scan();
      this.scanning = false;
      if (result) {
        this.scanResult = result;
      }
    } finally {
      this.scanning = false;
    }
  }
}
