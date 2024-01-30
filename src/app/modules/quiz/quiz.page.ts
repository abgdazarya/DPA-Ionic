import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';

import { Store } from '@ngrx/store';
import {
  DataResponse,
  DataResponseArray,
  InteractionState,
  InteractionType,
} from '@shared';
import {
  GetAllQuestion,
  GetQuizPeriod,
  GetRankingPoint,
  GetRankingPointHistory,
  InsertRanking,
  InsertRankingData,
  QuestionData,
  QuizPeriodData,
  QuizRanking,
} from 'libs/controllers/quiz';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
import {
  StorageKeyEnum,
  StorageService,
} from 'libs/services/common/storage.service';
import { QuizInteractionRepository, QuizRepository } from 'libs/stores/quiz';
import { Observable, Subscription, filter, from, interval, of } from 'rxjs';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';
import { LeaderboardComponent } from './components/leaderboard/leaderboard.component';
import { PilihQuizModalComponent } from './components/pilih-quiz-modal/pilih-quiz-modal.component';
import { QuizPointComponent } from './components/quiz-point/quiz-point.component';
import { QuizSelesaiComponent } from './components/quiz-selesai/quiz-selesai.component';
import { LeaveQuizModalComponent } from './components/leave-quiz-modal/leave-quiz-modal.component';
import { NavigationStart, Router } from '@angular/router';
import { Location, PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
  providers: [QuizRepository, QuizInteractionRepository],
})
export class QuizPage implements OnInit, OnDestroy {
  showQuiz: boolean = false;

  soal = {
    soal: 'Manakah yang bukan merupakan misi dari Dana Pensiun Astra?',
    images: '',
  };
  soalImg = {
    soal: 'Manakah yang bukan merupakan misi dari Dana Pensiun Astra?',
    images: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
  };
  pilihan: { jawaban: string; images: string }[] = [
    {
      jawaban: 'Mempersiapkan Peserta dalam menghadapi masa pensiun',
      images: '',
    },
    {
      jawaban:
        'Mengelola iuran dana pensiun sehingga mampu memberikan perlindungan keuangan kepada Pendiri, Mitra Pendiri dan Peserta',
      images: '',
    },
    {
      jawaban:
        'Berperan aktif dalam mengembangkan industri dana pensiun di Indonesia',
      images: '',
    },
    {
      jawaban: 'Memberikan penghargaan bagi seluruh karyawan Astra',
      images: '',
    },
  ];
  // pilihanImg: { jawaban: string; images: string }[] = [
  //   {
  //     jawaban: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
  //     images: 'images/soal-quiz.svg',
  //   },
  //   {
  //     jawaban: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
  //     images: 'images/soal-quiz.svg',
  //   },
  //   {
  //     jawaban: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
  //     images: 'images/soal-quiz.svg',
  //   },
  //   {
  //     jawaban: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
  //     images: 'images/soal-quiz.svg',
  //   },
  // ];
  soalQuiz: string = '';
  showPeriod: boolean = false;
  showResult: boolean = false;
  timer!: Subscription;
  counter: number = 0;
  hour: string = '';
  minutes: string = '';
  seconds: string = '';
  indexSoal = 0;
  totalSoal = 0;
  public response$: Observable<DataResponse<QuizRanking> | undefined | null>;
  public interactionResponse$: Observable<InteractionState | undefined | null>;
  public responsePeriod$: Observable<
    DataResponseArray<QuizPeriodData> | undefined | null
  >;
  public interactionResponsePeriod$: Observable<InteractionState>;

