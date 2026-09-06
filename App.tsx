import { useState } from 'react';
import SplashScreen from './screens/citizen/splash';
import LoginScreen from './screens/citizen/login';
import RegisterScreen from './screens/citizen/register';
import HomeScreen from './screens/citizen/home';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (showSplash) {
    return (
      <SplashScreen
        onFinish={() => setShowSplash(false)}
      />
    );
  }

  if (isLoggedIn) {
    return (
      <HomeScreen
        onReportIssue={() => {
          console.log('Report Issue pressed');
        }}
      />
    );
  }

  if (showRegister) {
    return (
      <RegisterScreen
        onLogin={() => setShowRegister(false)}
      />
    );
  }

  return (
    <LoginScreen
      onRegister={() => setShowRegister(true)}
      onLogin={() => setIsLoggedIn(true)}
    />
  );
}