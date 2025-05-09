import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../context/AuthContext';
import stylesSignUp from '../styles/styles-screen/StylesSignUpScreen';
import { Ionicons } from '@expo/vector-icons';

const SignUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name must be at least 2 characters')
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Email must be in a valid format (e.g., user@domain.com)'
    )
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)/,
      'Password must contain at least one letter and one number'
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

const SignUpScreen = ({ navigation }: any) => {
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={stylesSignUp.container}>
          <Text style={stylesSignUp.title}>Create Account</Text>
          
          <Formik
            initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={SignUpSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                await signUp(values.email, values.password, values.name);
                Alert.alert(
                  'Account Created',
                  'Your account has been created successfully! Please sign in.',
                  [
                    {
                      text: 'OK',
                      onPress: () => navigation.navigate('SignIn')
                    }
                  ]
                );
              } catch (error) {
                Alert.alert(
                  'Sign Up Failed',
                  error instanceof Error ? error.message : 'Failed to create account',
                  [{ text: 'OK' }]
                );
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
              <>
                <View style={stylesSignUp.inputGroup}>
                  <Text style={stylesSignUp.label}>Username</Text>
                  <TextInput
                    style={stylesSignUp.input}
                    placeholder="Enter your name"
                    value={values.name}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    autoCapitalize="words"
                    autoComplete="name"
                    returnKeyType="next"
                  />
                  {touched.name && errors.name && (
                    <Text style={stylesSignUp.errorText}>{errors.name}</Text>
                  )}
                </View>

                <View style={stylesSignUp.inputGroup}>
                  <Text style={stylesSignUp.label}>Email</Text>
                  <TextInput
                    style={stylesSignUp.input}
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
                    <Text style={stylesSignUp.errorText}>{errors.email}</Text>
                  )}
                </View>

                <View style={stylesSignUp.inputGroup}>
                  <Text style={stylesSignUp.label}>Password</Text>
                  <View style={stylesSignUp.passwordContainer}>
                    <TextInput
                      style={stylesSignUp.passwordInput}
                      placeholder="Enter your password"
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      secureTextEntry={!showPassword}
                      autoComplete="password-new"
                      returnKeyType="next"
                    />
                    <Pressable 
                      style={stylesSignUp.eyeIcon}
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
                    <Text style={stylesSignUp.errorText}>{errors.password}</Text>
                  )}
                </View>

                <View style={stylesSignUp.inputGroup}>
                  <Text style={stylesSignUp.label}>Confirm Password</Text>
                  <View style={stylesSignUp.passwordContainer}>
                    <TextInput
                      style={stylesSignUp.passwordInput}
                      placeholder="Confirm your password"
                      value={values.confirmPassword}
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      secureTextEntry={!showConfirmPassword}
                      autoComplete="password-new"
                      returnKeyType="done"
                    />
                    <Pressable 
                      style={stylesSignUp.eyeIcon}
                      onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      <Ionicons 
                        name={showConfirmPassword ? "eye-off" : "eye"} 
                        size={24} 
                        color="#666" 
                      />
                    </Pressable>
                  </View>
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text style={stylesSignUp.errorText}>{errors.confirmPassword}</Text>
                  )}
                </View>

                <Pressable 
                  style={[stylesSignUp.button, isSubmitting && stylesSignUp.buttonDisabled]} 
                  onPress={() => handleSubmit()}
                  disabled={isSubmitting}
                >
                  <Text style={stylesSignUp.buttonText}>
                    {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                  </Text>
                </Pressable>

                <Pressable onPress={() => navigation.navigate('SignIn')}>
                  <Text style={stylesSignUp.linkText}>Already have an account? Sign In</Text>
                </Pressable>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUpScreen; 