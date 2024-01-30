import { Injectable } from '@angular/core';

// var AES = require('crypto-js/aes');
var CryptoJS = require('crypto-js');

@Injectable({
  providedIn: 'root',
})
export class EncryptService {
  private secretKey: string = 'BerijalanDPA2023';
  private saltKey: string = 'BerijalanDPA2023';

  constructor() {}

  public decryptContent(content: string) {
    const excryptedKey = CryptoJS.MD5(this.secretKey);

    const bytes = CryptoJS.AES.decrypt(content, excryptedKey + this.saltKey);
    const decryptedContent = bytes.toString(CryptoJS.enc.Utf8);

    return decryptedContent;
  }
}
