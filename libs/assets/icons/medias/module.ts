import Airplay from './airplay';
import Chromecast from './chromecast';
import Forward from './forward';
import Headphones from './headphones';
import MicOff from './mic-off';
import MicOn from './mic-on';
import Next from './next';
import Pause from './pause';
import Play from './play';
import Previous from './previous';
import Repeat from './repeat';
import Rewind from './rewind';
import Shuffle from './shuffle';
import SpeakerOff from './speaker-off';
import SpeakerOn from './speaker-on';
import Stop from './stop';
import PilihFile from './pilih-file';
import PilihGalery from './pilih-galery';
import PilihFoto from './ambil-foto';
import TambahGambar from './tambah-gambar';

export const MediaIconsModule: any = {
  airplay: Airplay(),
  chromecast: Chromecast(),
  forward: Forward(),
  headphones: Headphones(),
  mic_off: MicOff(),
  mic_on: MicOn(),
  next: Next(),
  pause: Pause(),
  play: Play(),
  previous: Previous(),
  repeat: Repeat(),
  rewind: Rewind(),
  shuffle: Shuffle(),
  speaker_off: SpeakerOff(),
  speaker_on: SpeakerOn(),
  stop: Stop(),
  pilih_foto: PilihFoto(),
  pilih_file: PilihFile(),
  pilih_galery: PilihGalery(),
  tambah_gambar: TambahGambar(),
};
