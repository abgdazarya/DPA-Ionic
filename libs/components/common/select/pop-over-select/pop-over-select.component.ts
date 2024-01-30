import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';
import { IOption } from '../option.type';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-pop-over-select',
  templateUrl: './pop-over-select.component.html',
  styleUrls: ['./pop-over-select.component.scss'],
})
export class PopOverSelect implements OnChanges {
  @Input() options: IOption[] = [];
  public optionsFilters: IOption[] | null = null;

  constructor(private popoverController: PopoverController) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.optionsFilters = null;
  }

  onChanges = (e: any) => {
    this.popoverController.dismiss({ ...e });
  };

  onSearch = (e: any) => {
    const value = (e.detail.value || e.target.value)?.toString()?.toLowerCase();
    const result: IOption[] = [];
    const optionsLength = this.options.length;
    for (let i = 0; i < optionsLength; i++) {
      const item = this.options[i];
      const testValue = item.label?.toString()?.toLowerCase();
      if (testValue.match(value)) {
        result.push(item);
      }
    }
    this.optionsFilters = result.length == optionsLength ? null : result;
  };

  getOptions = () => this.optionsFilters || this.options;
}
