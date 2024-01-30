import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ScreenSizeService } from './screen-size.service';
import { Observable } from 'rxjs';
import { Capacitor } from '@capacitor/core';
import { ToastController } from '@ionic/angular';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Device } from '@awesome-cordova-plugins/device/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { PhotoLibrary } from '@awesome-cordova-plugins/photo-library/ngx';

@Injectable({
  providedIn: 'root',
})
export class CameraService {
  constructor(
    public screenSizeService: ScreenSizeService,
    private device: Device,
    private androidPermissions: AndroidPermissions,
    private photoLibrary: PhotoLibrary,
    private toast: ToastController
  ) {}

  async takePhoto(type: string = 'camera') {
    let fileSource: any = CameraSource.Prompt;

    // if (Capacitor.getPlatform() != 'web') {
    if (Capacitor.isNativePlatform() || Capacitor.getPlatform() == 'ios') {
      const checkPermission = await Camera.checkPermissions();
      
      if (checkPermission.camera != 'granted') {
        const askPermission = await Camera.requestPermissions();
        if (askPermission.camera != 'granted') {
          alert('Akses ke kamera tidak di izinkan!');
          return null;
        }
      }
      
      if (Number(this.device.sdkVersion) >= 33) {
        let permission = await Filesystem.checkPermissions()

        if (permission.publicStorage !== "granted") {
          await this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.DOCUMENTS);
          permission = await Filesystem.requestPermissions();
          if (permission.publicStorage !== "granted") {
            this.photoLibrary.requestAuthorization({read:true,write:true}).then(res => {
            });
            return;
          }
        }
      }
    }
    // const checkPermission = await Camera.checkPermissions();
    // if (
    //   checkPermission.photos != 'granted' &&
    //   (type == 'photo' || type == 'prompt')
    // ) {
    //   const askPermission = await Camera.requestPermissions();
    //   if (askPermission.photos != 'granted') {
    //     alert('Akses ke galeri tidak diinjinkan');
    //     return null;
    //   }
    // }
    // if (
    //   checkPermission.camera != 'granted' &&
    //   (type == 'camera' || type == 'prompt')
    // ) {
    //   const askPermission = await Camera.requestPermissions();
    //   if (askPermission.camera != 'granted') {
    //     alert('Akses ke kamera tidak diinjinkan');
    //     return null;
    //   }
    // }
    if (type == 'photo') {
      fileSource =
        Capacitor.getPlatform() == 'ios'
          ? CameraSource.Prompt
          : CameraSource.Photos;
    } else if (type == 'camera') {
      fileSource = CameraSource.Camera;
    } else {
      fileSource = CameraSource.Prompt;
    }

