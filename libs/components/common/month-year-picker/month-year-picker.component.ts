import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { AppCommonIconComponentModule } from '../icon/module';
import { BottomSheetComponent } from '../../common/bottom-sheet/bottom-sheet.component';
import { FormsModule } from '@angular/forms';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-month-year-picker',
  templateUrl: './month-year-picker.component.html',
  styleUrls: ['./month-year-picker.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    BottomSheetComponent,
    AppCommonIconComponentModule,
    FormsModule,
  ],
  providers: [DatePipe],
})
export class MonthYearPickerComponent {
  @Input() activeDate: any;
  date: any = '';
  maxYear = new Date().getFullYear() - 2;
  constructor(private modalCtrl: ModalController, private datePipe: DatePipe) {
    this.activeDate = dayjs(this.activeDate || new Date()).format('YYYY-MM-DD');
    this.date = this.datePipe.transform(this.activeDate, 'MMMM yyyy');
  }
  public async dismissModal() {
    const date =
      this.date === ''
        ? this.datePipe.transform(Date.now(), 'MMMM yyyy')
        : this.datePipe.transform(this.date, 'MMMM yyyy');

    await this.modalCtrl.dismiss({
      date,
      dateVal: this.datePipe.transform(this.date == null || this.date == '' ? Date.now():this.date, 'M yyyy'),
    });
  }
  onChange(event: any): void {
    this.date = event?.target?.value || '';
  }
  handleClose() {
    this.modalCtrl.dismiss();
  }
}
