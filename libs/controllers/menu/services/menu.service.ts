import { Injectable } from '@angular/core';
import { MenuHttpClient, MenuPublicHttpClient } from '@clients';
import {
  DataResponse,
  DataResponseArray,
  DataResponsePagination,
  convertToParams,
  encryptContent,
} from '@shared';

import { HttpHeaders } from '@angular/common/http';
import {
  assignToArrayResponse,
  assignToDataResponse,
  assignToPaginationResponse,
} from '@transformer';
import { Observable } from 'rxjs';
import { DetailJobDto } from '../dtos/detail-job.dto';
import { MenuDto } from '../dtos/menu.dto';
import { MonthlySaldoDto, SaldoDto } from '../dtos/saldo.dto';
import { AllKontenRuangPensiun } from '../models/all-konten-ruang-pensiun.model';
import { AstraHubData } from '../models/astra-hub';
import { AstramagzData } from '../models/astra-magz';
import { ContentPromo } from '../models/content-promo.model';
import { DpaTv } from '../models/dpa-tv.model';
import { FriendList } from '../models/friendlist.model';
import { HubDpaModel } from '../models/hub-dpa.model';
import { Job } from '../models/job.model';
import { JualBeliRuangPensiun } from '../models/jual-beli-ruang-pensiun.model';
import { KategoriRuangPensiun } from '../models/kategori-ruang-pensiun.model';
import { LaporanInvestasi } from '../models/laporan-investasi.model';
import { News } from '../models/news.model';
import { PostinganRuangPensiun } from '../models/postingan-ruang-pensiun.model';
import { SaldoAccessData } from '../models/saldo-access';
import { SaldoData } from '../models/saldo.model';

@Injectable()
export class MenuService {
  constructor(
    private client: MenuHttpClient,
    private clientPublic: MenuPublicHttpClient
  ) {}

  getAstraHub(): Observable<DataResponseArray<AstraHubData>> {
    return this.client
      .get('/get-data-astrahub')
      .pipe(assignToArrayResponse(AstraHubData));
  }

  getPublicListJob(payload: any): Observable<DataResponsePagination<Job>> {
    const params = convertToParams(payload);
    return this.clientPublic
      .get('/get-list-jobs', payload)
      .pipe(assignToPaginationResponse(Job));
  }

  getListJob(): Observable<DataResponsePagination<Job>> {
    return this.client
      .get('/get-list-jobs')
      .pipe(assignToPaginationResponse(Job));
  }

  getDetailJob(payload: DetailJobDto): Observable<DataResponse<Job>> {
    const params = convertToParams(payload);
    return this.client
      .get('/get-detail-jobs', { params })
      .pipe(assignToDataResponse(Job));
  }

  getContentPromo(
    payload: MenuDto
  ): Observable<DataResponsePagination<ContentPromo>> {
    const params = convertToParams(payload);
    return this.client
      .get('/get-content-promo', { params })
      .pipe(assignToPaginationResponse(ContentPromo));
  }

  getPublicContentPromo(
    payload: any
  ): Observable<DataResponsePagination<ContentPromo>> {
    const params = convertToParams(payload);
    return this.clientPublic
      .get('/get-content-promo', { params })
      .pipe(assignToPaginationResponse(ContentPromo));
  }

  getDetailContentPromo(payload: any): Observable<DataResponse<ContentPromo>> {
    const params = convertToParams(payload);
    return this.client
      .get('/get-detail-promo', { params })
      .pipe(assignToDataResponse(ContentPromo));
  }

  getNews(payload: MenuDto): Observable<DataResponsePagination<News>> {
    const params = convertToParams(payload);
    return this.client
      .get('/get-news', { params })
      .pipe(assignToPaginationResponse(News));
  }

  getPublicNews(payload: any): Observable<DataResponsePagination<News>> {
    const params = convertToParams(payload);
    return this.clientPublic
      .get('/get-news', { params })
      .pipe(assignToPaginationResponse(News));
  }

  getDetailNews(payload: any): Observable<DataResponse<News>> {
    const params = convertToParams(payload);
    return this.client
      .get('/get-detail-news', { params })
      .pipe(assignToDataResponse(News));
  }

  getPublicAstraMagazine(
    payload: any
  ): Observable<DataResponsePagination<AstramagzData>> {
    const params = convertToParams(payload);
    return this.clientPublic
      .get('/get-astra-magazine', { params })
      .pipe(assignToPaginationResponse(AstramagzData));
  }

  getAstraMagazine(
    payload: any
  ): Observable<DataResponsePagination<AstramagzData>> {
    const params = convertToParams(payload);
    return this.client
      .get('/get-astra-magazine', { params })
      .pipe(assignToPaginationResponse(AstramagzData));
  }

