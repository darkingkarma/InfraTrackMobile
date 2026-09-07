import { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

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
      <Image
        source={require('../../assets/background2.jpg')}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <View style={styles.overlay} />

      <View style={styles.content}>
        <Image
          source={require('../../assets/infralogo.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />

        <Text style={styles.logo}>InfraTrack</Text>

        <Text style={styles.subtitle}>
          GIS-Enabled Infrastructure{'\n'}Issue Reporting and Monitoring{'\n'}
          System for DPWH Iligan City
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A1E3C',
  },

  backgroundImage: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },

  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(10, 30, 60, 0.35)',
  },

  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },

  logoImage: {
    width: 130,
    height: 130,
    marginBottom: 24,
  },

  logo: {
    fontSize: 34,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 18,
  },

  subtitle: {
    fontSize: 14,
    color: '#E0E6F0',
    textAlign: 'center',
    lineHeight: 20,
  },
});