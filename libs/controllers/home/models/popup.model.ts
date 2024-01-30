import { Model } from '@shared';

export class Popup extends Model<Popup> {
  idDpaPopupPop: string | undefined | null;
  idDpaPopup: string | undefined | null;
  judulKonten: string | undefined | null;
  jenisPopup: string | undefined | null;
  timeDisplay: string | undefined | null;
  startDateDisplay: string | undefined | null;
  endDateDisplay: string | undefined | null;
  monDisp: number | undefined | null;
  tueDisp: number | undefined | null;
  wedDisp: number | undefined | null;
  thuDisp: number | undefined | null;
  friDisp: number | undefined | null;
  satDisp: number | undefined | null;
  sunDisp: number | undefined | null;
  isiTextPopup: string | undefined | null;
  link: string | undefined | null;
  picture: string | undefined | null;
}
