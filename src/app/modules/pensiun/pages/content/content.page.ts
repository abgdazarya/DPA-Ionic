import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Browser } from '@capacitor/browser';
import { ComponentType } from '@components/common';
import { DpaTvShareModal } from '@components/dpa-tv';
import {
  GetLaporanInvestasi,
  GetListPostinganRuangPensiun,
  JualBeliRuangPensiun,
  LaporanInvestasi,
  PostinganRuangPensiun,
} from '@controllers/menu';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import {
  DataResponseArray,
  DataResponsePagination,
  InteractionState,
} from '@shared';
import { AuthInteractionRepository, AuthRepository } from '@stores/auth';
import { MenuInteractionRepository, MenuRepository } from '@stores/menu';
import { StorageService } from 'libs/services/common/storage.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-pensiun-content-page',
  templateUrl: 'content.page.html',
  styleUrls: ['content.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    AuthRepository,
    AuthInteractionRepository,
    MenuRepository,
    MenuInteractionRepository,
  ],
})
export class ContentPage implements OnInit {
  public type: typeof ComponentType = ComponentType;

  @HostListener('window:resize')
  public onResize() {
    this.getComponentType();
  }

  public getComponentType(): ComponentType {
    const win = window;

    if (win.innerWidth <= 640) {
      return this.type.SMALL;
    }

    if (win.innerWidth > 640 && win.innerWidth <= 1024) {
      return this.type.MEDIUM;
    }

    return this.type.LARGE;
  }

  public postingan$: Observable<PostinganRuangPensiun[] | undefined | null>;
  public jualBeli$: Observable<JualBeliRuangPensiun[] | undefined | null>;

  public interactionPostingan$: Observable<InteractionState | undefined | null>;
  public interactionJualBeli$: Observable<InteractionState | undefined | null>;

  public keyword: string = '';

  constructor(
    private store: Store,
    private modalCtrl: ModalController,
    private router: Router,
    private menuRepository: MenuRepository,
    private menuInteractionRepository: MenuInteractionRepository,
    private storageService: StorageService
  ) {
    this.postingan$ = this.menuRepository.getPostinganRuangPensiunList$().pipe(
      map(
        (
          res: DataResponsePagination<PostinganRuangPensiun> | undefined | null
        ) => {
          if (!res?.data?.data?.length) return;
          const newData = res?.data?.data;
          return newData;
        }
      )
    );

    this.jualBeli$ = this.menuRepository.getPostinganRuangPensiunList$().pipe(
      map(
        (
          res: DataResponsePagination<PostinganRuangPensiun> | undefined | null
        ) => {
          if (!res?.data?.data?.length) return;
          const newData = res?.data?.data;
          return newData;
        }
      )
    );

    this.interactionPostingan$ =
      this.menuInteractionRepository.getPostinganRuangPensiunList$();

    this.interactionJualBeli$ =
      this.menuInteractionRepository.getJualBeliRuangPensiunList$();
  }

  ngOnInit(): void {
    this.fetchPostinganRuangPensiun();
  }

  public fetchPostinganRuangPensiun(): void {
    this.storageService
      .getStorage(StorageKeyEnum.NOMOR_PESERTA)
      .then((data) => {
        if (data) {
          const payload = {
            ...data,
            idKategori: 'KRP000000001',
            keyword: this.keyword,
            limit: 10,
            page: 1,
            sort: 'DESC',
            sortBy: 'JUDUL_THREAD',
          };

          // this.store.dispatch(GetListPostinganRuangPensiun({ payload }));
        }
      });
  }

  public handleNavigateUrl(url: string): void {
    this.router.navigateByUrl(url);
  }

  handleDetailLaporanInvestasiClicked(laporan: LaporanInvestasi): void {
    this.router.navigate([`investasi/${laporan.idLaporanInvestasi}`], {
      queryParamsHandling: 'merge',
    });
    if (laporan.pdf) {
      // await Browser.open({
      //   url: laporan.pdf,
      //   presentationStyle: 'popover',
      // });
    }
  }

  async handleOpenDpaTvShareModal() {
    const modal = await this.modalCtrl.create({
      component: DpaTvShareModal,
      cssClass: 'modal-web ion-background-white',
    });
    modal.present();
  }
}
