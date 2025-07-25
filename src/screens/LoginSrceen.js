import React, { use, useState } from 'react';
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
  ActivityIndicator,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import withThemeHeader from '../hoc/WithThemeHeader';
import { useLoginMutation } from '../api/authApi';
import { decodeUserToken, saveToken } from '../utils/token';

const LoginScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [ login, { isLoading } ] = useLoginMutation();

  const handleLogin = async () => {
    // if (!email || !password){
    //   Alert.alert("Please enter both your email and password")
    //   return;
    // }

    // try {
    //   const result = await login({email, password}).unwrap();
      
    //   const token = result.data
      
    //   if (!token) {
    //     Alert.alert('Login failed', 'No token received. Please check your credentials.');
    //     return;
    //   }
      
    //   await saveToken(token);
    //   console.log('Token saved successfully', token);

    //   const userInfo = decodeUserToken(token);
      
    //   if (!userInfo) {
    //     Alert.alert('Login failed', 'Invalid user information received.');
    //   }
    //   const userId = userInfo.userId
      
    //   if (!userId) {
    //     Alert.alert('Login failed', 'User ID not found in token.');
    //   }

    //   console.log('Login successful', result)
    //   console.log('User ID', userId)
    //   Alert.alert('succeeded', result.message || 'Login successful')
    
    // navigation.navigate('Dashboard', { id: userId });
    
    // } catch (error) {
      //   console.error('Login failed:', error)
      //   Alert.alert('Login failed', error?.data?.message)
      // }
      navigation.navigate('Dashboard');
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
            <Image source={require('../../assets/signup-illustration.png')} style={styles.image} />
            <Text style={[styles.title, { color: theme.text }]}>Welcome Back</Text>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.text }]}>Email</Text>
              <View style={[styles.inputWrapper, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder }]}>
                <TextInput
                  style={[styles.input, { color: theme.text }]}
                  placeholder="Enter email"
                  placeholderTextColor={theme.placeholder}
                  keyboardType="email-address"
                  value={email}
                  onChangeText={setEmail}
                />
                <FontAwesome5 name="envelope" size={16} color={theme.placeholder} style={styles.inputIcon} />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: theme.text }]}>Password</Text>
              <View style={[styles.inputWrapper, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder }]}>
                <TextInput
                  style={[styles.input, { color: theme.text }]}
                  placeholder="Enter password"
                  placeholderTextColor={theme.placeholder}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <FontAwesome5
                    name={showPassword ? 'eye' : 'eye-slash'}
                    size={16}
                    color={theme.placeholder}
                    style={styles.inputIcon}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity style={styles.forgotPassword} onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={[styles.forgotPasswordText, { color: theme.primary }]}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]} onPress={() => handleLogin()} disabled={isLoading}>
              <Text style={styles.buttonText}>{isLoading ? <ActivityIndicator size="small" color="#fff" style={{marginVertical: 2}} /> : "Log In"} </Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: theme.placeholder }]}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={[styles.footerLink, { color: theme.primary }]}> Sign up</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default withThemeHeader(LoginScreen, 'Login');

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
    marginBottom: 20,
    textAlign: 'center',
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  forgotPasswordText: {
    fontSize: 13,
    fontWeight: '500',
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
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
  },
  footerLink: {
    fontSize: 14,
    fontWeight: '500',
  },
});
