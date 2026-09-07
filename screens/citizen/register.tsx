import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import { API_URL } from '../../services/api';

type Props = {
  onLogin: () => void;
};

export default function RegisterScreen({ onLogin }: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (
      !firstName ||
      !lastName ||
      !username ||
      !email ||
      !contactNumber ||
      !address ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert('Missing Information', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Error', 'Passwords do not match.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/api/citizen/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          username: username,
          email: email,
          contact_number: contactNumber,
          address: address,
          password: password,
          confirm_password: confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert(
          'Registration Successful',
          'Your InfraTrack account has been created.',
          [
            {
              text: 'OK',
              onPress: onLogin,
            },
          ]
        );
      } else {
        console.log('Registration error:', data);

        Alert.alert('Registration Failed', JSON.stringify(data, null, 2));
      }
    } catch (error) {
      console.log(error);

      Alert.alert(
        'Connection Error',
        'Unable to connect to the InfraTrack server.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      {/* Header with background image */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/background.jpg')}
          style={styles.headerImage}
          resizeMode="cover"
        />
        <View style={styles.headerOverlay} />

        <View style={styles.headerContent}>
          <Text style={styles.headerTag}>DPWH  •  ILIGAN CITY</Text>

          <Text style={styles.logo}>InfraTrack</Text>

          <Text style={styles.headerSubtitle}>
            Create an account to start reporting infrastructure issues.
          </Text>
        </View>
      </View>

      {/* Form card */}
      <View style={styles.card}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Register as a Citizen</Text>

        <Text style={styles.label}>FIRST NAME</Text>
        <TextInput
          style={styles.input}
          placeholder="First Name"
          placeholderTextColor="#999"
          value={firstName}
          onChangeText={setFirstName}
          autoCapitalize="sentences"
        />

        <Text style={styles.label}>LAST NAME</Text>
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          placeholderTextColor="#999"
          value={lastName}
          onChangeText={setLastName}
          autoCapitalize="sentences"
        />

        <Text style={styles.label}>USERNAME</Text>
        <TextInput
          style={styles.input}
          placeholder="Choose a username"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <Text style={styles.label}>EMAIL</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>CONTACT NUMBER</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your contact number"
          placeholderTextColor="#999"
          value={contactNumber}
          onChangeText={setContactNumber}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>ADDRESS</Text>
        <TextInput
          style={[styles.input, styles.addressInput]}
          placeholder="Enter your address"
          placeholderTextColor="#999"
          value={address}
          onChangeText={setAddress}
          multiline
        />

        <Text style={styles.label}>PASSWORD</Text>
        <TextInput
          style={styles.input}
          placeholder="Create a password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={styles.label}>CONFIRM PASSWORD</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm your password"
          placeholderTextColor="#999"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
          disabled={loading}
        >
          <Text style={styles.registerButtonText}>
            {loading ? 'Creating account...' : 'Create Account'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.orText}>or</Text>

        <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
          <Text style={styles.loginButtonText}>Log In Instead</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Your reports help DPWH prioritize safer roads, bridges, and drainage.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  scrollContent: {
    flexGrow: 1,
  },

  header: {
    height: 210,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },

  headerImage: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },

  headerOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(10, 30, 60, 0.55)',
  },

  headerContent: {
    paddingHorizontal: 25,
    paddingBottom: 55,
  },

  headerTag: {
    color: '#E0E6F0',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 8,
  },

  logo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },

  headerSubtitle: {
    fontSize: 13,
    color: '#DCE3EE',
    lineHeight: 18,
  },

  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: -20,
    paddingHorizontal: 25,
    paddingTop: 28,
    paddingBottom: 24,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 15,
    color: '#8A8A8A',
    marginBottom: 24,
  },

  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#555555',
    letterSpacing: 0.3,
    marginBottom: 8,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 15,
    marginBottom: 18,
    color: '#222222',
    backgroundColor: '#FAFAFA',
  },

  addressInput: {
    height: 80,
    paddingTop: 14,
    textAlignVertical: 'top',
  },

  registerButton: {
    height: 52,
    backgroundColor: '#1A56DB',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  orText: {
    textAlign: 'center',
    color: '#999999',
    fontSize: 13,
    marginVertical: 16,
  },

  loginButton: {
    height: 52,
    backgroundColor: '#1A56DB',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },

  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  footerText: {
    textAlign: 'center',
    color: '#999999',
    fontSize: 12,
    lineHeight: 18,
    marginTop: 22,
  },
});