import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { NoPesertaData } from '@controllers/auth';
import { Store } from '@ngrx/store';
import { convertEntries } from '@shared';
import { AuthInteractionRepository, AuthRepository } from '@stores/auth';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import { StorageService } from 'libs/services/common/storage.service';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';

@Component({
  selector: 'app-auth-verify-method-container',
  templateUrl: './verify-method.container.html',
  styleUrls: ['./verify-method.container.scss'],
  providers: [AuthRepository, AuthInteractionRepository],
})
export class AuthVerifyMethodContainer implements OnInit, OnDestroy {
  public isOpenModal: boolean = true;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.handleSetContainer();
  }

  @Input() number: string | undefined | null = '08954440321321';

  @Input()
  // public noPesertaData: NoPesertaData[] = [];
  public noPesertaData: NoPesertaData[] = [
    convertEntries({
      ID_ACCOUNT: 'ACC000000002',
      NO_PESERTA: '55667788',
      NAMA_PESERTA: 'Michael Pradana',
      STATUS_PESERTA: 'AKTIF',
      UMUR: 20,
      GAJI: 2500000,
      MASA_KERJA: 1,
      NAMA_PERUSAHAAN: 'MTRAG0000002',
    }),
    convertEntries({
      ID_ACCOUNT: 'ACC000000003',
      NO_PESERTA: '99001122',
      NAMA_PESERTA: 'Michael Pradana',
      STATUS_PESERTA: 'PENSIUNAN',
      UMUR: 20,
      GAJI: 2500000,
      MASA_KERJA: 1,
      NAMA_PERUSAHAAN: 'MTRAG0000002',
    }),
  ];

  @Output() public addUserClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() public noPesertaSelected: EventEmitter<NoPesertaData> =
    new EventEmitter<NoPesertaData>();

  // public loading$: Observable<boolean | undefined | null>;
  // public noPeserta$: Observable<NoPesertaModel | undefined | null>

  constructor(
    public authRepo: AuthRepository,
    public authInteractionRepo: AuthInteractionRepository,
    private store: Store,
    public screenSizeService: ScreenSizeService,
    public templateService: AppMainTemplateService,
    private storageService: StorageService,
    private cdr: ChangeDetectorRef
  ) {}

  private handleSetContainer() {
    this.isOpenModal = this.screenSizeService.isMobileNativeResolution()
      ? false
      : true;

    this.templateService.handleShowHeader(false);
    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.handleSetContainer();
    }, 0);
  }

  ngOnDestroy(): void {}

  public async handleClose() {
    // await this.modalCtrl.dismiss();
  }

  public async handleBack() {
    // await this.modalCtrl.dismiss({ back: true });
  }

  public async handleSelectMethod(method: string) {
    // await this.modalCtrl.dismiss({ method });
  }

  public async handleAddUser() {
    this.addUserClicked.emit();
  }
}
