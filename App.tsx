import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SplashScreen from './screens/citizen/splash';
import LoginScreen from './screens/citizen/login';
import RegisterScreen from './screens/citizen/register';
import CitizenTabs from './screens/citizen/tabs';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);

  // Check if user was already logged in
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token');
        const savedFirstName =
          await AsyncStorage.getItem('first_name');
        
        const savedLastName =
          await AsyncStorage.getItem('last_name');

        if (token && savedFirstName && savedLastName) {
          setFirstName(savedFirstName);
          setLastName(savedLastName);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log('Error checking login:', error);
      } finally {
        setIsCheckingLogin(false);
      }
    };

    checkLogin();
  }, []);

  // Show splash screen first
  if (showSplash) {
    return (
      <SplashScreen
        onFinish={() => setShowSplash(false)}
      />
    );
  }

  // Wait while checking AsyncStorage
  if (isCheckingLogin) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // User is logged in
  if (isLoggedIn) {
    return (
      <CitizenTabs
        firstName={firstName}
        lastName={lastName}
        onLogout={async () => {
          await AsyncStorage.removeItem('auth_token');
          await AsyncStorage.removeItem('first_name');
          await AsyncStorage.removeItem('last_name');

          setIsLoggedIn(false);
          setFirstName('');
          setLastName('');
        }}
      />
    );
  }

  // Register screen
  if (showRegister) {
    return (
      <RegisterScreen
        onLogin={() => setShowRegister(false)}
      />
    );
  }

  // Login screen
  return (
    <LoginScreen
      onRegister={() => setShowRegister(true)}
      onLogin={(userFirstName, userLastName) => {
        setFirstName(userFirstName);
        setLastName(userLastName);
        setIsLoggedIn(true);
      }}
    />
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});