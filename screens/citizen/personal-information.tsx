import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_URL } from '../../services/api';

type CitizenProfile = {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  contact_number: string;
  address: string;
};

export default function PersonalInformationScreen() {
  const [profile, setProfile] =
    useState<CitizenProfile | null>(null);

  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    try {
      const token =
        await AsyncStorage.getItem('auth_token');

      if (!token) {
        Alert.alert(
          'Error',
          'You are not logged in.'
        );
        return;
      }

      const response = await fetch(
        `${API_URL}/api/citizen/profile/`,
        {
          method: 'GET',
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert(
          'Error',
          data?.error ||
            'Unable to load your information.'
        );
        return;
      }

      setProfile(data);

    } catch (error) {
      console.log('Profile error:', error);

      Alert.alert(
        'Connection Error',
        'Unable to connect to the server.'
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />

        <Text style={styles.loadingText}>
          Loading information...
        </Text>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.loadingContainer}>
        <Text>
          Unable to load your information.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>
        Personal Information
      </Text>

      <Text style={styles.subtitle}>
        Your account information
      </Text>

      <View style={styles.card}>

        <Text style={styles.label}>
          FIRST NAME
        </Text>

        <Text style={styles.value}>
          {profile.first_name}
        </Text>

        <View style={styles.divider} />

        <Text style={styles.label}>
          LAST NAME
        </Text>

        <Text style={styles.value}>
          {profile.last_name}
        </Text>

        <View style={styles.divider} />

        <Text style={styles.label}>
          USERNAME
        </Text>

        <Text style={styles.value}>
          {profile.username}
        </Text>

        <View style={styles.divider} />

        <Text style={styles.label}>
          EMAIL
        </Text>

        <Text style={styles.value}>
          {profile.email}
        </Text>

        <View style={styles.divider} />

        <Text style={styles.label}>
          CONTACT NUMBER
        </Text>

        <Text style={styles.value}>
          {profile.contact_number}
        </Text>

        <View style={styles.divider} />

        <Text style={styles.label}>
          ADDRESS
        </Text>

        <Text style={styles.value}>
          {profile.address}
        </Text>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },

  content: {
    padding: 24,
    paddingBottom: 40,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginTop: 20,
  },

  subtitle: {
    fontSize: 14,
    color: '#888888',
    marginTop: 5,
    marginBottom: 24,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },

  label: {
    fontSize: 11,
    fontWeight: '600',
    color: '#888888',
    letterSpacing: 0.5,
    marginBottom: 6,
  },

  value: {
    fontSize: 16,
    color: '#222222',
  },

  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 18,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F8FA',
  },

  loadingText: {
    marginTop: 10,
    color: '#888888',
  },
});