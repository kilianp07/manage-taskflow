import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function SettingsScreen() {
  const envVars = {
    'App Name': process.env.EXPO_PUBLIC_APP_NAME,
    'App Version': process.env.EXPO_PUBLIC_APP_VERSION,
    'Environment': process.env.EXPO_PUBLIC_ENVIRONMENT,
    'API URL': process.env.EXPO_PUBLIC_API_URL,
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Environment Information</Text>
        {Object.entries(envVars).map(([key, value], index) => (
          <View key={`env-${key}-${index}`} style={styles.row}>
            <Text style={styles.label}>{key}</Text>
            <Text style={styles.value}>{value}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.description}>
          This task management app helps you stay organized and productive.
          Built with Expo and React Native.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginVertical: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  label: {
    fontSize: 16,
    color: '#3A3A3C',
  },
  value: {
    fontSize: 16,
    color: '#8E8E93',
  },
  description: {
    fontSize: 16,
    color: '#3A3A3C',
    lineHeight: 24,
  },
});