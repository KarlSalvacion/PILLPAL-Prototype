import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Formik } from 'formik';
import { useAuth } from '../context/AuthContext';
import stylesSignUp from '../styles/styles-screen/StylesSignUpScreen';
import { Ionicons } from '@expo/vector-icons';
import { SignUpSchema } from '../validations/ValidationSchema';

const SignUpScreen = ({ navigation }: any) => {
  const { signUp } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: '#fff' }}
    >
      <ScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View style={stylesSignUp.container}>
          <Text style={stylesSignUp.title}>Create Account</Text>
          
          <Formik
            initialValues={{ firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={SignUpSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const fullName = `${values.firstName} ${values.lastName}`;
                await signUp(values.email, values.password, fullName);
                Alert.alert(
                  'Account Created',
                  'Your account has been created successfully! Please sign in.',
                  [{ text: 'OK', onPress: () => navigation.navigate('SignIn') }]
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
                  <Text style={stylesSignUp.label}>First Name</Text>
                  <TextInput
                    style={stylesSignUp.input}
                    placeholder="Enter your first name"
                    value={values.firstName}
                    onChangeText={handleChange('firstName')}
                    onBlur={handleBlur('firstName')}
                    autoCapitalize="words"
                    autoComplete="name-given"
                    returnKeyType="next"
                  />
                  {touched.firstName && errors.firstName && (
                    <Text style={stylesSignUp.errorText}>{errors.firstName}</Text>
                  )}
                </View>

                <View style={stylesSignUp.inputGroup}>
                  <Text style={stylesSignUp.label}>Last Name</Text>
                  <TextInput
                    style={stylesSignUp.input}
                    placeholder="Enter your last name"
                    value={values.lastName}
                    onChangeText={handleChange('lastName')}
                    onBlur={handleBlur('lastName')}
                    autoCapitalize="words"
                    autoComplete="name-family"
                    returnKeyType="next"
                  />
                  {touched.lastName && errors.lastName && (
                    <Text style={stylesSignUp.errorText}>{errors.lastName}</Text>
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