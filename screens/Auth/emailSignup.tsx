import { useNavigation } from '@react-navigation/native';
import Loading from 'components/loading';
import { colors, fontSize } from 'constants/theme';
import { trackScreenPerformance } from 'helpers/firebaseConfig';
import { Button, Input, Screen, Text } from 'lib';
import { moderateScale } from 'lib/ResponsiveSize';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, TextInput, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { signInWithEmail, signUpWithEmail } from 'services/auth';

const logo = require('../../assets/icon.png');

const EmailSignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const user = useSelector((state: RootState) => state.auth.user);
  useEffect(() => {
    const stopTracking = trackScreenPerformance('SomeScreen');
    return stopTracking;
  }, []);

  const handleEmailSignIn = async () => {
    try {
      await signInWithEmail(email, password);
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  const handleSignUp = async () => {
    try {
      setIsLoading(true);
      await signUpWithEmail(email, password);
      navigation.navigate('MainTab');
    } catch (error) {
      setIsLoading(false);
      console.error('Sign up error:', error);
    }
  };
  return (
    <Screen safeAreaEdges={['top']} contentContainerStyle={styles.container}>
      {isLoading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size='large' />
        </View>
      ) : (
        <View style={styles.header}>
          <Image
            source={logo}
            resizeMode="contain"
            style={{ width: moderateScale(40), height: moderateScale(40) }}
          />
          <Text family="bold" size={fontSize.large}>
            Create{'\n'}Your{'\n'}Account
          </Text>
          <Input placeholder="Email" onChangeText={setEmail} />
          <Input placeholder="Password" onChangeText={setPassword} secureTextEntry />
          <Button label="Sign Up" onPress={handleSignUp} />
        </View>
      )}
    </Screen>
  );
};

export default EmailSignUpScreen;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    rowGap: 10,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
});