  getDetailAstraMagazine(
    payload: any
  ): Observable<DataResponse<AstramagzData>> {
    const params = convertToParams(payload);
    return this.client
      .get('/get-detail-astra-magazine', { params })
      .pipe(assignToDataResponse(AstramagzData));
  }

  getDpaTv(payload: MenuDto): Observable<DataResponsePagination<DpaTv>> {
    const params = convertToParams(payload);
    return this.client
      .get('/get-dpa-tv', { params })
      .pipe(assignToPaginationResponse(DpaTv));
  }

  getPublicDpaTv(payload: any): Observable<DataResponsePagination<DpaTv>> {
    const params = convertToParams(payload);
    return this.clientPublic
      .get('/get-dpa-tv', { params })
      .pipe(assignToPaginationResponse(DpaTv));
  }

  getDetailDpaTv(payload: any): Observable<DataResponse<DpaTv>> {
    const params = convertToParams(payload);
    return this.client
      .get('/get-detail-dpa-tv', { params })
      .pipe(assignToDataResponse(DpaTv));
  }

  getSaldo(payload: SaldoDto): Observable<DataResponse<SaldoData>> {
    const params = convertToParams(payload);
    return this.client
      .get('get-saldo', { params })
      .pipe(assignToDataResponse(SaldoData));
  }

  getMonthlySaldo(
    payload: MonthlySaldoDto
  ): Observable<DataResponse<SaldoData>> {
    const params = convertToParams(payload);
    return this.client
      .get('get-monthly-saldo', { params })
      .pipe(assignToDataResponse(SaldoData));
  }

  getLaporanInvestasi(
    payload: any
  ): Observable<DataResponseArray<LaporanInvestasi>> {
    const params = convertToParams(payload);
    return this.client
      .get('get-laporan-investasi', { params })
      .pipe(assignToArrayResponse(LaporanInvestasi));
  }

  getDetailLaporanInvestasi(
    payload: any
  ): Observable<DataResponse<LaporanInvestasi>> {
    const params = convertToParams(payload);
    return this.client
      .get('get-detail-laporan-investasi', { params })
      .pipe(assignToDataResponse(LaporanInvestasi));
  }

  getListKategoriRuangPensiun(
    payload: any
  ): Observable<DataResponsePagination<KategoriRuangPensiun>> {
    const params = convertToParams(payload);

    return this.client
      .get('ruang-pensiun/get-all-kategori', { params })
      .pipe(assignToPaginationResponse(KategoriRuangPensiun));
  }

  getListAllKontenRuangPensiun(
    payload: any
  ): Observable<DataResponsePagination<AllKontenRuangPensiun>> {
    let params: any = {};
    if (payload?.noPeserta) {
      params = {
        ...payload,
        umur: encryptContent(payload?.umur),
        gaji: encryptContent(payload?.gaji),
        masaKerja: encryptContent(payload?.masaKerja),
        namaPeserta: encryptContent(payload?.namaPeserta),
        idPerusahaan: payload?.namaPerusahaan,
      };

      if (params?.namaPerusahaan) {
        delete params?.namaPerusahaan;
      }
    } else {
      params = {
        ...payload,
      };
    }

    let encryptedParams = convertToParams(params);

    return this.client
      .get('ruang-pensiun/get-all-konten', { params: encryptedParams })
      .pipe(assignToPaginationResponse(AllKontenRuangPensiun));
  }

  getPublicListAllKontenRuangPensiun(
    payload: any
  ): Observable<DataResponsePagination<AllKontenRuangPensiun>> {
    let encryptedParams = convertToParams(payload);

    return this.clientPublic
      .get('ruang-pensiun/get-all-konten', { params: encryptedParams })
      .pipe(assignToPaginationResponse(AllKontenRuangPensiun));
  }

  getListPostinganRuangPensiun(
    payload: any
  ): Observable<DataResponsePagination<PostinganRuangPensiun>> {
    let params: any = {};
    if (payload?.noPeserta) {
      params = {
        ...payload,
        umur: encryptContent(payload?.umur),
        gaji: encryptContent(payload?.gaji),
        masaKerja: encryptContent(payload?.masaKerja),
        namaPeserta: encryptContent(payload?.namaPeserta),
        idPerusahaan: payload?.namaPerusahaan,
      };

      if (params?.namaPerusahaan) {
        delete params?.namaPerusahaan;
      }
    } else {
      params = {
        ...payload,
      };
    }

    let encryptedParams = convertToParams(params);

    return this.client
      .get('ruang-pensiun/get-all-list-postingan', { params: encryptedParams })
      .pipe(assignToPaginationResponse(PostinganRuangPensiun));
  }

