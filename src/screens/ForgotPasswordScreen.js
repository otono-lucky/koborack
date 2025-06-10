import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import withThemeHeader from '../hoc/WithThemeHeader';
import { useForgotPasswordMutation } from '../api/apiSlice';

const ForgotPasswordScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');

  const [ ForgotPassword, {isLoading} ] = useForgotPasswordMutation();


  const handleForgotPassword = async () => {
     
      if (!email) {
        Alert.alert('Email is required, please provide your email');
        return;
      }
  
      try {
        const result = await ForgotPassword({ email }).unwrap();
        console.log('✅ Password Link sent:', result);
        Alert.alert('Success', result.message || 'Password link sent, please check your email');
      } catch (error) {
        console.error('❌ Failed to send password link:', error);
        Alert.alert('Password Link failed:', error?.data?.message || 'Failed to send password link:');
      }
    };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
            <Image source={require('../../assets/forgot-password.png')} style={styles.image} />
            <Text style={[styles.title, { color: theme.text }]}>Forgot Password</Text>
            <Text style={[styles.subtitle, { color: theme.placeholder }]}>Enter your email address to receive password reset instructions.</Text>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.text }]}>Email</Text>
              <View style={[styles.inputWrapper, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder }]}>
                <TextInput
                  style={[styles.input, { color: theme.text }]}
                  placeholder="Enter your email"
                  placeholderTextColor={theme.placeholder}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
                <FontAwesome5 name="envelope" size={16} color={theme.placeholder} style={styles.inputIcon} />
              </View>
            </View>

            <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]} onPress={() => handleForgotPassword()}>
              <Text style={styles.buttonText}>Send Reset Link</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.backToLogin} onPress={() => navigation.navigate('Login')}>
              <Text style={[styles.backToLoginText, { color: theme.primary }]}> 
                <FontAwesome5 name="arrow-left" size={12} color={theme.primary} /> Back to Login
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'contain',
    marginBottom: 20,
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
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 14,
  },
  inputIcon: {
    marginLeft: 8,
  },
  button: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  backToLogin: {
    marginTop: 20,
    alignItems: 'center',
  },
  backToLoginText: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default withThemeHeader(ForgotPasswordScreen, "ForgotPassword");
