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
import { useSignUpMutation } from '../api/apiSlice';

const RegisterScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [ signUp, {isLoading}] = useSignUpMutation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showRequiredFieldMessage, setShowRequiredFieldMessage] = useState(false);
  const [showPasswordMismatchMessage, setPasswordMismatchMessage] = useState(false);

  const handleChange = (name, value) => {
    setForm({ ...form, [name]: value });
  };
  
  const iconMap = {
    firstname: 'user',
    lastname: 'user',
    email: 'envelope',
    phone: 'phone',
    password: 'lock',
    confirmPassword: 'lock',
  };
  const handleSignUp = async (form) => {
    try {
      console.log('starting request...')
      console.log('firstname: ', form.firstname)
      console.log('lastname: ', form.lastname)
      console.log('phone: ', form.phone)
      console.log('email: ', form.email)
      console.log('Password: ', form.password)
      console.log('confirm password: ', form.confirmPassword)
      if (!form.firstname || !form.lastname || !form.email || !form.password || !form.phone || !form.confirmPassword) {
        setShowRequiredFieldMessage(true);
        Alert.alert("All fields are required");
        return; // stop execution if required fields are missing
      }

      if (form.confirmPassword !== form.password) {
        setPasswordMismatchMessage(true)
        Alert.alert("Confirm Password does not match Password");
        return;
      }

      setPasswordMismatchMessage(false)
      const newUser = {...form, phoneNumber: form.phone}
      const result = await signUp(newUser).unwrap();
      Alert.alert('Success', result.message)
      console.log(result)
      navigation.navigate('ConfirmEmail', {id: result.data.id})

    } catch (err) {
      console.log('Signup error', err)
       Alert.alert('Registration failed', err?.data?.message);
    }
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.content}>
            <Image source={require('../../assets/signup-illustration.png')} style={styles.image} />
            <Text style={[styles.title, { color: theme.text }]}>Create an Account</Text>

            {['firstname', 'lastname', 'email', 'phone', 'password', 'confirmPassword'].map((field, index) => {
              const isPasswordField = field.toLowerCase().includes('password');
              const show = field === 'password' ? showPassword : showConfirmPassword;
              const toggle = field === 'password' ? () => setShowPassword(!showPassword) : () => setShowConfirmPassword(!showConfirmPassword);

              return (
                <View key={index} style={styles.inputGroup}>
                  <Text style={[styles.label, { color: theme.text }]}> {
                    field === 'confirmPassword' ? 'Confirm Password' : field.charAt(0).toUpperCase() + field.slice(1)
                  }</Text>
                  <View style={[styles.inputWrapper, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder }]}>
                    <TextInput
                      style={[styles.input, { color: theme.text }]}
                      placeholder={`Enter ${field === 'confirmPassword' ? 'password again' : field}`}
                      placeholderTextColor={theme.placeholder}
                      secureTextEntry={isPasswordField && !show}
                      keyboardType={field === 'email' ? 'email-address' : field === 'phone' ? 'phone-pad' : 'default'}
                      value={form[field]}
                      onChangeText={(text) => handleChange(field, text)}
                    />
                    {isPasswordField ? (
                      <TouchableOpacity onPress={toggle}>
                        <FontAwesome5
                          name={show ? 'eye' : 'eye-slash'}
                          size={16}
                          color={theme.placeholder}
                          style={styles.inputIcon}
                        />
                      </TouchableOpacity>
                    ) : (
                      <FontAwesome5 name={iconMap[field]} size={16} color={theme.placeholder} style={styles.inputIcon} />
                    )}
                  </View>
                  {showRequiredFieldMessage && !form[field] ? 
                  <Text style={{color: 'red'}}>{field === 'confirmPassword' ? 'Confirm Password' : field.charAt(0).toUpperCase() + field.slice(1)} is required</Text> 
                  : showPasswordMismatchMessage && field === 'confirmPassword' ? 
                  <Text style={{color: 'red'}}>Confirm password does not match password</Text> 
                  : null}
                </View>
              );
            })}

            <TouchableOpacity style={[styles.button, { backgroundColor: theme.primary }]} onPress={() => handleSignUp(form)}>
              <Text style={styles.buttonText}>{!isLoading ? "Sign Up" : "Loading..."}</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={[styles.footerText, { color: theme.placeholder }]}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={[styles.footerLink, { color: theme.primary }]}> Log in</Text>
              </TouchableOpacity>
            </View>
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

export default withThemeHeader(RegisterScreen, 'Register');