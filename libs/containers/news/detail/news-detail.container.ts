import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsModel } from '@controllers/menu-news';
import { Store } from '@ngrx/store';
import {
  MenuNewsInteractionRepository,
  MenuNewsRepository,
  MenuNewsState,
} from '@stores/menu-news';
import { ProfileRepository } from '@stores/profile';
import { StorageService } from 'libs/services/common/storage.service';
import { Observable, filter, map } from 'rxjs';
import { Clipboard } from '@capacitor/clipboard';
import { Browser } from '@capacitor/browser';
import { Share } from '@capacitor/share';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-news-detail-container',
  templateUrl: './news-detail.container.html',
  styleUrls: ['./news-detail.container.scss'],
  providers: [
    ProfileRepository,
    MenuNewsRepository,
    MenuNewsInteractionRepository,
    SocialSharing,
  ],
})
export class NewsDetailContainer implements OnInit, OnDestroy {
  public news$: Observable<NewsModel | undefined | null>;
  public loading$: Observable<boolean | undefined | null>;

  public imageStatus: 'onload' | 'error' | 'succeed' | null = null;

  public shareButtons: any[] = [
    {
      type: 'telegram',
      imageSrc: 'logos/news-telegram.png',
    },
    {
      type: 'twitter',
      imageSrc: 'logos/news-twitter.png',
    },
    {
      type: 'facebook',
      imageSrc: 'logos/news-facebook.png',
    },
    {
      type: 'whatsapp',
      imageSrc: 'logos/news-whatsapp.png',
    },
    {
      type: 'share-link',
      imageSrc: 'logos/news-share-link.png',
    },
  ];

  constructor(
    public store: Store<MenuNewsState>,
    public storageService: StorageService,
    public profileRepo: ProfileRepository,
    public menuRepo: MenuNewsRepository,
    public menuInteractionRepo: MenuNewsInteractionRepository,
    private router: Router,
    private socialSharing: SocialSharing,
    private route: ActivatedRoute
  ) {
    this.news$ = this.menuRepo.getNewsDetail$().pipe(
      filter((res) => !!res),
      map((res) => {
        if (!res?.data) return null;
        return res?.data;
      })
    );

    this.loading$ = this.menuInteractionRepo.getNewsDetailInteraction$().pipe(
      map((res) => {
        return res.isLoading;
      })
    );
  }

  public async handleOpenShare(sharedButton: any, news: any) {
    if (sharedButton?.type === 'share-link') {
      await Clipboard.write({
        string: environment.urlWeb + '/news/' + news.idBeritaDpa,
      });
      alert('Berhasil menyalin link');
    } else {
      let url = environment.urlWeb + '/news/' + news.idBeritaDpa;
      const comands: any = {
        email: () => {
          window.location.href =
            'mailto:?subject=[' +
            news.kategori +
            '] ' +
            news.judulBerita +
            '&body=' +
            encodeURIComponent(news.headlineBerita || '') +
            '%0D%0A' +
            encodeURIComponent(url);
        },

        facebook: () => {
          const facebookShareUrl =
            'https://www.facebook.com/sharer/sharer.php?u=' +
            encodeURIComponent(url) +
            '&quote=' +
            encodeURIComponent('[' + news.kategori + '] ' + news.judulBerita);
          window.open(facebookShareUrl, '_blank');
        },

        instagram: () => {
          this.socialSharing.share(news.kategori, news.judulBerita, '', url).then(() => {

          }).catch(() => {
            window.open('https://www.instagram.com/')
          });
        },

        twitter: () => {
          const twitterShareUrl =
            'https://twitter.com/intent/tweet?url=' + encodeURIComponent(url) +
            '&text=' + encodeURIComponent('[' + news.kategori + '] ' + news.judulBerita);
          window.open(twitterShareUrl, '_blank');
        },

        telegram: () => {
          window.open(
            'https://t.me/share/url?url=' +
              encodeURIComponent(url) +
              '&text=' +
              encodeURIComponent('[' + news.kategori + '] ' + news.judulBerita)
          );
        },

        whatsapp: () => {
          const waShareUrl =
            'https://api.whatsapp.com/send?text=' +
            encodeURIComponent(news.headlineBerita || '') +
            '%0D%0A' +
            encodeURIComponent(url);
          window.open(waShareUrl, '_blank');
        },
      };

      if (comands[sharedButton?.type]) {
        comands[sharedButton?.type]();
      } else {
        this.shareOther(news);
      }
    }
  }

  async shareOther(news: any) {
    await Share.share({
      title: news.judulBerita,
      text: news.headlineBerita,
      url: environment.urlWeb + '/news/' + news.idBeritaDpa,
      dialogTitle: 'Bagikan',
    });
  }

  public handleNavigateToNews(): void {
    this.router.navigate(['news']).then();
  }

  public handleNavigateToNewsDetail(news: NewsModel): void {
    this.router.navigate([`/news/${news.idBeritaDpa}`]).then();
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
