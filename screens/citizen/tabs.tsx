import React from 'react';
import {
  NavigationContainer,
} from '@react-navigation/native';
import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';

import HomeScreen from './home';
import ProfileScreen from './profile';

type Props = {
  firstName: string;
  lastName: string;
  
  
  onLogout: () => void;
};

const Tab = createBottomTabNavigator();

export default function CitizenTabs({
  firstName,
  lastName,
  onLogout,
}: Props) {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen
          name="Home"
          options={{
            title: 'Home',
            tabBarLabel: 'Home',
          }}
        >
          {() => (
            <HomeScreen
              firstName={firstName}
              onReportIssue={() => {
                console.log('Report Issue pressed');
              }}
            />
          )}
        </Tab.Screen>

        <Tab.Screen
          name="Profile"
          options={{
            title: 'Profile',
            tabBarLabel: 'Profile',
          }}
        >
          {() => (
            <ProfileScreen
              firstName={firstName}
              lastName={lastName}
              onLogout={onLogout}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}