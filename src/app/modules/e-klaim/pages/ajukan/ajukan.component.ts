import { HttpClient } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ComponentType } from '@components/common';
import {
  BaseProfile,
  DetailProfile,
  UserDetail,
  UserInfo,
} from '@controllers/profile';
import { IonContent, ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { InteractionState, decryptContent } from '@shared';
import {
  ProfileRepository,
  ProfileInteractionRepository,
} from '@stores/profile';
import { EklaimAjukanService } from 'libs/controllers/e-klaim/services/e-klaim-ajukan.service';
import { EklaimLoginService } from 'libs/controllers/e-klaim/services/e-klaim-login.service';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { ProfileState } from 'libs/stores/profile/states/profile.state';
import { Observable, filter, take, tap } from 'rxjs';
import { AppComponentService } from 'src/app/app.component.service';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';
@Component({
  selector: 'app-ajukan',
  templateUrl: './ajukan.component.html',
  styleUrls: ['./ajukan.component.scss'],
})
export class AjukanComponent implements OnInit {
  private key = 'BerijalanxDPA2023';
  public response$: Observable<BaseProfile | undefined | null>;
  public detailProfile$: Observable<DetailProfile | undefined | null>;
  public interactionResponse$: Observable<InteractionState | undefined | null>;
  public interactionResponseDetailProfile$: Observable<
    InteractionState | undefined | null
  >;

  public type: typeof ComponentType = ComponentType;
  @HostListener('window:resize')
  public onResize() {
    this.getComponentType();
    this.initHeader();
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

  constructor(
    private store: Store<ProfileState>,
    private profileRepository: ProfileRepository,
    private profileInteractionRepository: ProfileInteractionRepository,
    private modalCtrl: ModalController,
    private storageService: StorageService,
    private eklaimAjukanServices: EklaimAjukanService,
    private eklaimLoginServices: EklaimLoginService,
    private cdr: ChangeDetectorRef,
    public screenSizeService: ScreenSizeService,
    public templateService: AppMainTemplateService,
    private http: HttpClient,
    private parent: IonContent,
    public appService: AppComponentService,
    private sanitizer: DomSanitizer
  ) {
    this.response$ = this.profileRepository.getUserInfoData$();
    this.detailProfile$ = this.profileRepository.getUserDetailData$();
    this.interactionResponseDetailProfile$ =
      this.profileInteractionRepository.getUserDetailInteraction$();

    this.interactionResponse$ =
      this.profileInteractionRepository.getUserInfoInteraction$();

    // this.detailProfile$.subscribe((res) => {});
    this.initHeader();
  }

  initHeader = () => {
    this.templateService.handleInit();
    this.templateService.handleChangeIonHeaderClass('');
    this.templateService.handleChangeSecondaryHeaderClass('text-800');
    this.templateService.handleChangeHeaderContainerClass(
      this.screenSizeService.isDesktopNativeResolution()
        ? 'bg-gradient-to-t from-lazuli-400 to-lazuli-200 w-full rounded-bl-4xl rounded-br-4xl md:rounded-none text-800'
        : 'bg-bg-0 h-[78px] text-800'
    );
    this.templateService.handleChangePageTitle('Ajukan e-Klaim');
    this.templateService.handleUseSecondaryHeader(true);
  };

  async ngOnInit() {
    this.appService.handleShowLoadingPending(true, 'init ajukan page');
    this.cdr.markForCheck();
    this.initHeader();
    this.fetchUserDetail();
    this.fetchUserInfo();
    this.getToken();
  }

  async fetchUserDetail() {
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    if (!idProfilDpa) return;
    const payload = {};
    this.store.dispatch(UserDetail({ payload }));
  }

  async fetchUserInfo() {
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    if (!idProfilDpa) return;
    const payload = {};
    this.store.dispatch(UserInfo({ payload }));
  }

  async getToken() {
    await this.detailProfile$
      .pipe(
        filter((res) => !!res),
        take(1),
        tap(async (data) => {
          const payload = {
            email: 'user@dapenastra.com',
            password: 'user12345',
          };
          this.eklaimLoginServices.postLoginEklaim(payload).subscribe(
            (res: any) => {
              this.submit(res);
              this.appService.handleShowLoadingPending(false, 'success get token');
            },
            (err) => {
              this.appService.handleShowLoadingPending(false, 'failed get token');
            }
          );
        })
      )
      .subscribe();
  }

  public decryptEklm(content: any): any {
    return decryptContent(content);
  }

  safeHtml!: SafeHtml;
  async submit(eklmDataLogin: any) {
    const noPeserta = await this.storageService.getStorage(
      StorageKeyEnum.NOMOR_PESERTA
    );
    // const idProfilDpa = await this.storageService.getStorage(StorageKeyEnum.ID_PROFILE_DPA);
    const payload = {
      isMobile: '1',
      KdPeserta: noPeserta?.noPeserta,
      Password: noPeserta?.eklm,
      Token: eklmDataLogin.access_token,
      // ID_PROFILE_DPA: idProfilDpa,
    };
    this.eklaimAjukanServices.postAjukanEklaim(payload).subscribe(
      (res: any) => {
        this.appService.handleShowLoadingPending(
          false,
          'eklaim success ajukan page'
        );
        this.parent.scrollToTop(0);
      },
      (err) => {
        this.appService.handleShowLoadingPending(
          false,
          'eklaim failed ajukan page'
        );
        this.parent.scrollToTop(0);
        if (err.error) {
          this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(
            err.error.text
          );
          this.cdr.markForCheck();
          return;
        }
      }
    );
  }

  saveModifiedHtmlFile(filepath: string, content: string) {
    this.http.put(filepath, content, { responseType: 'text' }).subscribe(
      (response) => {},
      (error) => {
        console.error('Error saving file:', error);
      }
    );
  }
}
