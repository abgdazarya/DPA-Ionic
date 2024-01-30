import { Injectable } from '@angular/core';
import { SimulasiMpData } from 'libs/controllers/simulasi-mp/models/simulasi-mp.model';

@Injectable({
  providedIn: 'root'
})

export class SimulasiData extends SimulasiMpData {
    gaji: number | null | undefined;
    kenaikan: number | null | undefined;
    pengembangan: string | null | undefined;

}

export class SimulasiService {
  private data: SimulasiData | undefined | null;

  setData(data: SimulasiData | undefined | null) {
    this.data = data;
  }

  getData() {
    return this.data;
  }
}