import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';

const HomeScreen = ({ navigation }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <View style={[styles.iconCircle, { backgroundColor: theme.inputBg }]}>
            <FontAwesome5 name="piggy-bank" size={28} color={theme.primary} />
          </View>
          <Text style={[styles.title, { color: theme.text }]}>Welcome to Koborack</Text>
          <Text style={[styles.subtitle, { color: theme.placeholder }]}>Save small. Achieve big. Start your savings journey, join groups, and invest smart.</Text>
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          {features.map((feature, index) => (
            <View key={index} style={[styles.featureCard, { backgroundColor: theme.inputBg }]}>
              <FontAwesome5 name={feature.icon} size={20} color={theme.primary} />
              <Text style={[styles.featureText, { color: theme.text }]}>{feature.label}</Text>
            </View>
          ))}
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.primary }]}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.outlineButton, { borderColor: theme.primary }]}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={[styles.buttonText, { color: theme.primary }]}>Log In</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
};

import withThemeHeader from '../hoc/WithThemeHeader';
export default withThemeHeader(HomeScreen, 'Home');

const features = [
  { label: 'Smart Wallet', icon: 'wallet' },
  { label: 'Goal Saving', icon: 'bullseye' },
  { label: 'Savings Groups', icon: 'users' },
  { label: 'Micro-Investments', icon: 'chart-line' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 24,
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    maxWidth: 300,
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  featureCard: {
    width: '47%',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 6,
    elevation: 2,
  },
  featureText: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: '500',
  },
  actionsContainer: {
    marginBottom: 40,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});
