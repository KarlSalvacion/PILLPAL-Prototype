import React from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useContacts } from '../context/ContactContext';
import stylesAddContact from '../styles/styles-screen/StylesAddContactScreen';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  relationship: Yup.string()
    .required('Relationship is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required')
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      'Invalid email format'
    ),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(/^[0-9]+$/, 'Phone number must contain only digits')
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must not exceed 15 digits'),
});

const AddContactScreen = ({ navigation }: any) => {
  const { addContact } = useContacts();

  const handleSubmit = async (values: any) => {
    try {
      await addContact(values);
      navigation.goBack();
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  return (
    <View style={stylesAddContact.container}>
      <View style={stylesAddContact.header}>
        <Pressable onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#177581" />
        </Pressable>
        <Text style={stylesAddContact.headerTitle}>Add Emergency Contact</Text>
      </View>
      <Formik
        initialValues={{ name: '', relationship: '', email: '', phone: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <ScrollView style={stylesAddContact.content}>
              <View style={stylesAddContact.formGroup}>
                <Text style={stylesAddContact.label}>Name</Text>
                <TextInput
                  style={[
                    stylesAddContact.input,
                    touched.name && errors.name && stylesAddContact.inputError
                  ]}
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  placeholder="Enter full name"
                />
                {touched.name && errors.name && (
                  <Text style={stylesAddContact.errorText}>{errors.name}</Text>
                )}
              </View>
              <View style={stylesAddContact.formGroup}>
                <Text style={stylesAddContact.label}>Relationship</Text>
                <TextInput
                  style={[
                    stylesAddContact.input,
                    touched.relationship && errors.relationship && stylesAddContact.inputError
                  ]}
                  value={values.relationship}
                  onChangeText={handleChange('relationship')}
                  onBlur={handleBlur('relationship')}
                  placeholder="e.g. Spouse, Parent, Friend"
                />
                {touched.relationship && errors.relationship && (
                  <Text style={stylesAddContact.errorText}>{errors.relationship}</Text>
                )}
              </View>
              <View style={stylesAddContact.formGroup}>
                <Text style={stylesAddContact.label}>Email</Text>
                <TextInput
                  style={[
                    stylesAddContact.input,
                    touched.email && errors.email && stylesAddContact.inputError
                  ]}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  placeholder="Enter email address"
                  keyboardType="email-address"
                />
                {touched.email && errors.email && (
                  <Text style={stylesAddContact.errorText}>{errors.email}</Text>
                )}
              </View>
              <View style={stylesAddContact.formGroup}>
                <Text style={stylesAddContact.label}>Phone Number</Text>
                <TextInput
                  style={[
                    stylesAddContact.input,
                    touched.phone && errors.phone && stylesAddContact.inputError
                  ]}
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  placeholder="Enter phone number"
                  keyboardType="phone-pad"
                />
                {touched.phone && errors.phone && (
                  <Text style={stylesAddContact.errorText}>{errors.phone}</Text>
                )}
              </View>
            </ScrollView>
            <View style={stylesAddContact.footer}>
              <Pressable 
                style={stylesAddContact.submitButton} 
                onPress={() => handleSubmit()}
              >
                <Text style={stylesAddContact.submitButtonText}>Add Contact</Text>
              </Pressable>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

export default AddContactScreen; 