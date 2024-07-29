import firebase from '@react-native-firebase/app';
import { Platform } from 'react-native';
import '@react-native-firebase/crashlytics';
import '@react-native-firebase/messaging';
import '@react-native-firebase/perf';

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_GOOGLE_AUTH_DOMAIN,
  projectId: 'lendsqr-fp-news-7ad95',
  storageBucket: process.env.EXPO_PUBLIC_GOOGLE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_GOOGLE_MESSAGING_SENDER,
  appId: '1:162726264352:web:e3032b688c5afec4ad4645',
  measurementId: process.env.EXPO_PUBLIC_GOOGLE_MEASUREMENT_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Crashlytics configuration
const configureCrashlytics = async () => {
  await firebase.crashlytics().setCrashlyticsCollectionEnabled(true);

  //global error handler
  ErrorUtils.setGlobalHandler((error, isFatal) => {
    firebase.crashlytics().recordError(error);
    // Todo: shpw 
    console.error(error);
  });
};

// Messaging configuration
const configureMessaging = async () => {
  const messaging = firebase.messaging();

  await messaging.requestPermission();
  const token = await messaging.getToken();
  console.log('FCM Token:', token);

  // Handle foreground messages
  messaging.onMessage(async (remoteMessage) => {
    console.log('Foreground Message received:', remoteMessage);
  });

  // Handle background messages
  messaging.setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('Background Message received:', remoteMessage);
  });

  // Handle notification open events
  messaging.onNotificationOpenedApp((remoteMessage) => {
    console.log('Notification caused app to open from background state:', remoteMessage);
  });

  // Check if app was opened from a notification
  messaging.getInitialNotification().then((remoteMessage) => {
    if (remoteMessage) {
      console.log('Notification caused app to open from quit state:', remoteMessage);
    }
  });
};

// Performance monitoring configuration
const configurePerformance = async () => {
  await firebase.perf().setPerformanceCollectionEnabled(true);
};

export const initializeFirebase = async () => {
  try {
    await configureCrashlytics();
    if (Platform.OS !== 'web') {
      await configureMessaging();
      await configurePerformance();
    }
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Error initializing Firebase:', error);
  }
};

// Automatic screen tracking for performance monitoring
export const trackScreenPerformance = (screenName: string) => {
  let trace: firebase.perf.Trace;
  firebase
    .perf()
    .startTrace(`screen_${screenName}`)
    .then((createdTrace) => {
      trace = createdTrace;
    });

  return () => {
    if (trace) {
      trace.stop();
    }
  };
};

// Log custom events for analytics
export const logEvent = (eventName: string, params?: { [key: string]: any }) => {
  analytics().logEvent(eventName, params);
};

// Log custom error to Crashlytics
export const logError = (error: Error, context?: { [key: string]: string }) => {
  if (context) {
    Object.keys(context).forEach((key) => {
      firebase.crashlytics().setAttribute(key, context[key]);
    });
  }
  firebase.crashlytics().recordError(error);
};
