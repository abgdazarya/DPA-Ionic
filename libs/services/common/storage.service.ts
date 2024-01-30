import { Injectable } from '@angular/core';

import { Preferences } from '@capacitor/preferences';

export enum StorageKeyEnum {
  NOMOR_PESERTA = 'NOMOR_PESERTA',
  TOKEN_SALDO = 'TOKEN_SALDO',
  BIOMETRIC = 'BIOMETRIC',
  TOKEN = 'TOKEN',
  REFRESH_TOKEN = 'REFRESH_TOKEN',
  TIMESTAPM = 'TIMESTAPM',
  OCR_LAST_REQUEST = 'OCR_LAST_REQUEST',
  DETAIL_PROFILE = 'DETAIL_PROFILE',
  POPUP_RESIGN = 'POPUP_RESIGN',
  POPUP_BIRTHDAY = 'POPUP_BIRTHDAY',
  TOKEN_STORED = 'TOKEN_STORED',
  ID_PROFILE_DPA = 'ID_PROFILE_DPA',
  ID_ACCOUNT_DPA = 'ID_ACCOUNT_DPA',
  QUIZ = 'QUIZ',
  LOG_CONDITION = 'LOG_CONDITION',
}

interface getOcrLastRequest {
  isExpired: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  setStorage(keyStorage: StorageKeyEnum | string, value: string | any) {
    localStorage.setItem(keyStorage.toString(), JSON.stringify(value));
  }

  getStorage(keyStorage: StorageKeyEnum | string) {
    const res = localStorage.getItem(keyStorage.toString());

    if (res) {
      const value = JSON.parse(res);
      return value;
    }

    return null;
  }

  removeStorage(keyStorage: StorageKeyEnum | string) {
    localStorage.removeItem(keyStorage.toString());
  }

  clearStorage() {
    const isUseBiometric = this.getStorage(StorageKeyEnum.BIOMETRIC);
    const popupConcern = this.getStorage(`popupConcern`);
    localStorage.clear();
    if (isUseBiometric) {
      this.setStorage(StorageKeyEnum.BIOMETRIC, isUseBiometric);
    }
    if (popupConcern) {
      this.setStorage(`popupConcern`, popupConcern);
    }
  }

  // Extend Function

  // async setToken(token: any, refreshToken: any, timestamp: any) {
  //   await this.storage.set('token', token);
  //   await this.storage.set('refreshToken', refreshToken);
  //   await this.storage.set('timestamp', timestamp);
  // }

  // async removeStorage() {
  //   const isUseBiometric = await this.getBiometric();
  //   await this.storage.clear();
  //   await this.storage.set('biometric', isUseBiometric);
  //   setTimeout(() => {
  //     window.location.replace('/login');
  //   }, 2000);
  // }

  // async clearStorage() {
  //   const isUseBiometric = await this.getBiometric();
  //   await this.storage.clear();
  //   if (isUseBiometric) {
  //     await this.storage.set('biometric', isUseBiometric);
  //   }
  // }

  setOcrLastRequest(time: Date) {
    this.setStorage(StorageKeyEnum.OCR_LAST_REQUEST, time);
  }

  getOcrLastRequest(): getOcrLastRequest {
    const data = this.getStorage(StorageKeyEnum.OCR_LAST_REQUEST);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const lastUpdateDate = new Date(data);
    lastUpdateDate.setHours(0, 0, 0, 0);
    if (currentDate.getTime() > lastUpdateDate.getTime()) {
      return {
        isExpired: true,
      };
    }
    return {
      isExpired: false,
    };
  }
}
