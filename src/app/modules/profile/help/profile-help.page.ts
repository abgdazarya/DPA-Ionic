import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Faq, FaqCategory } from '@controllers/profile';
import { Store } from '@ngrx/store';
import { DataResponseArray, InteractionState } from '@shared';
import {
  ProfileInteractionRepository,
  ProfileRepository,
} from '@stores/profile';
import { IOption } from 'libs/components/common/select/option.type';
import { FaqData } from 'libs/controllers/profile/models/faq';
import { ProfileState } from 'libs/stores/profile/states/profile.state';
import { Observable, filter, map, of, take, tap } from 'rxjs';
import { FaqOptions } from '../const/faq-category.const';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import { FaqCategoryData } from 'libs/controllers/profile/models/faq-category';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';
import { isPlatform } from '@ionic/angular';
import { Browser } from '@capacitor/browser';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { Capacitor } from '@capacitor/core';
import { GetHubDpa, HubDpaModel } from '@controllers/menu';
import { MenuInteractionRepository, MenuRepository } from '@stores/menu';

interface ContactItem {
  href?: string;
  target?: string;
  img?: string;
  label?: string;
}
const ENUM_ICON_CONTACT: Array<ContactItem> = [
  {
    href: 'mailto:cs@danapensiunastra.co.id',
    target: '_blank',
    img: 'logos/mail.png',
    label: 'Email',
  },
  {
    href: 'tel:02165309009',
    target: '_blank',
    img: 'logos/cell-phone.png',
    label: 'Telepon',
  },
  {
    href: 'whatsapp://send?text=Hello PDA!&phone=+6287881815252',
    target: '_blank',
    img: 'logos/whatsapp.png',
    label: 'whatsapp',
  },
  {
    href: 'https://goo.gl/maps/A8i8Koewije8PLJCA',
    target: '_blank',
    img: 'logos/pin-location.png',
    label: 'Lokasi',
  },
  {
    href: 'https://www.instagram.com/dapenastra_official/',
    target: '_blank',
    img: 'logos/instagram.png',
    label: 'Instagram',
  },
  {
    href: 'https://www.linkedin.com/company/dana-pensiun-astra-astra-international_2/',
    target: '_blank',
    img: 'logos/linkedin.png',
    label: 'LinkedIn',
  },
  {
    href: 'https://www.youtube.com/channel/UC31weauEew2xMjOtmjXlnqQ',
    target: '_blank',
    img: 'logos/youtube.png',
    label: 'Youtube',
  },
];
@Component({
  selector: 'app-profile-help',
  templateUrl: 'profile-help.page.html',
  styleUrls: ['profile-help.page.scss'],
  providers: [MenuRepository, MenuInteractionRepository],
})
export class ProfileHelpPage implements OnInit, OnDestroy {
  public isAccordion1: boolean = false;
  public isAccordion2: boolean = false;
  public isAccordion3: boolean = false;
  public iconContact: Array<ContactItem> = ENUM_ICON_CONTACT;
  public faqOptions: IOption[] = FaqOptions;
  faqForm!: FormGroup;
  public response$: Observable<FaqData[] | undefined | null>;
  public responseCategory$: Observable<
    DataResponseArray<FaqCategoryData> | undefined | null
  >;
  public interactionResponse$: Observable<InteractionState | undefined | null>;
  public listFaq: FaqData[] | null | undefined = [];
  private timeOutTracker: any = null;
  public activeValue!: string | number;

  public hubDpa$: Observable<HubDpaModel[] | undefined | null>;
  public hubDpaInteraction$: Observable<InteractionState | undefined | null>;

  constructor(
    private store: Store<ProfileState>,
    private profileRepository: ProfileRepository,
    private profileInteractionRepository: ProfileInteractionRepository,
    private menuRepo: MenuRepository,
    private menuInteractionRepo: MenuInteractionRepository,
    public screenSizeService: ScreenSizeService,
    public templateService: AppMainTemplateService,
    private cdr: ChangeDetectorRef,
    private storageService: StorageService
  ) {
    this.hubDpa$ = this.menuRepo.getHubDpaData$().pipe(map((res) => res?.data));
    this.hubDpaInteraction$ = this.menuInteractionRepo.getHubDpaInteraction$();

    this.initForm();
    this.response$ = this.profileRepository
      .getFaqData$()
      .pipe(map((data) => data));
    this.responseCategory$ = this.profileRepository.faqCategory$();
    this.interactionResponse$ =
      this.profileInteractionRepository.getFaqInteraction$();
  }

