import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.dpareborn.id',
  appName: 'MyDPA',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    CapacitorHttp: {
      enabled: false,
    },
    GoogleAuth: {
      scopes: ['profile', 'email'],
      clientId:
        '747596971905-nhacnsrdk76jttc5vpcba68r22felfk5.apps.googleusercontent.com',
      androidClientId:
        '747596971905-nhacnsrdk76jttc5vpcba68r22felfk5.apps.googleusercontent.com',
      serverClientId:
        '747596971905-nhacnsrdk76jttc5vpcba68r22felfk5.apps.googleusercontent.com',
      iosClientId:
        '747596971905-u2oaoduq9aq5aj3ekmdithsn5ni88ibb.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
    PushNotifications: {
      presentationOptions: ['badge', 'sound', 'alert'],
    },
    SSLPinning: {
      certs: ['dappenastra_pub.cer'],
      excludedDomains: ['https://analytics.google.com'],
    },
  },
};

export default config;
