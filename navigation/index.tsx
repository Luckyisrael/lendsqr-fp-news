import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { createStackNavigator } from '@react-navigation/stack';
import { colors } from 'constants/theme';
import { Bookmark2, Home, ProfileTick } from 'iconsax-react-native';
import { moderateScale } from 'lib/ResponsiveSize';
import EmailSignUpScreen from 'screens/Auth/emailSignup';
import SignUpScreen from 'screens/Auth/signup';
import NewsDetailScreen from 'screens/NewsDetails/newsDetails';
import BookmarkedScreen from 'screens/Tabs/bookmarks';
import HomeScreen from 'screens/Tabs/home';
import ProfileScreen from 'screens/Tabs/profile';

import OnboardingScreen from '../screens/Onboarding/onboardingScreen';

const Tab = createBottomTabNavigator();

const Stack = createStackNavigator();

const RootStack = () => {
  return (
      <Stack.Navigator initialRouteName="OnboardingScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="EmailSignUp" component={EmailSignUpScreen} />
        <Stack.Screen name="MainTab" component={TabNavigation} />
      </Stack.Navigator>
  );
};

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return <Home size={32} color={color} variant={focused ? 'Bold' : 'Bulk'} />;
          } else if (route.name === 'Bookmarked') {
            return <Bookmark2 size="32" color={color} variant={focused ? 'Bold' : 'Bulk'} />;
          } else if (route.name === 'Profile') {
            return <ProfileTick size="32" color={color} variant={focused ? 'Bold' : 'Bulk'} />;
          }
        },
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0,
          height: moderateScale(50),
        },
        tabBarActiveTintColor: colors.theme.secondary200,
        tabBarInactiveTintColor: 'gray',
      })}>
      <Tab.Screen name="Home" component={NewsDetailsStack} />
      <Tab.Screen name="Bookmarked" component={BookmarkedScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const NewsDetailsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeIndex" component={HomeScreen} />
      <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
    </Stack.Navigator>
  );
};

export { RootStack, TabNavigation, NewsDetailsStack };
