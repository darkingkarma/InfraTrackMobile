import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = {
  onReportIssue: () => void;
  firstName: string;
};

export default function HomeScreen({ onReportIssue, firstName,}: Props) {
  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View>
            <Text style={styles.greeting}>
                Hello, {firstName}! 👋
            </Text>
          <Text style={styles.subtitle}>
            Help improve your community
          </Text>
        </View>

        <View style={styles.profileCircle}>
          <Text style={styles.profileText}>C</Text>
        </View>
      </View>

      {/* Main Report Card */}
      <View style={styles.reportCard}>
        <Text style={styles.cardTitle}>
          See an infrastructure problem?
        </Text>

        <Text style={styles.cardDescription}>
          Report roads, bridges, drainage, and other
          infrastructure issues in your area.
        </Text>

        <TouchableOpacity
          style={styles.reportButton}
          onPress={onReportIssue}
        >
          <Text style={styles.reportButtonText}>
            + Report an Issue
          </Text>
        </TouchableOpacity>
      </View>

      {/* Quick Access */}
      <Text style={styles.sectionTitle}>Quick Access</Text>

      <View style={styles.quickContainer}>

        <TouchableOpacity style={styles.quickCard}>
          <Text style={styles.quickIcon}>📋</Text>
          <Text style={styles.quickTitle}>My Reports</Text>
          <Text style={styles.quickDescription}>
            View your submitted reports
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.quickCard}>
          <Text style={styles.quickIcon}>🔔</Text>
          <Text style={styles.quickTitle}>Notifications</Text>
          <Text style={styles.quickDescription}>
            Check report updates
          </Text>
        </TouchableOpacity>

      </View>

      {/* Recent Reports */}
      <Text style={styles.sectionTitle}>Recent Reports</Text>

      <View style={styles.emptyCard}>
        <Text style={styles.emptyTitle}>
          No reports yet
        </Text>

        <Text style={styles.emptyText}>
          Your submitted infrastructure reports will
          appear here.
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9F9',
    paddingHorizontal: 20,
    paddingTop: 55,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },

  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#222222',
  },

  subtitle: {
    fontSize: 14,
    color: '#777777',
    marginTop: 5,
  },

  profileCircle: {
    width: 45,
    height: 45,
    borderRadius: 23,
    backgroundColor: '#008080',
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },

  reportCard: {
    backgroundColor: '#008080',
    borderRadius: 15,
    padding: 22,
    marginBottom: 25,
  },

  cardTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  cardDescription: {
    color: '#E0F2F1',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 20,
  },

  reportButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },

  reportButtonText: {
    color: '#008080',
    fontSize: 15,
    fontWeight: 'bold',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 12,
  },

  quickContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 25,
  },

  quickCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },

  quickIcon: {
    fontSize: 25,
    marginBottom: 8,
  },

  quickTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },

  quickDescription: {
    fontSize: 12,
    color: '#888888',
    lineHeight: 17,
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },

  emptyTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#444444',
    marginBottom: 5,
  },

  emptyText: {
    fontSize: 13,
    color: '#888888',
    lineHeight: 19,
  },
});