var CryptoJS = require('crypto-js');

function Decoding64(str: string = ''): string {
  str = decrypt(
    str,
    CryptoJS.enc.Base64.parse('Ew#@DvF').toString(),
    CryptoJS.enc.Base64.parse('k7yg-').toString()
  );
  return str;
}

function getKey(str: string): string {
  str = str?.replace(/-/gi, '');
  const arr = str.split('').reverse();
  return Decoding64(arr.join(''));
}

function decrypt(value: any, secretKeyConfig: any, ivRaw: any): any {
  var iv = CryptoJS.enc.Hex.parse(ivRaw);
  const excryptedKey = CryptoJS.MD5(secretKeyConfig);
  const bytes = CryptoJS.AES.decrypt(value, excryptedKey + secretKeyConfig, iv);
  const res = bytes.toString(CryptoJS.enc.Utf8);
  if (res?.match(/false|true/)) {
    return res?.match('false') ? false : true;
  }
  return res;
}

function decodeData(
  data: any,
  targetObject: any,
  secretKeyConfig: string,
  ivRaw: string
) {
  // return new Promise(async (resolve) => {
  for (const key in data) {
    const value = data[key];
    const newKey = decrypt(key, secretKeyConfig, ivRaw);
    // await new Promise(async (resolveArr) => {
    if (typeof value === 'object') {
      const newChild = {};
      decodeData(value, newChild, secretKeyConfig, ivRaw);
      targetObject[newKey] = newChild;
    } else {
      targetObject[newKey] = decrypt(value.toString(), secretKeyConfig, ivRaw);
    }
    // resolveArr(true);
    // });
  }
  // resolve(true);
  // });
}

interface firebase {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId: string;
}
interface apiBase {
  auth: string;
  home: string;
  profile: string;
  menu: string;
  menuPublic: string;
  quiz: string;
  simulasiMp: string;
  master: string;
}
interface environment {
  production: any;
  firebase: firebase;
  key: string;
  apiEndpoint: string;
  apiEndpointLoginEklaim: string;
  apiEndpointEklaim: string;
  apiEndpointEklaimPengajuan: string;
  endpoint: string;
  urlWeb: string;
  apiPaths: apiBase;
}

function getEnv(objectData: any, secretKeyConfig: any, ivRaw: any) {
  const obj = {};
  decodeData(objectData, obj, getKey(secretKeyConfig), getKey(ivRaw));
  return obj;
}