    try {
      if (Capacitor.getPlatform() === 'web') {
        const capturedPhoto = await Camera.getPhoto({
          resultType: CameraResultType.Uri,
          source: fileSource,
          quality: 45,
          allowEditing: false,
          width: 1024,
        });

        return this.convertToFile(capturedPhoto.webPath);
      } else {
        const capturedPhoto: any = await Camera.getPhoto({
          resultType: CameraResultType.DataUrl,
          source: fileSource,
          quality: 45,
          allowEditing: false,
          width: 1024,
        });
        const imageFile = this.createImageFileFromDataUrl(
          capturedPhoto.dataUrl
        );

        return imageFile;
      }
    } catch (error) {
      return null;
    }
  }

  async convertToFile(photoWebPath: any) {
    let blob = await fetch(photoWebPath).then((r) => r.blob());
    if (!blob.type.startsWith('image/')) {
      return null;
    }

    const file = new File([blob], `image-file-${new Date().getTime()}`, {
      type: blob.type,
    });
    return file;
  }

  async convertToFileFromBase64(dataUrl: any) {
    const block = dataUrl.split(';');
    const contentType = block[0].split(':')[1];
    const realData = block[1].split(',')[1];

    const byteCharacters = atob(realData);
    const byteArray = new Uint8Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArray[i] = byteCharacters.charCodeAt(i);
    }

    const blob = new Blob([byteArray], { type: contentType });

    return blob;
  }

  createImageFileFromDataUrl(dataUrl: string) {
    if (dataUrl) {
      const block = dataUrl.split(';');
      const contentType = block[0].split(':')[1];
      const realData = block[1].split(',')[1];

      const byteCharacters = atob(realData);
      const byteArray = new Uint8Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteArray[i] = byteCharacters.charCodeAt(i);
      }

      const blob = new Blob([byteArray], { type: contentType });

      return blob;
    } else {
      return dataUrl;
    }
  }

  createWaterMark = (file: any, watermark: any) => {
    return new Promise((approve) => {
      const mainImg = this.loadImage(file, () => {
        const canvas: any = document.createElement('canvas');
        const canvas2d: any = canvas.getContext('2d');
        canvas2d.imageSmoothingEnabled = false;
        canvas.imageSmoothingEnabled = false;
        let originalWidth = mainImg.width;
        let originalHeight = mainImg.height;

        canvas.width = originalWidth;
        canvas.height = originalHeight;
        const DEVIDER_SIZE = 1.5;
        const waterMrkImg = this.loadImage(watermark, async () => {
          let newRatio = canvas.width / DEVIDER_SIZE / waterMrkImg.width;
          let newWidth = canvas.width / DEVIDER_SIZE;
          let newHeight = waterMrkImg.height * newRatio;
          const dy = canvas.height / 2 - newHeight / 2;
          const dx = canvas.width / 2 - newWidth / 2;
          try {
            await canvas2d.drawImage(
              mainImg,
              0,
              0,
              originalWidth,
              originalHeight
            );
            await canvas2d.drawImage(waterMrkImg, dx, dy, newWidth, newHeight);
            await canvas.toBlob((blob: any) => {
              if (blob) {
                approve(blob);
              }
            });
          } catch (e: any) {
            approve(file);
          }
        });
      });
    });
  };

  private loadImage = (file: any, callback: () => void) => {
    const img: any = new Image();
    img.onload = callback;
    img.src = URL.createObjectURL(file);
    return img;
  };

  resizeImage = (imgSrc: any, maxWidth: number = 1024) => {
    // return new Promise(async (approve) => {
    //   approve(imgSrc);
    // });

    return new Promise((approve) => {
      const img: any = new Image();
      img.onload = async function () {
        const canvas: any = document.createElement('canvas');
        const canvas2d: any = canvas.getContext('2d');
        canvas2d.imageSmoothingEnabled = false;
        canvas.imageSmoothingEnabled = false;

        let originalWidth = img.width;
        let originalHeight = img.height;

        let newRatio = maxWidth / originalWidth;
        let newWidth = maxWidth;
        let newHeight = originalHeight * newRatio;

        if (img.width <= maxWidth) {
          approve(imgSrc);
          return imgSrc;
          newWidth = img.width;
          newHeight = img.height;
        }

        canvas.width = newWidth;
        canvas.height = newHeight;
        await canvas2d.drawImage(img, 0, 0, newWidth, newHeight);
        await canvas.toBlob((blob: any) => {
          if (blob) {
            approve(blob);
          }
        });
      };
      img.src = URL.createObjectURL(imgSrc);
    });
    // return new Promise((approve) => {
    //   const img: any = new Image();
    //   img.onload = async function () {
    //     const canvas: any = document.createElement('canvas');
    //     const canvas2d: any = canvas.getContext('2d');
    //     canvas2d.imageSmoothingEnabled = false;
    //     canvas.imageSmoothingEnabled = false;

    //     let originalWidth = img.width;
    //     let originalHeight = img.height;

    //     let newRatio = maxWidth / originalWidth;
    //     let newWidth = maxWidth;
    //     let newHeight = originalHeight * newRatio;

    //     if (img.width <= maxWidth) {
    //       approve(imgSrc);
    //       return imgSrc;
    //       newWidth = img.width;
    //       newHeight = img.height;
    //     }

    //     canvas.width = newWidth;
    //     canvas.height = newHeight;
    //     await canvas2d.drawImage(img, 0, 0, newWidth, newHeight);
    //     await canvas.toBlob((blob: any) => {
    //       if (blob) {
    //         approve(blob);
    //       }
    //     });
    //   };
    //   img.src = URL.createObjectURL(imgSrc);
    // });
  };

  blobToDataURL(blob: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
}
