import { DataResponseArray, Model } from '@shared';

export class AreaMappingData extends Model<AreaMappingData> {
  kodeAlamat: string | null | undefined;
  namaAlamat: string | null | undefined;
  [key: string]: string | null | undefined;
}

export class AreaMappingDataArray {
  provinsi?: DataResponseArray<AreaMappingData> | undefined | null;
  kabupaten?: DataResponseArray<AreaMappingData> | undefined | null;
  kecamatan?: DataResponseArray<AreaMappingData> | undefined | null;
  kelurahan?: DataResponseArray<AreaMappingData> | undefined | null;
  [key: string]: DataResponseArray<AreaMappingData> | undefined | null;
}
