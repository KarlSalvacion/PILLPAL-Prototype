import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import stylesSignIn from '../styles/styles-screen/StylesSignInScreen';
import { Ionicons } from '@expo/vector-icons';

const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const SignInScreen = ({ navigation }: any) => {
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={stylesSignIn.container}>
          <Text style={stylesSignIn.title}>Welcome Back</Text>
          
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={SignInSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await signIn(values.email, values.password);
              } catch (error) {
                Alert.alert(
                  'Sign In Failed',
                  error instanceof Error ? error.message : 'Invalid email or password',
                  [{ text: 'OK' }]
                );
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
              <>
                <View style={stylesSignIn.inputGroup}>
                  <Text style={stylesSignIn.label}>Email</Text>
                  <TextInput
                    style={stylesSignIn.input}
                    placeholder="Enter your email"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    returnKeyType="next"
                  />
                  {touched.email && errors.email && (
                    <Text style={stylesSignIn.errorText}>{errors.email}</Text>
                  )}
                </View>

                <View style={stylesSignIn.inputGroup}>
                  <Text style={stylesSignIn.label}>Password</Text>
                  <View style={stylesSignIn.passwordContainer}>
                    <TextInput
                      style={stylesSignIn.passwordInput}
                      placeholder="Enter your password"
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      secureTextEntry={!showPassword}
                      autoComplete="password"
                      returnKeyType="done"
                    />
                    <Pressable 
                      style={stylesSignIn.eyeIcon}
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Ionicons 
                        name={showPassword ? "eye-off" : "eye"} 
                        size={24} 
                        color="#666" 
                      />
                    </Pressable>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={stylesSignIn.errorText}>{errors.password}</Text>
                  )}
                </View>

                <Pressable 
                  style={[stylesSignIn.button, isSubmitting && stylesSignIn.buttonDisabled]} 
                  onPress={() => handleSubmit()}
                  disabled={isSubmitting}
                >
                  <Text style={stylesSignIn.buttonText}>
                    {isSubmitting ? 'Signing In...' : 'Sign In'}
                  </Text>
                </Pressable>

                <Pressable onPress={() => navigation.navigate('SignUp')}>
                  <Text style={stylesSignIn.linkText}>Don't have an account? Sign Up</Text>
                </Pressable>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen; 