  public responseQuestion$: Observable<
    DataResponseArray<QuestionData> | undefined | null
  >;
  public interactionResponseQuestion$: Observable<
    InteractionState | undefined | null
  >;
  public responseRanking$: Observable<
    DataResponse<InsertRankingData> | undefined | null
  >;
  public interactionResponseRanking$: Observable<
    InteractionState | undefined | null
  >;
  public responseHistory$: Observable<
    DataResponse<QuizRanking> | undefined | null
  >;
  public interactionResponseHistory$: Observable<
    InteractionState | undefined | null
  >;
  idQuiz: any;
  dataQuiz: any = {};
  point = 0;
  quizPeriod: any;
  quizOptions: { label: string; idQuiz: string }[] = [];
  errorQuestion = '';
  errorPeriod = '';
  @ViewChild(LeaderboardComponent) leaderboardComponent!: LeaderboardComponent;
  showHistory = false;
  constructor(
    private modalCtrl: ModalController,
    private store: Store,
    private quizRepository: QuizRepository,
    private quizInteractionRepository: QuizInteractionRepository,
    public screenSizeService: ScreenSizeService,
    private storageService: StorageService,
    private router: Router,
    private location: Location,
    private cdr: ChangeDetectorRef,
    private Plocation: PlatformLocation,
    private templateService: AppMainTemplateService,
    private platform: Platform
  ) {
    this.response$ = this.quizRepository.getRankingPoint$();
    this.interactionResponse$ =
      this.quizInteractionRepository.getRankingPointInteraction$();
    this.responsePeriod$ = this.quizRepository.getQuizPeriod$();
    this.interactionResponsePeriod$ =
      this.quizInteractionRepository.getQuizPeriodInteraction$();
    this.responseQuestion$ = this.quizRepository.getAllQuestion$();
    this.interactionResponseQuestion$ =
      this.quizInteractionRepository.getAllQuestionInteraction$();
    this.responseRanking$ = this.quizRepository.insertRanking$();
    this.interactionResponseRanking$ =
      this.quizInteractionRepository.insertRankingInteraction$();
    this.responseHistory$ = this.quizRepository.getRankingPointHistory$();
    this.interactionResponseHistory$ =
      this.quizInteractionRepository.getRankingPointHistoryInteraction$();

    //handle prev next button
    // Plocation.onPopState(() => {
    //   var r = confirm('There are unsaved changes! Are you sure?');
    //   // var r = confirm("Jika anda meninggalkan Quiz maka anda dianggap sudah menyelesaikan quiz! Apakah kamu yakin?");

    //   if (r == true) {
    //     this.backToHome();
    //   } else {
    //     // history.pushState(null, '', window.location.pathname);
    //   }
    // });

    this.initHeaderService();
  }

  createListener = () => {
    history.pushState(null, window.document.title, window.location.href);
    window.addEventListener('popstate', this.eventListenerPopState);
  };

  deleteListener = () => {
    window.removeEventListener('popstate', this.eventListenerPopState);
  };

  eventListenerPopState = async (e: any) => {
    await history.pushState(null, window.document.title, window.location.href);
    await this.backToHome();
  };

  initHeaderService = () => {
    this.templateService.handleShowFooter(false);
    this.templateService.handleChangeIonHeaderClass('hidden md:hidden');
    this.templateService.handleShowFloatingButton(false);
    this.cdr.markForCheck();
  };

  private subscription: any = null;
  async ngOnInit() {
    this.initHeaderService();
    await this.fetchRanking();
    window.addEventListener('beforeunload', this.onBeforeUnload);
    // window.addEventListener('popstate', this.handlePopstate);

    // await this.platform.ready();
    // this.subscription = this.platform.backButton.subscribeWithPriority(
    //   9999,
    //   () => {
    //     // do nothing
    //     //this.leavePage();
    //     alert('kkkl');
    //   }
    // );
  }

  // @HostListener('window:popstate', ['$event'])
  // async handlePopstate(event: PopStateEvent) {
  //   try {
  //     const isAllowedNavigation = await this.isAllowedNavigation(true).toPromise();
  //     if (event && !isAllowedNavigation) {
  //       this.storage.set('quiz', {
  //         counter: this.counter,
  //         indexSoal: this.indexSoal,
  //         point: this.point,
  //       });
  //       event.preventDefault();
  //       event.returnValue = false;
  //     }
  //   } catch (error) {
  //     console.error('Error checking allowed navigation:', error);
  //   }
  // }

  @HostListener('window:beforeunload', ['$event'])
  public onBeforeUnload(event: BeforeUnloadEvent): void {
    this.isAllowedNavigation(true).subscribe((isAllowedNavigation) => {
      if (event && !isAllowedNavigation) {
        this.storageService.setStorage(StorageKeyEnum.QUIZ, {
          counter: this.counter,
          indexSoal: this.indexSoal,
          point: this.point,
        });
        event.preventDefault();
        event.returnValue = false;
      }
    });
  }

  canDeactivate(): Observable<boolean> {
    return this.isAllowedNavigation();
  }

