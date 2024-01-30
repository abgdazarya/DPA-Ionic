import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobModel } from '@controllers/menu-job';
import { Store } from '@ngrx/store';
import {
  MenuJobInteractionRepository,
  MenuJobRepository,
  MenuJobState,
} from '@stores/menu-job';
import { ProfileRepository } from '@stores/profile';
import { StorageService } from 'libs/services/common/storage.service';
import { Observable, filter, map } from 'rxjs';
import { Clipboard } from '@capacitor/clipboard';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-job-detail-container',
  templateUrl: './job-detail.container.html',
  styleUrls: ['./job-detail.container.scss'],
  providers: [
    ProfileRepository,
    MenuJobRepository,
    MenuJobInteractionRepository,
  ],
})
export class JobDetailContainer implements OnInit, OnDestroy {
  public job$: Observable<JobModel | undefined | null>;
  public loading$: Observable<boolean | undefined | null>;

  constructor(
    public store: Store<MenuJobState>,
    public storageService: StorageService,
    public profileRepo: ProfileRepository,
    public menuRepo: MenuJobRepository,
    public menuInteractionRepo: MenuJobInteractionRepository
  ) {
    this.job$ = this.menuRepo.getJobDetail$().pipe(
      filter((res) => !!res),
      map((res) => {
        if (!res?.data) return null;

        return res?.data;
      })
    );

    this.loading$ = this.menuInteractionRepo.getJobDetailInteraction$().pipe(
      map((res) => {
        return res.isLoading;
      })
    );
  }

  public async handleNavigateToGmail() {
    await Browser.open({
      url: 'https://mail.google.com/mail/?view=cm&fs=1&to=career@acc.co.id',
      presentationStyle: 'popover',
    });
  }

  public async handleNavigateToInstagram(str: string | any) {
    await Browser.open({
      url: str || 'https://www.instagram.com/lensacc/',
      presentationStyle: 'popover',
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
