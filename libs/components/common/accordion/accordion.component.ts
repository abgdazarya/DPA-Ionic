import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ContentChild,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { IonAccordionGroup, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class AccordionComponent implements AfterViewInit {
  // @Input() expand: 'inset' | undefined = undefined;
  @Input() accordions: string[] = [];
  @Input() accordionClass: string = '';
  @Input() icon: any = undefined;

  @ContentChild(TemplateRef)
  public templateRef!: TemplateRef<any>;
  @ViewChild('accordionGroup', { static: true })
  accordionGroup!: IonAccordionGroup;
  @Input() expandedIndex: string = '';
  constructor() {}
  ngAfterViewInit(): void {
    this.toggleAccordion();
  }

  toggleAccordion = () => {
    const nativeEl = this.accordionGroup;
    nativeEl.value = this.expandedIndex ? this.expandedIndex : '';
  };
}
