import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { MonthYearPickerComponent } from '../month-year-picker/month-year-picker.component';

@Component({
  selector: 'app-month-year-dialog',
  templateUrl: './month-year-dialog.component.html',
  styleUrls: ['./month-year-dialog.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
  providers: [DatePipe],
})
export class MonthYearDialogComponent {
  public monthDate: any = new Date();
  @Input() showLabel: boolean = true;
  @Output() dateChange = new EventEmitter<string>();
  constructor(private modalCtrl: ModalController, private datePipe: DatePipe) {
    this.monthDate = this.datePipe.transform(this.monthDate, 'MMMM yyyy') || '';
  }

  async openMonthYearModal() {
    const modal = await this.modalCtrl.create({
      component: MonthYearPickerComponent,
      backdropDismiss: true,
      cssClass: 'modal-transparent',
      componentProps: {
        activeDate: this.monthDate,
      },
    });
    modal.present();

    modal.onDidDismiss().then(({ data }) => {
      this.monthDate = data?.date;
      this.dateChange.emit(data?.dateVal);
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.modalCtrl.dismiss({});
  }
}
