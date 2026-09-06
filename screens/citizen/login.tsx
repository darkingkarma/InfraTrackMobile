import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = {
  onRegister: () => void;
  onLogin: () => void;
};

export default function LoginScreen({
  onRegister,
  onLogin,
}: Props) {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!usernameOrEmail || !password) {
      return;
    }

    onLogin();
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>InfraTrack</Text>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>
          Login to your Citizen account
        </Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Username or Email</Text>

        <TextInput
            style={styles.input}
            placeholder="Enter username or email"
            placeholderTextColor="#999"
            value={usernameOrEmail}
            onChangeText={setUsernameOrEmail}
            autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>
            Don't have an account?
          </Text>

          <TouchableOpacity onPress={onRegister}>
            <Text style={styles.registerLink}> Create Account</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 25,
    justifyContent: 'center',
  },

  header: {
    alignItems: 'center',
    marginBottom: 40,
  },

  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#008080',
    marginBottom: 30,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 15,
    color: '#777777',
  },

  form: {
    width: '100%',
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 8,
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 15,
    marginBottom: 20,
    color: '#222222',
  },

  loginButton: {
    height: 50,
    backgroundColor: '#008080',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },

  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 25,
  },

  registerText: {
    color: '#777777',
    fontSize: 14,
  },

  registerLink: {
    color: '#008080',
    fontSize: 14,
    fontWeight: 'bold',
  },
});