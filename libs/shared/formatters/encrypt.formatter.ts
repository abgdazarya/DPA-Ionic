var CryptoJS = require('crypto-js');

import { environment } from '../../../src/environments/environment';

export function decryptContentClass(content: any): string {
  const value = content?.value;

  if (!value) return '';

  const excryptedKey = CryptoJS.MD5(environment?.key).toString();

  const cipher = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(value));
  const keyE = CryptoJS.enc.Utf8.parse(excryptedKey);
  const iv = CryptoJS.enc.Utf8.parse(environment?.key);

  const decrypt = CryptoJS.AES.decrypt(cipher, keyE, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const decrypted = decrypt.toString(CryptoJS.enc.Utf8);

  return decrypted || value;
}

export function decryptContent(content: string): string {
  const excryptedKey = CryptoJS.MD5(environment?.key).toString();

  const cipher = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Hex.parse(content));
  const keyE = CryptoJS.enc.Utf8.parse(excryptedKey);
  const iv = CryptoJS.enc.Utf8.parse(environment?.key);

  const decrypt = CryptoJS.AES.decrypt(cipher, keyE, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  const decrypted = decrypt.toString(CryptoJS.enc.Utf8);

  return decrypted || content;
}

export function encryptContent(content: any): string | null {
  if (!content) return null;
  const excryptedKey = CryptoJS.MD5(environment?.key).toString();

  const keyE = CryptoJS.enc.Utf8.parse(excryptedKey);
  const iv = CryptoJS.enc.Utf8.parse(environment.key);

  const encrypt = CryptoJS.AES.encrypt(content, keyE, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();

  const b64 = CryptoJS.enc.Base64.parse(encrypt);
  const encrypted = b64.toString(CryptoJS.enc.Hex);

  return encrypted || content;
}

export function reduceParams(obj: any): any {
  const newObj: any = {};
  for (const key in obj) {
    if (obj[key]) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}
