import { Button, Screen, Text } from 'lib';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, View, TextInput } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { signInWithEmail, signUpWithEmail } from 'services/auth';
import { trackScreenPerformance } from 'helpers/firebaseConfig';

const logo = require('../../assets/icon.png');

const EmailSignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      await signUpWithEmail(email, password);
    } catch (error) {
      console.error('Sign up error:', error);
    }
  };
  return (
    <Screen safeAreaEdges={['top']}>
      <View style={styles.header}>
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button label="Sign In" onPress={handleEmailSignIn} />
        <Button label="Sign Up" onPress={handleSignUp} />
      </View>
    </Screen>
  );
};

export default EmailSignUpScreen;

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
