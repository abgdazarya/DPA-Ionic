import { Injectable } from '@angular/core';
import { Device } from '@capacitor/device';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  constructor(public platform: Platform) {}

  async getDeviceId() {
    const deviceIdObj: any = await Device.getId();
    const deviceId = deviceIdObj.identifier || deviceIdObj.uuid;
    return deviceId;
  }
  async getDeviceInfo() {
    const deviceInforObj: any = await Device.getInfo();
    const device = deviceInforObj?.name || deviceInforObj?.operatingSystem;
    return device;
  }

  getBrowserName() {
    const agent = window.navigator.userAgent.toLowerCase();
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return 'other';
    }
  }

  getPlatformVersion() {
    if (this.platform.url().startsWith('http')) return 'browser';
    if (!this.platform.url().startsWith('http')) return 'mobile';
    else return '';
  }
}
