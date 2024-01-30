import { Component, EventEmitter, Input, Output } from '@angular/core';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-common-device-rooted-detections-component',
  templateUrl: './device-rooted-detections.component.html',
})
export class CommonDeviceRootedDetectionsComponent {
  
  exitApp() {
    App.exitApp();
  }
}