  public isWeb$: Observable<boolean> = of(Capacitor.getPlatform() === 'web');

  onInitTheme = () => {
    this.templateService.handleInit();

    this.templateService.handleChangeIonHeaderClass('');
    this.templateService.handleChangeSecondaryHeaderClass('text-800');
    this.templateService.handleChangeHeaderContainerClass(
      this.screenSizeService.isDesktopNativeResolution()
        ? 'bg-gradient-to-t from-lazuli-400 to-lazuli-200 w-full rounded-bl-4xl rounded-br-4xl md:rounded-none text-800'
        : 'bg-bg-0 h-[78px] text-800'
    );
    this.templateService.handleChangePageTitle('Pusat Bantuan DPA');
    this.templateService.handleUseSecondaryHeader(true);
  };

  ngOnInit(): void {
    this.store.dispatch(GetHubDpa({ payload: {} }));

    setTimeout(() => {
      this.onInitTheme();
      this.cdr.markForCheck();
    }, 0);
    this.fetchFaqCategory();

    this.responseCategory$
      .pipe(
        filter((res: any) => !!res),
        tap(async (listCategory: any) => {
          if (listCategory?.data) {
            this.faqOptions = await this.generatorCategoryInput(
              listCategory?.data || []
            );

            if (this.faqOptions?.length > 0) {
              setTimeout(() => {
                this.faqForm
                  .get('category')
                  ?.setValue(this.faqOptions[0].id || '');
                this.activeValue = this.faqOptions[0].id || '';
                this.faqForm.updateValueAndValidity();
                this.cdr.markForCheck();
              }, 0);
            }
          }
        })
      )
      .subscribe();
    this.handlePageChange();
  }

  ngOnDestroy(): void {}

  async handleNavigateItem(item: any) {
    await Browser.open({
      url: item.link,
      presentationStyle: 'popover',
    });
  }

  async fetchFaqCategory() {
    const data = await this.storageService.getStorage(
      StorageKeyEnum.NOMOR_PESERTA
    );

    this.store.dispatch(FaqCategory({ params: data }));
  }

  fetchFaq() {
    const payload: any = {
      idKategoriPusatBantuan: this.faqForm.get('category')?.value,
    };
    const keyword: any = this.faqForm.get('keyword')?.value;
    if (keyword) {
      payload['keyword'] = keyword;
    }
    this.store.dispatch(Faq({ payload }));
  }

  generatorCategoryInput = (arr: FaqCategoryData[]): IOption[] => {
    const temp: IOption[] = [];
    for (let i = 0; i < arr.length; i++) {
      temp.push({
        id: arr[i].idKategoriPusatBantuan || '',
        label: arr[i].namaKategori || '',
      });
    }
    return temp;
  };

  onSearchChange = (event: any) => {
    clearTimeout(this.timeOutTracker);
    this.timeOutTracker = setTimeout(() => {
      if (event?.target?.value) {
        this.faqForm.get('keyword')?.setValue(event.target.value);
      } else {
        this.faqForm.get('keyword')?.setValue('');
        this.fetchFaq();
      }
    }, 500);
  };

  initForm(): void {
    this.faqForm = new FormGroup({
      category: new FormControl('DPA', Validators.required),
      keyword: new FormControl(''),
    });
    this.faqForm.get('category')?.valueChanges.subscribe((val) => {
      this.listFaq = [];
      if (val) this.fetchFaq();
    });
    this.faqForm.get('keyword')?.valueChanges.subscribe((val) => {
      this.listFaq = [];
      if (val) this.fetchFaq();
    });
  }

  categoryChange(event: any) {
    if (event?.target?.value) {
      setTimeout(() => {
        this.activeValue = event.target.value;
        this.faqForm.get('category')?.setValue(event.target.value);
        this.faqForm.updateValueAndValidity();
        this.cdr.markForCheck();
      }, 0);
    }
  }
  categoryDropdownChange = async (value: any) => {
    this.activeValue = value;
    await this.faqForm.get('category')?.setValue(value);
    this.cdr.markForCheck();
  };

  public handlePageChange(): void {
    const el: any = document.querySelector('.page-container-main');
    if (el) {
      el.scrollToTop?.();
    }
  }
}
