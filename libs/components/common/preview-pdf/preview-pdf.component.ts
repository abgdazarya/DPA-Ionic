import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonicModule, ModalController, NavController, NavParams } from '@ionic/angular';
import { AppCommonIconComponentModule } from '@components/common';
import { AppCommonButtonComponentModule } from '../button/module';
import { Router } from '@angular/router';
import { PDFProgressData, PdfViewerModule } from 'ng2-pdf-viewer';
@Component({
  selector: 'app-preview-pdf',
  templateUrl: './preview-pdf.component.html',
  styleUrls: ['./preview-pdf.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    AppCommonIconComponentModule,
    AppCommonButtonComponentModule,
    PdfViewerModule,
  ],
})
export class PreviewPdfComponent {
  @Input() urlPDF: string = '';

  constructor(
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private router: Router
  ) {
    this.urlPDF = navParams.get('urlPDF');
  }

  isLoading:boolean = true;
  onProgress(progressData: PDFProgressData) {
    if(progressData.total){
      this.isLoading = false;
    }
  }

  handleClose(action:any) {
    this.modalCtrl.dismiss(action);
  }
}
