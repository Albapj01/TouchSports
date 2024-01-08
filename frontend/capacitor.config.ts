import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'frontend',
  webDir: '../dist/frontend',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
  },
};

export default config;
