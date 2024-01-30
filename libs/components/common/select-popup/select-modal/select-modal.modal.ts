import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import { IOption } from '../../select/option.type';

@Component({
  selector: 'select-modal',
  templateUrl: './select-modal.modal.html',
  providers: [],
})
export class SelectModal implements OnInit {
  @Input() options: IOption[] = [];
  @Input() selected: string = '';
  @Input() title: string = '';
  @Input() desc: string = '';
  constructor(
    private modalCtrl: ModalController,
    public screenSizeService: ScreenSizeService
  ) {}

  ngOnInit(): void {}

  public handleClose = async () => {
    await this.modalCtrl.dismiss({});
  };

  item:any;
  public async onClick(item: any) {
    this.item = item;
    this.selected = item.id;
  }

  public async onSelect() {
    await this.modalCtrl.dismiss({ ...this.item });
  }
}
