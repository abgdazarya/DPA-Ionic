import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { HeaderSecondComponent } from 'libs/components/common/header-second/header-second.component';
import { SimulasiMpData } from 'libs/controllers/simulasi-mp/models/simulasi-mp.model';
import { SimulasiData, SimulasiService } from '../../simulasi.service';
import localeId from '@angular/common/locales/id';
import { DecimalPipe, registerLocaleData } from '@angular/common';
import { AppMainTemplateService } from 'src/app/templates/main/main.template.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

registerLocaleData(localeId, 'id');

@Component({
  selector: 'app-detail-simulasi-mp',
  templateUrl: './detail-simulasi-mp.component.html',
  styleUrls: ['./detail-simulasi-mp.component.scss'],
  standalone: true,
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'id',
    },
  ],
  imports: [HeaderSecondComponent, IonicModule, DecimalPipe],
})
export class DetailSimulasiMpComponent implements OnInit {

  simulasiData: SimulasiData | null | undefined
  constructor(
    private router: Router,
    private location: Location,
    public templateService: AppMainTemplateService,
    private simulasiService: SimulasiService
  ) {
  }

  ngOnInit() {
    this.simulasiData = this.simulasiService.getData()
    this.templateService.handleOnBack(() => {
      this.router
        .navigate(['/simulasi-mp'], { onSameUrlNavigation: 'reload' })
        .then(() => {
          this.location.replaceState('/simulasi-mp');
        });
    });
  }
}
