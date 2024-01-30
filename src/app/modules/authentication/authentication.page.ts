import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthInteractionRepository, AuthRepository } from '@stores/auth';
import { StorageService } from 'libs/services/common/storage.service';
import { Subscription } from 'rxjs';
import { AppComponentService } from 'src/app/app.component.service';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';

@Component({
  selector: 'app-authentication-page',
  templateUrl: 'authentication.page.html',
  styleUrls: ['authentication.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [AuthRepository, AuthInteractionRepository],
})
export class AppAuthenticationPage implements OnInit, OnDestroy {
  subs = new Subscription();

  constructor(
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private storageService: StorageService,
    private repo: AuthRepository,
    public templateService: AppMainTemplateService,
    private appComponentService: AppComponentService,
    private cdr: ChangeDetectorRef
  ) {}

  @HostListener('window:resize')
  public onResize() {
    this.handleChangeTemplateService();
  }

  handleChangeTemplateService() {
    this.templateService.handleShowHeader(false);
    this.templateService.handleShowFooter(false);
    this.templateService.handleShowFloatingButton(false);
    this.cdr.markForCheck();
  }

  handleTokenInteraction() {
    // setTimeout(() => {
    const { previous } = this.route.snapshot.queryParams;
    this.router.navigateByUrl(previous || '/home');
    // }, 100);
  }

  ngOnInit() {
    setTimeout(() => {
      this.handleChangeTemplateService();
    }, 0);
    this.handleTokenInteraction();
  }

  ngOnDestroy(): void {
    this.templateService.handleInit();
    this.cdr.markForCheck();
    this.subs.unsubscribe();
  }
}
