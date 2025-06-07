import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import withThemeHeader from '../hoc/WithThemeHeader';

const ConfirmEmailScreen = () => {
  const { theme } = useTheme();
  const [code, setCode] = useState('');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
            <Image source={require('../../assets/email-confirmation.png')} style={styles.image} />
            <Text style={[styles.title, { color: theme.text }]}>Check Your Email</Text>
            <Text style={[styles.subtitle, { color: theme.placeholder }]}>We've sent a 6-digit verification code to your email. Enter the code below to verify your account.</Text>

            <TextInput
              style={[styles.input, { color: theme.text, backgroundColor: theme.inputBg, borderColor: theme.inputBorder }]}
              placeholder="Enter 6-digit code"
              placeholderTextColor={theme.placeholder}
              keyboardType="numeric"
              maxLength={6}
              value={code}
              onChangeText={setCode}
            />
            <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]}>
            <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.resendLink}>
              <Text style={[styles.resendText, { color: theme.primary }]}>Resend email</Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default withThemeHeader(ConfirmEmailScreen, 'Confirm Email');

const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingBottom: 40,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    maxWidth: 300,
    lineHeight: 22,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  resendLink: {
    marginTop: 10,
  },
  resendText: {
    fontSize: 14,
    fontWeight: '500',
  },
  button: {
  marginTop: 12,
  paddingVertical: 14,
  borderRadius: 10,
  alignItems: 'center',
  width: '60%',
},
buttonText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '600',
},

});
