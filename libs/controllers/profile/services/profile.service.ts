import { Injectable } from '@angular/core';
import { ProfileHttpClient } from '@clients';
import {
  DataResponse,
  DataResponsePagination,
  convertToParams,
  encryptContent,
} from '@shared';
import {
  assignToArrayResponse,
  assignToDataResponse,
  assignToPaginationResponse,
} from '@transformer';
import { Observable } from 'rxjs';
import { ChangeContactDto } from '../dtos/change-contact.dto';
import { FaqDto } from '../dtos/faq.dto';
import { KartuPesertaDto } from '../dtos/kartu-peserta.dto';
import { KerabatDto } from '../dtos/kerabat.dto';
import { LinkDto } from '../dtos/link.dto';
import { OCRTokenDto } from '../dtos/ocr-token.dto';
import { OCRDto } from '../dtos/ocr.dto';
import { ProfileDto } from '../dtos/profile.dto';
import { RateDto, UserRateDto } from '../dtos/rate.dto';
import { ReadNotifDto } from '../dtos/read-notification.dto';
import { SetTokenFcmDto } from '../dtos/set-token-fcm.dto';
import { ToggleBiometricDto } from '../dtos/toggle-biometric.dto';
import { ToggleEmailDto } from '../dtos/toggle-email.dto';
import { ToggleNotifDto } from '../dtos/toggle-notification.dto';
import { UploadPhotoDto } from '../dtos/upload-photo.dto';
import { UserInfoDto } from '../dtos/user-info.dto';
import { ChangeContactData } from '../models/change-contact';
import { EditKerabatData } from '../models/edit-kerabat';
import { FaqData } from '../models/faq';
import { FaqCategoryData } from '../models/faq-category';
import { KartuPesertaData } from '../models/kartu-peserta';
import { LinkData } from '../models/link';
import { NotificationData } from '../models/notification';
import { OCRTokenData } from '../models/ocr-token.model';
import { OCRData } from '../models/ocr.model';
import { PrivacyData } from '../models/privacy';
import { BaseProfile, DetailProfile } from '../models/profile';
import { RateData, UserRateData } from '../models/rate';
import { ReadNotification } from '../models/read-notification';
import { SetTokenFcm } from '../models/set-token-fcm';
import { ToggleBiometricData } from '../models/toggle-biometric';
import { ToggleEmailData } from '../models/toggle-email';
import { ToggleNotificationData } from '../models/toggle-notification';
import { UploadPhotoData } from '../models/upload-photo';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  constructor(private readonly client: ProfileHttpClient) {}

  userInfo(payload: UserInfoDto | any): Observable<DataResponse<BaseProfile>> {
    const params = convertToParams(payload);

    return this.client
      .get('get-user-info', {
        params,
      })
      .pipe(assignToDataResponse(BaseProfile));
  }

  userDetail(payload: UserInfoDto): Observable<DataResponse<DetailProfile>> {
    const params = convertToParams(payload);

    return this.client
      .get('get-detail-profile', {
        params,
      })
      .pipe(assignToDataResponse(DetailProfile));
  }

  kartuPeserta(
    payload: KartuPesertaDto
  ): Observable<DataResponse<KartuPesertaData>> {
    const params = convertToParams(payload);

    return this.client
      .get('generate-kartu-dpa', {
        params,
      })
      .pipe(assignToDataResponse(KartuPesertaData));
  }

  notification(
    payload: UserInfoDto
  ): Observable<DataResponsePagination<NotificationData>> {
    const params = convertToParams(payload);

    return this.client
      .get('get-list-notification', {
        params,
      })
      .pipe(assignToPaginationResponse(NotificationData));
  }

  faq(payload: FaqDto): Observable<DataResponse<FaqData[]>> {
    const params = convertToParams(payload);

    return this.client
      .get('faq', {
        params,
      })
      .pipe(assignToArrayResponse(FaqData));
  }

  objToFormData = (obj: any): FormData => {
    const form = new FormData();
    for (const key in obj) {
      form.append(key, obj[key]);
    }
    return form;
  };

  editProfil(payload: ProfileDto): Observable<DataResponse<DetailProfile>> {
    let encryptPayload: any = {
      ...payload,
      namaPeserta: encryptContent(payload.namaPeserta),
      noHp: encryptContent(payload.noHp),
      email: encryptContent(payload.email),
      tanggalLahir: encryptContent(payload.tanggalLahir),
      jenisKelamin: encryptContent(payload.jenisKelamin),
      nik: encryptContent(payload.nik),
      statusPerkawinan: encryptContent(payload.statusPerkawinan),
      rt: encryptContent(payload.rt),
      rw: encryptContent(payload.rw),
      alamat: encryptContent(payload.alamat),
      namaKerabat: encryptContent(payload.namaKerabat),
      hubunganKerabat: encryptContent(payload.hubunganKerabat),
      noHpKerabat: encryptContent(payload.noHpKerabat),
      kelurahanDesa: encryptContent(payload.kelurahanDesa),
      kecamatan: encryptContent(payload.kecamatan),
      kotaKabupaten: encryptContent(payload.kotaKabupaten),
      provinsi: encryptContent(payload.provinsi),
      googleAccount: encryptContent(payload.googleAccount),
      appleId: encryptContent(payload.appleId),
      biometricToggle: encryptContent(payload.biometricToggle),
      notificationToggle: encryptContent(payload.notificationToggle),
      tempatLahir: encryptContent(payload.tempatLahir),
    };

    if (encryptPayload?.nik === null || !encryptPayload?.nik) {
      delete encryptPayload?.nik;
    }

    const newPayload: any = this.objToFormData(encryptPayload);

    return this.client
      .upload('save-edit-detail-profile', newPayload)
      .pipe(assignToDataResponse(DetailProfile));
  }

  setReadNotification(
    payload: ReadNotifDto
  ): Observable<DataResponse<ReadNotification>> {
    return this.client
      .post('set-read-notification', payload)
      .pipe(assignToDataResponse(ReadNotification));
  }

  setTokenFcm(payload: SetTokenFcmDto): Observable<DataResponse<SetTokenFcm>> {
    return this.client
      .post('store-device-token', payload)
      .pipe(assignToDataResponse(SetTokenFcm));
  }

  toggleNotification(
    payload: ToggleNotifDto
  ): Observable<DataResponse<ToggleNotificationData>> {
    return this.client
      .post('edit-toggle-notification', payload)
      .pipe(assignToDataResponse(ToggleNotificationData));
  }

  toggleEmail(
    payload: ToggleEmailDto
  ): Observable<DataResponse<ToggleEmailData>> {
    return this.client
      .post('edit-toggle-email-account', payload)
      .pipe(assignToDataResponse(ToggleEmailData));
  }

  setRateReview(payload: RateDto): Observable<DataResponse<RateData>> {
    return this.client
      .post('save-edit-rating', payload)
      .pipe(assignToDataResponse(RateData));
  }

  privacyPolicy(): Observable<DataResponse<PrivacyData[]>> {
    return this.client
      .get('get-privacy-policy')
      .pipe(assignToArrayResponse(PrivacyData));
  }

  getLink(payload: LinkDto): Observable<DataResponse<LinkData>> {
    const params = convertToParams(payload);

    return this.client
      .get('get-link-rating-app', {
        params,
      })
      .pipe(assignToDataResponse(LinkData));
  }

  changeContact(
    payload: ChangeContactDto
  ): Observable<DataResponse<ChangeContactData>> {
    const encryptPayload = {
      ...payload,
    };
    if (payload.noHp) {
      encryptPayload.noHp = encryptContent(payload.noHp);
    }
    if (payload.email) {
      encryptPayload.email = encryptContent(payload.email);
    }

    return this.client
      .post('profile-contact-update', encryptPayload)
      .pipe(assignToDataResponse(ChangeContactData));
  }

  uploadPhoto(
    payload: UploadPhotoDto
  ): Observable<DataResponse<UploadPhotoData>> {
    let formData = new FormData();
    formData.append('photo', payload.photo!);

    return this.client
      .upload('upload-photo', formData)
      .pipe(assignToDataResponse(UploadPhotoData));
  }

  editKerabat(payload: KerabatDto): Observable<DataResponse<EditKerabatData>> {
    const encryptPayload = {
      ...payload,
      namaKerabat: encryptContent(payload.namaKerabat),
      hubunganKerabat: encryptContent(payload.hubunganKerabat),
      noHpKerabat: encryptContent(payload.noHpKerabat),
    };
    return this.client
      .post('kerabat-contact-update', encryptPayload)
      .pipe(assignToDataResponse(EditKerabatData));
  }

  getRating(payload: UserRateDto): Observable<DataResponse<UserRateData>> {
    const params = convertToParams(payload);

    return this.client
      .get('get-user-rating', {
        params,
      })
      .pipe(assignToDataResponse(UserRateData));
  }

  generateOcrToken(
    payload: OCRTokenDto
  ): Observable<DataResponse<OCRTokenData>> {
    const params = convertToParams(payload);

    return this.client
      .get('ocr/get-token', {
        params,
      })
      .pipe(assignToDataResponse(OCRTokenData));
  }

  ocrKTPUpload(payload: OCRDto): Observable<DataResponse<OCRData>> {
    let formData = new FormData();
    for (const key in payload) {
      formData.append(key, payload[key]);
    }
    return this.client
      .post('ocr/process', formData)
      .pipe(assignToDataResponse(OCRData));
  }

  faqCategory(params?: any): Observable<DataResponse<FaqCategoryData[]>> {
    let paramsRes = {
      statusPeserta: params?.statusPeserta || 'UMUM',
    };

    return this.client
      .get('get-category-faq', { params: convertToParams(paramsRes) })
      .pipe(assignToArrayResponse(FaqCategoryData));
  }

  getHubunganKerabat() {
    return this.client.get('get-lov-hubungan-kerabat').pipe();
  }

  toggleBiometric(
    payload: ToggleBiometricDto
  ): Observable<DataResponse<ToggleBiometricData>> {
    return this.client
      .post('edit-toggle-biometric', payload)
      .pipe(assignToDataResponse(ToggleBiometricData));
  }
}
