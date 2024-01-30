import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IconsModule } from '@assets/icons';

@Component({
  selector: 'app-common-icon-component',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
})
export class CommonIconComponent {
  public icons: any = IconsModule;

  @Input('name') public set setName(val: any) {
    const name = val.replaceAll('-', '_');
    const selectedIcon = this.icons[name];
    this.icon = this.domSanitizer.bypassSecurityTrustHtml(selectedIcon);
  }
  @Input() public nativeClass: string = 'w-6 h-6 text-neutral-700';
  @Input() public color: string = 'text-warning-400';

  public icon!: any;

  public constructor(private domSanitizer: DomSanitizer) {}
}
