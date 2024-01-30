import { Model } from '@shared';

export class JualBeliRuangPensiun extends Model<JualBeliRuangPensiun> {
  public idRuangPensiun: string | undefined | null;
  public judulThread: string | undefined | null;
  public hargaBarang: string | undefined | null;
  public alamat: string | undefined | null;
  public deskripsi: string | undefined | null;
  public pinMaps: string | any;
  public alamatPinMaps: string | any;
  public gambarJualBeli: any;
  public gambar: string | undefined | null;
  public jumlahLike: number | undefined | null;
  public isLike: number | undefined | null;
  public isMe: boolean | undefined | null;
  public linkPenjualan: string | undefined | null;
  public alasanReject: string | undefined | null;
  public statusApproval: string | undefined | null;
  public namaUser: string | undefined | null;
  public photoUser: string | undefined | null;
  public namaPerusahaan: string | undefined | null;
  public createdOn: string | undefined | null;
}
