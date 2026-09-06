import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

type Props = {
  onLogin: () => void;
};

export default function RegisterScreen({ onLogin }: Props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

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
        Alert.alert("Missing Information", "Please fill in all fields.");
        return;
    }

    if (password !== confirmPassword) {
        Alert.alert("Password Error", "Passwords do not match.");
        return;
    }

    try {
        const response = await fetch(
        "http://192.168.1.21:8000/api/citizen/register/",
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
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
        }
        );

        const data = await response.json();

        if (response.ok) {
        Alert.alert(
            "Registration Successful",
            "Your InfraTrack account has been created.",
            [
            {
                text: "OK",
                onPress: onLogin,
            },
            ]
        );
        } else {
        let errorMessage = "Registration failed.";

        if (data.username) {
            errorMessage = data.username[0];
        } else if (data.email) {
            errorMessage = data.email[0];
        } else if (data.confirm_password) {
            errorMessage = data.confirm_password[0];
        }

        Alert.alert("Registration Failed", errorMessage);
        }
    } catch (error) {
        console.log(error);

        Alert.alert(
        "Connection Error",
        "Unable to connect to the InfraTrack server."
        );
    }
    };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.logo}>InfraTrack</Text>

        <Text style={styles.title}>Create Account</Text>

        <Text style={styles.subtitle}>
          Register as a Citizen
        </Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>First Namse</Text>

        <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="#999"
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="sentences"
        />
        <Text style={styles.label}>Last Name</Text>

        <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="#999"
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="sentences"
        />

        <Text style={styles.label}>Username</Text>

        <TextInput
          style={styles.input}
          placeholder="Choose a username"
          placeholderTextColor="#999"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Email</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Contact Number</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your contact number"
          placeholderTextColor="#999"
          value={contactNumber}
          onChangeText={setContactNumber}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Address</Text>

        <TextInput
          style={[styles.input, styles.addressInput]}
          placeholder="Enter your address"
          placeholderTextColor="#999"
          value={address}
          onChangeText={setAddress}
          multiline
        />

        <Text style={styles.label}>Password</Text>

        <TextInput
          style={styles.input}
          placeholder="Create a password"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={styles.label}>Confirm Password</Text>

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
        >
          <Text style={styles.registerButtonText}>
            Create Account
          </Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>
            Already have an account?
          </Text>

          <TouchableOpacity onPress={onLogin}>
            <Text style={styles.loginLink}> Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 25,
    paddingVertical: 40,
  },

  header: {
    alignItems: 'center',
    marginBottom: 30,
  },

  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#008080',
    marginBottom: 25,
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
    marginBottom: 18,
    color: '#222222',
  },

  addressInput: {
    height: 80,
    paddingTop: 14,
    textAlignVertical: 'top',
  },

  registerButton: {
    height: 50,
    backgroundColor: '#008080',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },

  registerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },

  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 22,
  },

  loginText: {
    color: '#777777',
    fontSize: 14,
  },

  loginLink: {
    color: '#008080',
    fontSize: 14,
    fontWeight: 'bold',
  },
});