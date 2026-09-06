import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  onFinish: () => void;
};

export default function SplashScreen({ onFinish }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>InfraTrack</Text>

      <Text style={styles.subtitle}>
        Infrastructure Issue Reporting
      </Text>

      <Text style={styles.tagline}>
        Report. Track. Improve.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#008080',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },

  logo: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },

  tagline: {
    fontSize: 14,
    color: '#E0F2F1',
  },
});