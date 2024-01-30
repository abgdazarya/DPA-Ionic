import {
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-common-alert-component',
  templateUrl: './alert.component.html',
})
export class AlertComponent implements OnChanges {
  @Input('type') public set setType(
    type: 'success' | 'info' | 'warning' | 'danger'
  ) {
    this.type = type;
    switch (type) {
      case 'info':
        this.title = 'Info message.';
        this.backgroundClass = 'border-lazuli-400 bg-lazuli-50';
        this.titleClass = 'text-lazuli-500';
        this.iconClass = 'text-lazuli-400';
        break;

      case 'warning':
        this.title = 'Warning message.';
        this.backgroundClass = 'border-warning-400 bg-warning-50';
        this.titleClass = 'text-warning-600';
        this.iconClass = 'text-warning-400';
        break;

      case 'danger':
        this.title = 'Error message.';
        this.backgroundClass = 'border-error-400 bg-error-50';
        this.titleClass = 'text-error-500';
        this.iconClass = 'text-error-400';
        break;

      default:
        this.title = 'Success message.';
        this.backgroundClass = 'border-success-400 bg-success-50';
        this.titleClass = 'text-success-600';
        this.iconClass = 'text-success-400';
        break;
    }
  }

  @Input() public duration: number = 2000;
  // @Input() public title: string | undefined | null;
  @Input() public desc: string | undefined | null = null;

  @Input() public isOpen: boolean | undefined | null = false;

  @Input() public isMobile: boolean | undefined | null;

  @Input() public title: string | undefined | null;

  @Input() public transformHeight: number = 10;
  @Input() public transformShowClass: string = 'translate-y-10';
  @Input() public transformHideClass: string = '-translate-y-10';

  public backgroundClass: string = '';
  public titleClass: string = '';
  public iconClass: string = '';
  public type: string = '';

  public isShow: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.isOpen) {
      this.isShow = true;
      this.cdr.markForCheck();
      setTimeout(() => {
        this.isShow = false;
        this.cdr.markForCheck();
      }, this.duration - 1000);
      return;
    }

    if (!this.desc) return;

    this.isShow = true;
    this.cdr.markForCheck();
    setTimeout(() => {
      this.isShow = false;
      this.cdr.markForCheck();
    }, this.duration - 1000);
  }

  getCalss = () => {
    if (this.isShow) {
      return `${this.transformShowClass} !flex opacity-1`;
    }
    return `${this.transformShowClass} opacity-0`;
  };
}
