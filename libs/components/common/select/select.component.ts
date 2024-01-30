import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnInit,
  SimpleChanges,
  SkipSelf,
  ViewChild,
  OnChanges,
} from '@angular/core';
import {
  ControlContainer,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  IonPopover,
  IonSelectOption,
  IonicModule,
  PopoverController,
} from '@ionic/angular';
import { IOption } from './option.type';
import { AppCommonIconComponentModule } from '../icon/module';
import { PopOverSelect } from './pop-over-select/pop-over-select.component';
import { PopOverSelectModule } from './pop-over-select/module';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppCommonIconComponentModule,
    PopOverSelectModule,
  ],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (container: ControlContainer) => container,
      deps: [[new SkipSelf(), ControlContainer]],
    },
  ],
})
export class SelectComponent implements OnChanges {
  @ViewChild('selectCustom', { static: false }) selectRef:
    | any
    | IonSelectOption = {};
  @Input() options: IOption[] = [];
  @Input() label: string = '';
  @Input() class: string = 'w-full';
  @Input() disable: boolean = false;
  @Input() placeholder: string = '';
  @Input() controlName: string = '';
  @Input() interfaceOptions: any = '';
  @Input() isCustom: boolean = false;
  @Input() isLoading: boolean | any = false;
  @Input() formGroup: FormGroup | any = null;

  public isOpen: boolean = false;
  public value: IOption | any = {
    id: this.placeholder,
    label: this.placeholder,
  };
  public optionsFilters: IOption[] | null = null;
  private selectPop: any = null;

  constructor(private popoverController: PopoverController) {
    this.getValue();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getValue();
    this.optionsFilters = null;
  }

  public triggerButton = (e: Event) => {
    if (!this.disable) {
      if (this.formGroup) {
        this.onOpenSelect(e);
        return;
      }
      this.selectRef?.el?.click?.();
    }
  };

  onChanges = (e: any) => {
    if (this.formGroup) {
      this.formGroup.get(this.controlName)?.setValue(e.id || '');
      this.value = e;
    }
  };

  getValue = () => {
    if (this.formGroup) {
      const tempVal = this.formGroup.get(this.controlName).value;
      if (!tempVal) {
        this.value = {
          id: this.placeholder,
          label: this.placeholder,
        };
        return;
      }
      for (let i = 0; i < this.options.length; i++) {
        const item = this.options[i];
        if (item.id == tempVal) {
          this.value = item;
          break;
        }
      }
    }
  };

  // onSearch = (e: any) => {
  //   const value = (e.detail.value || e.target.value)?.toString()?.toLowerCase();
  //   const result: IOption[] = [];
  //   const optionsLength = this.options.length;
  //   for (let i = 0; i < optionsLength; i++) {
  //     const item = this.options[i];
  //     const testValue = item.label?.toString()?.toLowerCase();
  //     if (testValue.match(value)) {
  //       result.push(item);
  //     }
  //
  //   }
  //   this.optionsFilters = result.length == optionsLength ? null : result;
  // };

  getOptions = () => this.optionsFilters || this.options;

  onOpenSelect = async (e: Event = this.selectRef) => {
    if (this.disable) return;
    this.selectPop = await this.popoverController.create({
      component: PopOverSelect,
      componentProps: {
        options: this.options,
      },
      size: 'cover',
      cssClass: 'pop-up-selet',
      event: e,
      alignment: 'start',
      side: 'top',
    });
    await this.selectPop.present();
    this.selectPop.onDidDismiss().then(({ data }: any) => {
      if (data) {
        this.onChanges(data);
      }
    });
  };
}
