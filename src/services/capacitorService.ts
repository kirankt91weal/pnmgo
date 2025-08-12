import { App } from '@capacitor/app';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';

export class CapacitorService {
  // Initialize Capacitor features
  static async initialize() {
    try {
      // Set status bar style
      await StatusBar.setStyle({ style: Style.Dark });
      
      // Hide splash screen
      await SplashScreen.hide();
      
      console.log('Capacitor initialized successfully');
    } catch (error) {
      console.error('Error initializing Capacitor:', error);
    }
  }

  // Haptic feedback
  static async hapticFeedback(style: ImpactStyle = ImpactStyle.Light) {
    try {
      await Haptics.impact({ style });
    } catch (error) {
      console.error('Haptic feedback error:', error);
    }
  }

  // Get app info
  static async getAppInfo() {
    try {
      const info = await App.getInfo();
      return info;
    } catch (error) {
      console.error('Error getting app info:', error);
      return null;
    }
  }

  // Handle app state changes
  static async setupAppStateListeners() {
    try {
      App.addListener('appStateChange', ({ isActive }) => {
        console.log('App state changed. Is active:', isActive);
      });

      App.addListener('appUrlOpen', (data) => {
        console.log('App opened with URL:', data.url);
      });

      App.addListener('appRestoredResult', (data) => {
        console.log('App restored with data:', data);
      });
    } catch (error) {
      console.error('Error setting up app state listeners:', error);
    }
  }
} 