import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'libs/services/common/storage.service';

@Component({
  selector: 'app-loading-template',
  templateUrl: 'loading.template.html',
  styleUrls: ['loading.template.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLoadingTemplate implements OnInit, OnDestroy {
  constructor(private router: Router, private storageService: StorageService) {}

  public handleNavigateUrl(url: string): void {
    this.router.navigateByUrl(url);
  }

  ngOnInit() {}

  ngOnDestroy(): void {}
}
