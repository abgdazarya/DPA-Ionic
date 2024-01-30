import { Model } from '@shared';

export class LaporanInvestasi extends Model<LaporanInvestasi> {
  public idLaporanInvestasi: string | undefined | null;
  public judulLaporan: string | undefined | null;
  public jenisLaporanInvestasi: string | undefined | null;
  public text: string | undefined | null;
  public image: string | undefined | null;
  public pdf: string | undefined | null;
}
