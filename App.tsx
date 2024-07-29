import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { initializeFirebase, trackScreenPerformance } from 'helpers/firebaseConfig';
import { RootStack } from 'navigation';
import { useEffect } from 'react';
import { Provider, useSelector } from 'react-redux';
import { store, RootState } from 'redux/store';
import { useAuthStateListener } from 'services/auth';

const AppEntry = () => {
  useAuthStateListener();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const [loaded] = useFonts({
    SpaceMono: require('./assets/fonts/SpaceMono-Regular.ttf'),
    'TitilliumWeb-Bold': require('./assets/fonts/TitilliumWeb-Bold.ttf'),
    'TitilliumWeb-Black': require('./assets/fonts/TitilliumWeb-Black.ttf'),
    'TitilliumWeb-Regular': require('./assets/fonts/TitilliumWeb-Regular.ttf'),
    'TitilliumWeb-Light': require('./assets/fonts/TitilliumWeb-Light.ttf'),
    'TitilliumWeb-SemiBold': require('./assets/fonts/TitilliumWeb-SemiBold.ttf'),
    'TitilliumWeb-ExtraLight': require('./assets/fonts/TitilliumWeb-ExtraLight.ttf'),
    'TitilliumWeb-BoldItalic': require('./assets/fonts/TitilliumWeb-BoldItalic.ttf'),
  });

  useEffect(() => {
    initializeFirebase();
  }, []);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer
      onStateChange={(state) => {
        const currentScreen = state?.routes[state.index]?.name;
        if (currentScreen) {
          trackScreenPerformance(currentScreen);
        }
      }}>
      <RootStack />
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <AppEntry />
    </Provider>
  );
};

export default App;