  private isAllowedNavigation(beforeunloadEvent = false): Observable<boolean> {
    if (beforeunloadEvent) {
      const result = window.confirm('There are unsaved changes! Are you sure?');
      // const result = window.confirm('Jika anda meninggalkan Quiz maka anda dianggap sudah menyelesaikan quiz! Apakah kamu yakin?');
      return of(result);
    }
    return of(true);
  }

  async leavePage(): Promise<boolean> {
    const modal = await this.modalCtrl.create({
      component: LeaveQuizModalComponent,
      backdropDismiss: true,
      cssClass: 'custom-popup',
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) {
      this.deleteListener();
    }
    return !!data;
  }

  async backToHome() {
    if (this.quizPeriod && this.idQuiz && this.showQuiz) {
      const modal = await this.modalCtrl.create({
        component: LeaveQuizModalComponent,
        backdropDismiss: true,
        cssClass: 'custom-popup',
      });
      await modal.present();
      const { data } = await modal.onDidDismiss();
      if (data == true) {
        this.stopTimer();
        this.finishQuiz();
        this.router
          .navigate(['/home'], { onSameUrlNavigation: 'reload' })
          .then(() => {
            this.location.replaceState('/home');
          });
      }
    } else {
      this.stopTimer();
      this.router
        .navigate(['/home'], { onSameUrlNavigation: 'reload' })
        .then(() => {
          this.location.replaceState('/home');
        });
    }
  }

  stopGame() {
    this.showResult = false;
    this.showPeriod = true;
    this.showQuiz = false;
    this.showHistory = false;
    this.cdr.markForCheck();
  }

  // @HostListener('window:beforeunload', ['$event']) unloadHandler(event: Event) {
  //   this.storage.set('quiz', {
  //     counter: this.counter,
  //     indexSoal: this.indexSoal,
  //     point: this.point,
  //   });
  // }

  async fetchRanking() {
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    const payload = {};
    if (!idProfilDpa) return;
    await this.store.dispatch(GetRankingPoint({ payload }));
    await this.response$.subscribe((res: any) => {
      if (res) {
        if (res.data) {
          this.quizPeriod = res.data.idPeriodeQuiz;
          this.fetchQuizPeriod();
        }
      }
    });
  }

  async fetchQuizPeriod() {
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    const payload = {
      idPeriodeQuiz: this.quizPeriod,
    };
    if (!idProfilDpa) return;

    this.store.dispatch(GetQuizPeriod({ payload }));
    this.responsePeriod$.subscribe(
      (data) => {
        this.quizOptions =
          data?.data?.map((data) => ({
            label: data.namaQuiz || '',
            idQuiz: data.idQuiz || '',
            userPlayed: data.userPlayed || '',
          })) || [];

        if (data?.data?.length === 1) {
          this.idQuiz = data.data[0].idQuiz || '';
          this.dataQuiz = data.data[0] || {};
          this.fetchAllQuestion(this.idQuiz);
        }
      },
      (err) => {}
    );
  }

  async fetchAllQuestion(idQuiz: string) {
    this.errorQuestion = '';
    const payload = {
      idQuiz,
    };
    this.store.dispatch(GetAllQuestion({ payload }));
    this.responseQuestion$.subscribe((data) => {
      this.totalSoal = data?.data?.length || 0;
    });
    this.interactionResponseQuestion$.subscribe((res) => {
      if (res?.type === InteractionType.FAILED) {
        this.errorQuestion = 'Ada kendala system, quiz tidak bisa dimulai!';
        this.cdr.markForCheck();
        setTimeout(() => {
          this.errorQuestion = '';
          this.cdr.markForCheck();
        }, 3000);
      }
    });
  }

  ngOnDestroy(): void {
    this.stopTimer();
    this.deleteListener();
  }

  async mulai() {
    let periodError = false;
    this.errorPeriod = '';
    await this.interactionResponsePeriod$.subscribe((res) => {
      if (res.type === InteractionType.FAILED) {
        this.errorPeriod = res.error || '';
        periodError = true;
      } else {
        periodError = false;
      }
    });

    if (!periodError) {
      if (this.idQuiz && this.totalSoal > 0) {
        if (this.dataQuiz.userPlayed != 'Y') {
          this.showQuiz = true;
          this.startTimer();
        } else {
          this.errorQuestion =
            'Pengguna sudah pernah bermain, quiz tidak bisa dimulai!';
          this.cdr.markForCheck();
          setTimeout(() => {
            this.errorQuestion = '';
            this.cdr.markForCheck();
          }, 3000);
        }
      }

      if (!this.idQuiz) {
        const modal = await this.modalCtrl.create({
          component: PilihQuizModalComponent,
          backdropDismiss: true,
          cssClass: 'custom-popup',
          componentProps: {
            quiz: this.quizOptions,
          },
        });
        modal.present();
        modal.onDidDismiss().then(async ({ data }) => {
          if (data) {
            this.idQuiz = data;
            await this.fetchAllQuestion(data);
            this.responseQuestion$.subscribe((data) => {
              if (data) {
                if (this.totalSoal > 0) {
                  this.showQuiz = true;
                  this.startTimer();
                  this.createListener();
                }
              }
            });
          }
        });
      }
    }
  }

  async onHandleAnswer(flagBenar: boolean) {
    this.point = !!flagBenar ? (this.point += 10) : this.point;
    if (this.indexSoal !== this.totalSoal - 1) this.indexSoal++;
    else {
      this.stopTimer();
      this.finishQuiz();
      this.showResult = true;
      this.showPeriod = false;
      this.showQuiz = false;
      this.showHistory = false;
      const modal = await this.modalCtrl.create({
        component: QuizSelesaiComponent,
        backdropDismiss: true,
        cssClass: 'custom-popup',
      });
      modal.present();
      modal.onDidDismiss().then((data) => {
        if (!!data) {
          this.openPoint();
        }
      });
    }
    this.cdr.markForCheck();
  }

  async finishQuiz() {
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );
    const payload = {
      idPeriodeQuiz: this.quizPeriod,
      idQuiz: this.idQuiz,
      jumlahBenar: String(this.point / 10),
      jumlahSalah: String(this.totalSoal - this.point / 10),
      skor: String(this.point),
      waktuPengerjaan: `${this.hour}:${this.minutes}:${this.seconds}`,
    };
    if (!idProfilDpa) return;
    this.store.dispatch(InsertRanking({ payload }));
    this.responseRanking$.subscribe((res) => {
      this.fetchRankingHistory();
    });
  }

