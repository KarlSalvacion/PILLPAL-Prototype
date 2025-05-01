import { StyleSheet } from "react-native";

const stylesSignIn = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#177581',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
  },
  button: {
    backgroundColor: '#177581',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },    
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#177581',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },

  passwordContainer: {
    width: '100%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },

  eyeIcon: {
    padding: 12,
  },

  passwordInput: {
    flex: 1,
    padding: 12,
    fontSize: 16,
  },

});

export default stylesSignIn;