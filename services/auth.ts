import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setUser, logout, User } from 'redux/authSlice';

GoogleSignin.configure({
  //webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIEINT, 
  androidClientId: '42551340623-b7o0ijohtmb8tafo5ri0us3vln5n7n0g.apps.googleusercontent.com'
  
});

export const signUpWithEmail = async (email: string, password: string): Promise<User> => {
  const userCredential = await auth().createUserWithEmailAndPassword(email, password);
  const user = userCredential.user;
  return {
    id: user.uid,
    email: user.email!,
    name: user.displayName || '',
  };
};

export const signInWithEmail = async (email: string, password: string): Promise<User> => {
  const userCredential = await auth().signInWithEmailAndPassword(email, password);
  const user = userCredential.user;
  return {
    id: user.uid,
    email: user.email!,
    name: user.displayName || '',
  };
};

export const signInWithGoogle = async (): Promise<User> => {
  await GoogleSignin.hasPlayServices();
  const { idToken } = await GoogleSignin.signIn();
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  const userCredential = await auth().signInWithCredential(googleCredential);
  const user = userCredential.user;
  return {
    id: user.uid,
    email: user.email!,
    name: user.displayName || '',
  };
};

export const signOut = async () => {
  await auth().signOut();
  await GoogleSignin.signOut();
};

export const useAuthStateListener = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          setUser({
            id: user.uid,
            email: user.email!,
            name: user.displayName || '',
          })
        );
      } else {
        dispatch(logout());
      }
    });

    return unsubscribe;
  }, [dispatch]);
};