  getDetailPostinganRuangPensiun(
    payload: any
  ): Observable<DataResponse<PostinganRuangPensiun>> {
    const params = convertToParams(payload);
    return this.client
      .get('ruang-pensiun/get-detail-postingan', { params })
      .pipe(assignToDataResponse(PostinganRuangPensiun));
  }

  getListJualBeliRuangPensiun(
    payload: any
  ): Observable<DataResponsePagination<JualBeliRuangPensiun>> {
    let params: any = {};
    if (payload?.noPeserta) {
      params = {
        ...payload,
        umur: encryptContent(payload?.umur),
        gaji: encryptContent(payload?.gaji),
        masaKerja: encryptContent(payload?.masaKerja),
        namaPeserta: encryptContent(payload?.namaPeserta),
        idPerusahaan: payload?.namaPerusahaan,
      };

      if (params?.namaPerusahaan) {
        delete params?.namaPerusahaan;
      }
    } else {
      params = {
        ...payload,
      };
    }

    let encryptedParams = convertToParams(params);

    return this.client
      .get('ruang-pensiun/get-all-list-jualbeli', { params: encryptedParams })
      .pipe(assignToPaginationResponse(JualBeliRuangPensiun));
  }

  getDetailJualBeliRuangPensiun(
    payload: any
  ): Observable<DataResponse<JualBeliRuangPensiun>> {
    const params = convertToParams(payload);
    return this.client
      .get('ruang-pensiun/get-detail-jualbeli', { params })
      .pipe(assignToDataResponse(JualBeliRuangPensiun));
  }

  getPublicListKategoriRuangPensiun(
    payload: any
  ): Observable<DataResponsePagination<KategoriRuangPensiun>> {
    const params = convertToParams(payload);

    return this.clientPublic
      .get('ruang-pensiun/get-all-kategori', { params })
      .pipe(assignToPaginationResponse(KategoriRuangPensiun));
  }

  getPublicListPostinganRuangPensiun(
    payload: any
  ): Observable<DataResponsePagination<PostinganRuangPensiun>> {
    const params = convertToParams(payload);
    return this.clientPublic
      .get('ruang-pensiun/get-all-list-postingan', { params })
      .pipe(assignToPaginationResponse(PostinganRuangPensiun));
  }

  getPublicDetailPostinganRuangPensiun(
    payload: any
  ): Observable<DataResponse<PostinganRuangPensiun>> {
    const params = convertToParams(payload);
    return this.clientPublic
      .get('ruang-pensiun/get-detail-postingan', { params })
      .pipe(assignToDataResponse(PostinganRuangPensiun));
  }

  getPublicListJualBeliRuangPensiun(
    payload: any
  ): Observable<DataResponsePagination<JualBeliRuangPensiun>> {
    const params = convertToParams(payload);
    return this.clientPublic
      .get('ruang-pensiun/get-all-list-jualbeli', { params })
      .pipe(assignToPaginationResponse(JualBeliRuangPensiun));
  }

  getPublicDetailJualBeliRuangPensiun(
    payload: any
  ): Observable<DataResponse<JualBeliRuangPensiun>> {
    const params = convertToParams(payload);
    return this.clientPublic
      .get('ruang-pensiun/get-detail-jualbeli', { params })
      .pipe(assignToDataResponse(JualBeliRuangPensiun));
  }

  getFriendList(payload: any): Observable<DataResponsePagination<FriendList>> {
    let params: any = {};
    if (payload?.noPeserta) {
      params = {
        ...payload,
        umur: encryptContent(payload?.umur),
        gaji: encryptContent(payload?.gaji),
        masaKerja: encryptContent(payload?.masaKerja),
        namaPeserta: encryptContent(payload?.namaPeserta),
        idPerusahaan: payload?.namaPerusahaan,
      };

      if (params?.namaPerusahaan) {
        delete params?.namaPerusahaan;
      }
    } else {
      params = {
        ...payload,
      };
    }

    let encryptedParams = convertToParams(params);

    return this.client
      .get('ruang-pensiun/get-list-temukan-teman', { params: encryptedParams })
      .pipe(assignToPaginationResponse(FriendList));
  }

