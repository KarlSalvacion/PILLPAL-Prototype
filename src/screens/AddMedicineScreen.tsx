import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextInput } from 'react-native-paper';
import { useMedicine } from '../context/MedicineContext';
import stylesAddMedicine from '../styles/styles-screen/StylesAddMedicine';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Medicine name is required')
    .min(2, 'Medicine name must be at least 2 characters'),
  dosage: Yup.string()
    .required('Dosage amount is required')
    .matches(/^\d+(\.\d+)?$/, 'Dosage must be a valid number'),
  intakeMode: Yup.string()
    .required('Mode of intake is required')
    .oneOf(['oral', 'injection', 'topical'], 'Invalid mode of intake'),
  intakeTime: Yup.string()
    .required('Time of intake is required')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Time must be in HH:MM format'),
});

const AddMedicineScreen = ({ navigation }: any) => {
  const { addMedicine } = useMedicine();

  const handleSubmit = async (values: any) => {
    try {
      await addMedicine(values);
      navigation.goBack();
    } catch (error) {
      console.error('Error adding medicine:', error);
    }
  };

  return (
    <View style={stylesAddMedicine.container}>
      <Text style={stylesAddMedicine.title}>Add New Medicine</Text>
      <Formik
        initialValues={{
          name: '',
          dosage: '',
          intakeMode: '',
          intakeTime: '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
              style={stylesAddMedicine.input}
              label="Medicine Name"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
              mode="outlined"
            />
            {touched.name && errors.name && (
              <Text style={stylesAddMedicine.error}>{errors.name}</Text>
            )}

            <TextInput
              style={stylesAddMedicine.input}
              label="Dosage Amount"
              onChangeText={handleChange('dosage')}
              onBlur={handleBlur('dosage')}
              value={values.dosage}
              keyboardType="numeric"
              mode="outlined"
            />
            {touched.dosage && errors.dosage && (
              <Text style={stylesAddMedicine.error}>{errors.dosage}</Text>
            )}

            <TextInput
              style={stylesAddMedicine.input}
              label="Mode of Intake (oral/injection/topical)"
              onChangeText={handleChange('intakeMode')}
              onBlur={handleBlur('intakeMode')}
              value={values.intakeMode}
              mode="outlined"
            />
            {touched.intakeMode && errors.intakeMode && (
              <Text style={stylesAddMedicine.error}>{errors.intakeMode}</Text>
            )}

            <TextInput
              style={stylesAddMedicine.input}
              label="Time of Intake (HH:MM)"
              onChangeText={handleChange('intakeTime')}
              onBlur={handleBlur('intakeTime')}
              value={values.intakeTime}
              mode="outlined"
            />
            {touched.intakeTime && errors.intakeTime && (
              <Text style={stylesAddMedicine.error}>{errors.intakeTime}</Text>
            )}

            <TouchableOpacity
              style={stylesAddMedicine.button}
              onPress={() => handleSubmit()}
            >
              <Text style={stylesAddMedicine.buttonText}>Add Medicine</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>
    </View>
  );
};

export default AddMedicineScreen; 