import * as Yup from "yup";

export const SignInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        'Email must be in a valid format (e.g., user@domain.com)'
    )
    .max(254, 'Email must not exceed 254 characters')
    .required("Email is required"),
    
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .max(64, 'Password must not exceed 64 characters')
    .required("Password is required"),
});

export const SignUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)*[a-zA-Z]$/, 'Only letters are allowed and must not end with a space')
    .min(2, 'First name must be at least 2 characters')
    .max(16, 'First name must not exceed 16 characters')
    .trim()
    .required('First name is required')
    .test('no-double-spaces', 'Double spaces are not allowed', value => !
      value?.includes('  ')),
  lastName: Yup.string()
    .matches(/^[a-zA-Z]+(\s[a-zA-Z]+)*[a-zA-Z]$/, 'Only letters are allowed and must not end with a space')
    .min(2, 'Last name must be at least 2 characters')
    .max(16, 'Last name must not exceed 16 characters')
    .trim()
    .required('Last name is required')
    .test('no-double-spaces', 'Double spaces are not allowed', value => !
      value?.includes('  ')),
  email: Yup.string()
    .trim()
    .email('Invalid email format')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Email must be in a valid format (e.g., user@domain.com)'
    )
    .max(254, 'Email must not exceed 254 characters')
    .required('Email is required'),
  password: Yup.string()
    .trim()
    .min(6, 'Password must be at least 6 characters')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)/,
      'Password must contain at least one letter and one number'
    )
    .max(64, 'Password must not exceed 64 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .trim()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .max(64, 'Password must not exceed 64 characters')
    .required('Confirm password is required'),
});