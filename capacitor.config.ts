import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.carla.app',
  appName: 'carla',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins:{
    LocalNotifications:{
      smallIcon: "",
      iconColor:"",
      sound: ""
    }
  }
};

export default config;
