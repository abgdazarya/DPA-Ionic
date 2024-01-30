export class DataOcr {
  confidence: number | string | undefined;
  value: string | null | undefined;
}

export class OCRData {
  agama: DataOcr | null | undefined;
  alamat: DataOcr | null | undefined;
  berlakuhingga: DataOcr | null | undefined;
  golongandarah: DataOcr | null | undefined;
  jeniskelamin: DataOcr | null | undefined;
  kecamatan: DataOcr | null | undefined;
  kelurahandesa: DataOcr | null | undefined;
  kewarganegaraan: DataOcr | null | undefined;
  kotakabupaten: DataOcr | null | undefined;
  nama: DataOcr | null | undefined;
  nik: DataOcr | null | undefined;
  pekerjaan: DataOcr | null | undefined;
  provinsi: DataOcr | null | undefined;
  rtrw: DataOcr | null | undefined;
  statusperkawinan: DataOcr | null | undefined;
  tanggallahir: DataOcr | null | undefined;
  tempatlahir: DataOcr | null | undefined;
}
