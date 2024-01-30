import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yearMonth',
})
export class YearMonthPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): any {
    const startDate = new Date(value);
    const currentDate = new Date();

    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth();

    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    let yearDifference = currentYear - startYear;
    let monthDifference = currentMonth - startMonth;

    // Adjust month difference if negative
    if (monthDifference < 0) {
      monthDifference += 12;
      yearDifference--;
    }

    return `${yearDifference>0 ? yearDifference + ' ' + 'Tahun' : ''} ${monthDifference} Bulan`
  }
}
