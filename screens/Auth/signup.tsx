import { AntDesign } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { fontSize } from 'constants/theme';

import { Screen, Text, Button } from 'lib';
import { moderateScale } from 'lib/ResponsiveSize';
import React, { useEffect } from 'react';
import { StyleSheet, Image, View  } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { signInWithGoogle } from 'services/auth';
import { trackScreenPerformance } from 'helpers/firebaseConfig';


const logo = require('../../assets/icon.png');

interface SignUpScreenProps {
  navigation: StackNavigationProp<any, 'SignUp'>;
}

const SignUpScreen = ({ navigation }: SignUpScreenProps) => {
  useEffect(() => {
    const stopTracking = trackScreenPerformance('SomeScreen');
    return stopTracking;
  }, []);
  const user = useSelector((state: RootState) => state.auth.user);

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Google sign in error:', error);
    }
  };

  const navigateToEmailSignUp = () => {
    navigation.navigate('EmailSignUp');
  };
  
  return (
    <Screen
      safeAreaEdges={['top', 'bottom']}
      statusBarStyle="dark"
      contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={logo} resizeMode="contain" style={styles.image} />
        <Text size={fontSize.extraLarge + 5} family="bold">
          PF News
        </Text>
        <Text size={fontSize.extraLarge} family="semi-bold">
          Welcome, Let's dive into your account
        </Text>
      </View>
      <View style={styles.body}>
        <Button
          leftIcon={<AntDesign name="google" size={24} color="black" />}
          label="Continue with Google"
          variant="secondary"
          style={styles.googleButton}
          onPress={handleGoogleSignIn}
        />
        <Text style={{ alignSelf: 'center' }}>or</Text>
        <Button
          label="Sign up with Email"
          style={styles.googleButton}
          onPress={navigateToEmailSignUp}
        />
        <Text style={{ alignSelf: 'flex-end' }} family="light" size={fontSize.small}>
          Already have an account?{' '}
          <Text family="semi-bold" size={fontSize.small}>
            Sign in
          </Text>
        </Text>
      </View>
    </Screen>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    padding: moderateScale(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: moderateScale(100),
    height: moderateScale(100),
  },
  googleButton: {
    justifyContent: 'center',
    columnGap: 10,
  },
  lineContainer: {
    flexDirection: 'row',
  },
  line: {
    borderBottomWidth: 2,
    paddingVertical: 10,
  },
  body: {
    padding: moderateScale(24),
  },
});
