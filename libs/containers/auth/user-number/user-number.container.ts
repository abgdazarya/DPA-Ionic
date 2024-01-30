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
import { convertEntries, decryptContent } from '@shared';
import { AuthInteractionRepository, AuthRepository } from '@stores/auth';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import { StorageService } from 'libs/services/common/storage.service';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';

@Component({
  selector: 'app-auth-user-number-container',
  templateUrl: './user-number.container.html',
  styleUrls: ['./user-number.container.scss'],
  providers: [AuthRepository, AuthInteractionRepository],
})
export class AuthUserNumberContainer implements OnInit, OnDestroy {
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.handleSetContainer();
  }

  @Input()
  public noPesertaData: NoPesertaData[] | undefined | null = [];
  // public noPesertaData: NoPesertaData[] | undefined | null = [
  //   convertEntries({
  //     ID_ACCOUNT: 'ACC000000002',
  //     NO_PESERTA: '55667788',
  //     NAMA_PESERTA: 'Michael Pradana',
  //     STATUS_PESERTA: 'AKTIF',
  //     UMUR: 20,
  //     GAJI: 2500000,
  //     MASA_KERJA: 1,
  //     NAMA_PERUSAHAAN: 'MTRAG0000002',
  //   }),
  //   convertEntries({
  //     ID_ACCOUNT: 'ACC000000003',
  //     NO_PESERTA: '99001122',
  //     NAMA_PESERTA: 'Michael Pradana',
  //     STATUS_PESERTA: 'PENSIUNAN',
  //     UMUR: 20,
  //     GAJI: 2500000,
  //     MASA_KERJA: 1,
  //     NAMA_PERUSAHAAN: 'MTRAG0000002',
  //   }),
  // ];
  @Input() public isOpenModal!: boolean | null;
  public isModalVisible!: boolean | null;

  @Output() public noPesertaSelected: EventEmitter<NoPesertaData | any> =
    new EventEmitter<NoPesertaData | any>();

  @Output() public backClicked: EventEmitter<any> = new EventEmitter<any>();
  @Output() public closeClicked: EventEmitter<any> = new EventEmitter<any>();

  @Output() public completed: EventEmitter<NoPesertaData> =
    new EventEmitter<NoPesertaData>();

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
    this.isModalVisible = this.screenSizeService.isMobileNativeResolution()
      ? false
      : true;

    this.cdr.markForCheck();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.handleSetContainer();
    }, 0);
  }

  public decryptNoPes(noPes: string | undefined | null) {
    return decryptContent(<string>noPes);
  }

  ngOnDestroy(): void {}

  public async handleClose() {
    this.closeClicked.emit();
  }

  public async handleBack() {
    this.backClicked.emit();
  }

  public handleSelectNoPeserta(noPeserta?: NoPesertaData | null) {
    this.noPesertaSelected.emit(noPeserta);
  }
}