  insertPostingan(
    payload: any
  ): Observable<DataResponse<PostinganRuangPensiun>> {
    let formData = new FormData();
    formData.append('idKategori', payload.kategori);
    // formData.append('idKategori', 'KRP000000001');
    formData.append('judulThread', payload.judulThread);
    formData.append('deskripsi', payload.deskripsi);
    formData.append('idProfilDpa', payload.idProfilDpa);

    for (let index = 0; index < payload.gambar?.length; index++) {
      if (payload.gambar[index]) {
        formData.append(`gambar[${index}]`, payload.gambar[index]);
      }
    }

    if (payload.idRuangPensiun) {
      formData.append('idRuangPensiun', payload.idRuangPensiun);
      return this.client
        .upload('ruang-pensiun/edit-postingan', formData)
        .pipe(assignToDataResponse(JualBeliRuangPensiun));
    } else {
      return this.client
        .upload('ruang-pensiun/insert-postingan', formData)
        .pipe(assignToDataResponse(JualBeliRuangPensiun));
    }
  }

  getBase64(payload: any): Observable<DataResponse<PostinganRuangPensiun>> {
    let formData = new FormData();
    formData.append('gambarUrl', payload.gambarUrl);

    return this.client
      .post('ruang-pensiun/get-image-base64', formData)
      .pipe(assignToDataResponse(JualBeliRuangPensiun));
  }

  deletePostingan(
    payload: any
  ): Observable<DataResponse<PostinganRuangPensiun>> {
    const requestOptions: any = {
      method: 'POST',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { idRuangPensiun: payload.idRuangPensiun }, // Data yang ingin dihapus
    };

    return this.client
      .delete('ruang-pensiun/delete-postingan', requestOptions)
      .pipe(assignToDataResponse(JualBeliRuangPensiun));
  }

  insertJualBeli(payload: any): Observable<DataResponse<JualBeliRuangPensiun>> {
    let formData = new FormData();
    formData.append('idKategori', payload.kategori);
    // formData.append('idKategori', 'KRP000000002');
    formData.append('judulThread', payload.judulThread);
    formData.append('hargaBarang', payload.hargaBarang);
    formData.append('alamat', payload.alamat);
    formData.append('deskripsi', payload.deskripsi);
    formData.append('alamatPinMaps', payload.alamatPinMaps);
    formData.append('pinMaps', payload.pinMaps);
    formData.append('linkPenjualan', payload.linkPenjualan);
    formData.append('idProfilDpa', payload.idProfilDpa);

    for (let index = 0; index < payload.gambarJualBeli?.length; index++) {
      if (payload.gambarJualBeli[index]) {
        formData.append(
          `gambarJualBeli[${index}]`,
          payload.gambarJualBeli[index]
        );
      }
    }

    if (payload.idRuangPensiun) {
      formData.append('idRuangPensiun', payload.idRuangPensiun);
      return this.client
        .upload('ruang-pensiun/edit-jual-beli', formData)
        .pipe(assignToDataResponse(JualBeliRuangPensiun));
    } else {
      return this.client
        .upload('ruang-pensiun/insert-jual-beli', formData)
        .pipe(assignToDataResponse(JualBeliRuangPensiun));
    }
  }

  deleteJualBeli(payload: any): Observable<DataResponse<JualBeliRuangPensiun>> {
    const requestOptions: any = {
      method: 'POST',
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: { idRuangPensiun: payload.idRuangPensiun }, // Data yang ingin dihapus
    };

    return this.client
      .delete('ruang-pensiun/delete-jual-beli', requestOptions)
      .pipe(assignToDataResponse(JualBeliRuangPensiun));
  }

  likeContent(payload: any): Observable<DataResponse<JualBeliRuangPensiun>> {
    // let formData = new FormData();
    // formData.append('idRuangPensiun', payload.idRuangPensiun);
    return this.client
      .post('ruang-pensiun/insert-like-konten', { idRuangPensiun: payload.idRuangPensiun })
      .pipe(assignToDataResponse(JualBeliRuangPensiun));
  }

  likeAllContent(
    payload: any
  ): Observable<DataResponse<AllKontenRuangPensiun>> {
    // let formData = new FormData();
    // formData.append('idRuangPensiun', payload.idRuangPensiun);

    return this.client
      .post('ruang-pensiun/insert-like-konten', { idRuangPensiun: payload.idRuangPensiun })
      .pipe(assignToDataResponse(AllKontenRuangPensiun));
  }

  getSaldoAccess(payload: any): Observable<DataResponse<SaldoAccessData>> {
    const params = convertToParams(payload);

    return this.client
      .get('get-saldo-access', { params })
      .pipe(assignToDataResponse(SaldoAccessData));
  }

  getHubDpa(payload: any): Observable<DataResponseArray<HubDpaModel>> {
    const params = convertToParams(payload);

    return this.client
      .get('get-hub-dpa', {
        params,
      })
      .pipe(assignToArrayResponse(HubDpaModel));
  }
}