  buildArray(array: any) {
    return new Promise((resolve) => {
      let m = array.length,
        t,
        i;

      // While there remain elements to shuffle…
      while (m) {
        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }

      this.pilihan = array;
      resolve(true);
    });
  }

  async fetchRankingHistory() {
    const idProfilDpa = await this.storageService.getStorage(
      StorageKeyEnum.ID_PROFILE_DPA
    );

    const payload = {
      idPeriodeQuiz: this.quizPeriod,
    };
    if (!idProfilDpa) return;
    this.store.dispatch(GetRankingPointHistory({ payload }));
  }

  async openPoint() {
    const modal = await this.modalCtrl.create({
      component: QuizPointComponent,
      backdropDismiss: true,
      cssClass: 'custom-popup height-auto',
      componentProps: {
        waktu: `${this.minutes}:${this.seconds}`,
        point: this.point,
      },
    });
    modal.present();
    modal.onDidDismiss().then((data) => {
      this.showResult = false;
      this.showPeriod = true;
      this.showQuiz = false;
      this.showHistory = true;
      this.cdr.markForCheck();
    });
  }

  startTimer() {
    this.timer = interval(1000).subscribe(() => {
      this.counter++;
      this.seconds = `${
        this.counter % 60 < 10 ? '0' + (this.counter % 60) : this.counter % 60
      }`;
      this.minutes = `${
        Math.floor(this.counter / 60) < 10
          ? '0' + Math.floor(this.counter / 60)
          : Math.floor(this.counter / 60)
      }`;
      this.hour = `${
        Math.floor(this.counter / 3600) < 10
          ? '0' + Math.floor(this.counter / 3600)
          : Math.floor(this.counter / 3600)
      }`;
      this.cdr.markForCheck();
    });
  }
  stopTimer() {
    if (this.timer) {
      this.timer.unsubscribe();
    }
  }
  changePeriod(period: any) {
    this.quizPeriod = period;
    this.fetchRankingHistory();
  }
}
