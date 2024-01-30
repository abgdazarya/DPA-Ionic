import { Pipe, PipeTransform } from '@angular/core';

export enum StatusPesertaEnum {
  ALL = 'ALL',
  UMUM = 'UMUM',
  AKTIF = 'AKTIF',
  PASIF = 'PASIF',
  PENSIUNAN = 'PENSIUNAN',
}

export namespace StatusPesertaEnum {
  export function getValues(): any[] {
    return [
      {
        id: StatusPesertaEnum.ALL,
        text: 'Peserta Umum',
        bgColor: 'bg-lazuli-50',
        textColor: 'text-lazuli-500',
      },
      {
        id: StatusPesertaEnum.UMUM,
        text: 'Peserta Umum',
        bgColor: 'bg-lazuli-50',
        textColor: 'text-lazuli-500',
      },
      {
        id: StatusPesertaEnum.AKTIF,
        text: 'Peserta Aktif',
        bgColor: 'bg-success-200',
        textColor: 'text-success-500',
      },
      {
        id: StatusPesertaEnum.PASIF,
        text: 'Peserta Pasif',
        bgColor: 'bg-warning-50',
        textColor: 'text-warning-500',
      },
      {
        id: StatusPesertaEnum.PENSIUNAN,
        text: 'Peserta Pensiunan',
        bgColor: 'bg-neutral-200',
        textColor: 'text-neutral-800',
      },
    ];
  }

  export function find(id: StatusPesertaEnum): any | undefined {
    StatusPesertaEnum.getValues().find((item) => {
      return item.id === id;
    });

    return StatusPesertaEnum.getValues().find((item) => item.id === id);
  }
}

@Pipe({
  name: 'statusPesertaEnum',
})
export class StatusPesertaEnumPipe implements PipeTransform {
  public transform(id: any, key: string): any {
    const val: any = StatusPesertaEnum.find(id);
    return val[key] || null;
  }
}
