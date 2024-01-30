import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  SkipSelf,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import { IOption } from '../select/option.type';
import { SelectModal } from './select-modal/select-modal.modal';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'select-popup',
  templateUrl: './select-popup.modal.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (container: ControlContainer) => container,
      deps: [[new SkipSelf(), ControlContainer]],
    },
  ],
})
export class SelectPopup implements OnInit {
  @Input() options: IOption[] = [];
  @Input() desc: string = '';
  @Input() title: string = '';
  @Input() label: string = '';
  @Input('selected')
  public set setActiveSelect(selected: string | number) {
    this.activeSelect = selected;
    this.cdr.markForCheck();
  }
  @Input() placeholder: string = 'Pilih Kategori';
  @Input() onChange: any = undefined;
  @Input() controlName: string = '';
  @Input() className: string =
    'w-full border border-neutral-500 p-3 flex space-x-3 items-center rounded-xl w-full mb-6 h-[44px]';
  private activeSelect: string | number = '';
  constructor(
    private modalCtrl: ModalController,
    public screenSizeService: ScreenSizeService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  async openPopup() {
    const modal = await this.modalCtrl.create({
      component: SelectModal,
      cssClass: 'modal-web ion-background-transparent',
      componentProps: {
        options: this.options,
        selected: this.activeSelect,
        title: this.title,
        desc: this.desc,
      },
    });
    await modal.present();
    modal.onDidDismiss().then(({ data }) => {
      this.activeSelect = data.id;
      this.onChange(data.id);
    });
  }

  getSelected = () => {
    for (let i = 0; i < this.options.length; i++) {
      if (this.options[i].id === this.activeSelect) {
        return this.options[i].label;
      }
    }

    return this.placeholder;
  };
}
