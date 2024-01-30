import { Injectable } from '@angular/core';
import { AuthHttpClient, RefreshTokenHttpClient } from '@clients';
import { DataResponse, DataResponseArray, encryptContent } from '@shared';
import { assignToArrayResponse, assignToDataResponse } from '@transformer';
import { Observable, of } from 'rxjs';
import { CreatePinDto } from '../dtos/create-pin.dto';
import { GetNoPesertaDto } from '../dtos/get-no-peserta.dto';
import { GetTokenByIdProfilDto } from '../dtos/get-token-by-id-profil';
import { GetTokenDto } from '../dtos/get-token.dto';
import { LogUserActivityDto } from '../dtos/log-user-activity.dto';
import { LoginDto } from '../dtos/login.dto';
import { LupaPinDto } from '../dtos/lupa-pin.dto';
import { RequestOtpDto } from '../dtos/request-otp.dto';
import { SaveUserSessionDto } from '../dtos/save-user-session.dto';
import { VerifyOtpDto } from '../dtos/verify-otp.dto';
import { VerifyPinDto } from '../dtos/verify-pin.dto';
import { VerifyReferralCodeDto } from '../dtos/verify-referral-code.dto';
import { CreatePinData } from '../models/create-pin-data';
import { DeleteProfilModel } from '../models/delete-profil';
import { LogUserActivityData } from '../models/log-user-activity-data';
import { LoginData } from '../models/login-data';
import { LupaPinData } from '../models/lupa-pin-data';
import { NeedVerificationData } from '../models/need-verification-data';
import { NoPesertaData } from '../models/no-peserta-data';
import { RefreshTokenData } from '../models/refresh-token-data';
import { RequestOtpData } from '../models/request-otp-data';
import { Sample } from '../models/sample-data';
import { SaveUserSessionData } from '../models/save-user-session-data';
import { VerifyOtpData } from '../models/verify-otp-data';
import { VerifyPinData } from '../models/verify-pin-data';
import { VerifyReferralCodeData } from '../models/verify-referral-code-data';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private client: AuthHttpClient,
    private readonly refreshTokenClient: RefreshTokenHttpClient
  ) {}

  login(payload: LoginDto): Observable<DataResponse<LoginData>> {
    const encryptedPayload = {
      username: encryptContent(payload.username.toLowerCase()),
    };

    return this.client
      .post('/login', encryptedPayload)
      .pipe(assignToDataResponse(LoginData));
  }

  getToken(payload: GetTokenDto): Observable<DataResponse<LoginData>> {
    const encryptedPayload = {
      type: payload.type,
      token: encryptContent(payload.token),
    };

    return this.client
      .post('/get-token', encryptedPayload)
      .pipe(assignToDataResponse(LoginData));
  }

  refreshToken(hard?: boolean): Observable<DataResponse<RefreshTokenData>> {
    return this.refreshTokenClient
      .post('/refresh-token', {})
      .pipe(assignToDataResponse(RefreshTokenData, hard));
  }

  saveUserSession(
    payload: SaveUserSessionDto
  ): Observable<DataResponse<SaveUserSessionData>> {
    const encryptedPayload = {
      gaji: encryptContent(payload.gaji?.toLowerCase()),
      masaKerja: encryptContent(payload.masaKerja?.toLowerCase()),
      namaPeserta: encryptContent(payload.namaPeserta?.toLowerCase()),
      umur: encryptContent(payload.umur?.toLowerCase()),
      statusUser: payload.statusPeserta,
      idProfilDpa: payload.idProfilDpa,
      idAccountDpa: payload.idAccount,
      idPerusahaan: payload.namaPerusahaan,
      dpa: payload?.dpa,
      deviceToken: [
        {
          accessToken: payload.accessToken,
        },
      ],
    };

    return this.client
      .post('/save-user-session', encryptedPayload)
      .pipe(assignToDataResponse(SaveUserSessionData));
  }

  getTokenByIdProfil(
    payload: GetTokenByIdProfilDto
  ): Observable<DataResponse<LoginData>> {
    // const encryptedPayload = {
    //   idProfilDpa: encryptContent(payload.idProfilDpa.toLowerCase()),
    // };

    return this.client
      .post('/get-token-by-id-profil', payload)
      .pipe(assignToDataResponse(LoginData));
  }

  getNoPeserta(
    payload: GetNoPesertaDto
  ): Observable<DataResponseArray<NoPesertaData>> {
    const encryptedPayload = {
      ...payload,
      idProfilDpa: payload.idProfilDpa,
      username: encryptContent(payload.username.toLowerCase()),
    };

    return this.client
      .post('/get-no-peserta', encryptedPayload)
      .pipe(assignToArrayResponse(NoPesertaData));
  }

  createPin(payload: CreatePinDto): Observable<DataResponse<CreatePinData>> {
    const encryptedPayload = {
      ...payload,
      pin: encryptContent(payload.pin),
      verifyPin: encryptContent(payload.verifyPin),
    };
    return this.client
      .post('/create-pin', encryptedPayload)
      .pipe(assignToDataResponse(CreatePinData));
  }

  verifyPin(payload: VerifyPinDto): Observable<DataResponse<VerifyPinData>> {
    const encryptedPayload = {
      ...payload,
      pin: encryptContent(payload.pin),
      noPeserta: payload.noPeserta,
    };
    return this.client
      .post('/verify-pin', encryptedPayload)
      .pipe(assignToDataResponse(VerifyPinData));
  }

  verifyReferralCode(
    payload: VerifyReferralCodeDto
  ): Observable<DataResponse<VerifyReferralCodeData>> {
    return this.client
      .post('/verify-referral-code', payload)
      .pipe(assignToDataResponse(VerifyReferralCodeData));
  }

  logUserActivity(
    payload: LogUserActivityDto
  ): Observable<DataResponse<LogUserActivityData>> {
    const encryptedPayload = {
      ...payload,
      // idProfilDpa: encryptContent(payload.idProfilDpa),
    };
    return this.client
      .post('/log-user-activity', encryptedPayload)
      .pipe(assignToDataResponse(LogUserActivityData));
  }

  requestOtp(payload: RequestOtpDto): Observable<DataResponse<RequestOtpData>> {
    const encryptedPayload = {
      ...payload,
      idProfilDpa: payload.idProfilDpa,
      noHpEmail: encryptContent(payload.noHpEmail.toLowerCase()),
    };

    return this.client
      .post('request-otp', encryptedPayload)
      .pipe(assignToDataResponse(RequestOtpData));
  }

  verifyOtp(payload: VerifyOtpDto): Observable<DataResponse<VerifyOtpData>> {
    const encryptedPayload = {
      ...payload,
      idProfilDpa: payload.idProfilDpa,
    };
    return this.client
      .post('/verify-otp', encryptedPayload)
      .pipe(assignToDataResponse(VerifyOtpData));
  }

  lupaPin(payload: LupaPinDto): Observable<DataResponse<LupaPinData>> {
    const encryptedPayload = {
      ...payload,
      newPin: encryptContent(payload.newPin),
    };
    return this.client
      .post('/lupa-pin', encryptedPayload)
      .pipe(assignToDataResponse(LupaPinData));
  }

  needVerification(
    payload: any
  ): Observable<DataResponse<NeedVerificationData>> {
    const encryptedPayload = {
      ...payload,
      idProfilDpa: payload.idProfilDpa,
    };
    return this.client
      .post('/need-verification', encryptedPayload)
      .pipe(assignToDataResponse(NeedVerificationData));
  }

  deleteProfil(): Observable<DataResponse<DeleteProfilModel>> {
    return this.client
      .post('/delete-profil', {})
      .pipe(assignToDataResponse(DeleteProfilModel));
  }

  getSampleArrayData(): Observable<DataResponse<Sample[]>> {
    const response = {
      status: true,
      message: 'Success Get List Notification',
      code: '00',
      data: [
        {
          ID_NOTIF: 'NTF000000005',
          ID_PROFIL_DPA: 'DPA000000005',
          KATEGORI: 'STATUS',
          DT_NOTIF: '2023-05-10 10:45:08',
          JUDUL_NOTIF: 'Pengajuan Klaim',
          CONTENT_NOTIF: 'Klaim kamu akan di proses',
          LINK: 'test link',
          FLAG_READ: 0,
        },
        {
          ID_NOTIF: 'NTF000000004',
          ID_PROFIL_DPA: 'DPA000000005',
          KATEGORI: 'STATUS',
          DT_NOTIF: '2023-05-10 07:45:08',
          JUDUL_NOTIF: 'Verifikasi',
          CONTENT_NOTIF: 'Proses verifikasi berhasil',
          LINK: 'https://dev-new.dapenastra.com/profile',
          FLAG_READ: 0,
        },
        {
          ID_NOTIF: 'NTF000000003',
          ID_PROFIL_DPA: 'DPA000000005',
          KATEGORI: 'PROMO',
          DT_NOTIF: '2023-05-10 07:45:08',
          JUDUL_NOTIF: 'Ini juga promo kak',
          CONTENT_NOTIF: 'Lebih nguntungin buat kamu',
          LINK: 'https://dev-new.dapenastra.com/promotion/',
          FLAG_READ: 0,
        },
        {
          ID_NOTIF: 'NTF000000002',
          ID_PROFIL_DPA: 'DPA000000005',
          KATEGORI: 'PROMO',
          DT_NOTIF: '2023-05-10 07:45:08',
          JUDUL_NOTIF: 'Ada promo lhooo',
          CONTENT_NOTIF: 'Yakin ga mau ikutan?',
          LINK: 'https://dev-new.dapenastra.com/promotion/',
          FLAG_READ: 0,
        },
      ],
    };
    return of(response).pipe(assignToArrayResponse(Sample));
  }
}
