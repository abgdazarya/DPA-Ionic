import { Component, Input, OnInit } from '@angular/core';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { Clipboard } from '@capacitor/clipboard';
import { Share } from '@capacitor/share';
import { ContentPromo } from '@controllers/menu';
import { ChangeContact, UbahEmailFormController } from '@controllers/profile';
import { DataResponse, InteractionState } from '@shared';
import { AuthInteractionRepository, AuthRepository } from '@stores/auth';
import { ProfileRepository } from '@stores/profile';
import { ScreenSizeService } from 'libs/services/common/screen-size.service';
export interface ContentsDataShareMedsos {
  title?: string | any;
  text?: string | any;
  banner?: any;
  link?: any;
  header?: any;
}
@Component({
  selector: 'share-media-list',
  templateUrl: './share-media-list.component.html',
  styleUrls: ['share-media-list.component.scss'],
  providers: [
    UbahEmailFormController,
    AuthRepository,
    AuthInteractionRepository,
    ProfileRepository,
    SocialSharing,
  ],
})
export class ShareMediaList implements OnInit {
  @Input() public contentData: ContentsDataShareMedsos = {};
  @Input() public isLabel: boolean | any = true;

  constructor(
    public screenSizeService: ScreenSizeService,
    private socialSharing: SocialSharing
  ) {}

  ngOnInit(): void {}

  copy = async () => {
    await Clipboard.write({
      string: this.contentData.link,
    });
    alert('Copied to Clipboard');
  };

  onShareGlobal = async () => {
    await Share.share({
      title: `[${this.contentData.header}] ${this.contentData.title}`,
      text: this.contentData.text,
      url: this.contentData.link,
      dialogTitle: 'Share with buddies',
    });
  };

  onShare = async (type: string) => {
    const comands: any = {
      clipboard: async () => {
        await this.copy();
      },
      email: async () => {
        window.open(
          `mailto:?subject=[${this.contentData.header}] ${
            this.contentData.title
          }&body=${encodeURIComponent(
            this.contentData.text || ''
          )} %0D%0A ${encodeURIComponent(
            this.contentData.link || window.location.href
          )}`
        );
      },

      facebook: async () => {
        const quotes = `[${this.contentData.header}] ${this.contentData.title}`;
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            this.contentData.link || window.location.href
          )}&quote=${encodeURIComponent(quotes)}`,
          '_blank'
        );
      },
      instagram: async () => {
        this.socialSharing.share(this.contentData.header, this.contentData.title, '', this.contentData.link || window.location.href).then(() => {
          
        }).catch(() => {
          window.open('https://www.instagram.com/')
        });

        // const quotes = `[${this.contentData.header}] ${this.contentData.title}`;
        // window.open(
        //   `https://www.instagram.com/sharer/sharer.php?u=${encodeURIComponent(
        //     this.contentData.link || window.location.href
        //   )}&quote=${encodeURIComponent(quotes)}`,
        //   '_blank'
        // );
      },
      twitter: async () => {
        const quotes = `[${this.contentData.header}] ${this.contentData.title}`;
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            this.contentData.link || window.location.href
          )}&text=${encodeURIComponent(this.contentData.title)}`,
          '_blank'
        );
      },
      whatsapp: async () => {
        const quotes = `[${this.contentData.header}] ${this.contentData.title}`;
        window.open(
          `https://api.whatsapp.com/send?text=${encodeURIComponent(
            quotes
          )} %0D%0A ${encodeURIComponent(
            this.contentData.link || window.location.href
          )}`,
          '_blank'
        );
      },
      telegram: async () => {
        const quotes = `[${this.contentData.header}] ${this.contentData.title}`;
        window.open(
          `https://t.me/share/url?text=${encodeURIComponent(
            quotes
          )}&url= ${encodeURIComponent(
            this.contentData.link || window.location.href
          )}`,
          '_blank'
        );
      },
    };

    if (comands[type]) {
      comands[type]();
    } else {
      this.onShareGlobal();
    }
  };

  getStyleIcon = () => {
    if (this.isLabel) {
      return {
        image: 'w-12 h-12',
        wrapper: 'w-16 h-16 mb-3',
      };
    }

    return {
      image: 'w-8 h-8',
      wrapper: 'w-12 h-12 mb-0',
    };
  };
}
