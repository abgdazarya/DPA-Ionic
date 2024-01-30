import Desktop from './desktop';
import Devices from './devices';
import Display from './display';
import Keyboard from './keyboard';
import Laptop from './laptop';
import Mobile1 from './mobile-1';
import Mobile2 from './mobile-2';
import Mouse from './mouse';
import PhotoCamera1 from './photo-camera-1';
import PhotoCamera2 from './photo-camera-2';
import Print from './print';
import Qr from './qr';
import SaveDisk from './save-disk';
import Tablet1 from './tablet-1';
import Tablet2 from './tablet-2';
import VideoCamera from './video-camera';

export const DeviceIconsModule: any = {
  desktop: Desktop(),
  devices: Devices(),
  display: Display(),
  keyboard: Keyboard(),
  laptop: Laptop(),
  mobile_1: Mobile1(),
  mobile_2: Mobile2(),
  mouse: Mouse(),
  photo_camera_1: PhotoCamera1(),
  photo_camera_2: PhotoCamera2(),
  print: Print(),
  qr: Qr(),
  save_disk: SaveDisk(),
  tablet_1: Tablet1(),
  tablet_2: Tablet2(),
  video_camera: VideoCamera(),
};
