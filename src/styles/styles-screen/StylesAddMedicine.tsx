import { StyleSheet } from 'react-native';

const stylesAddMedicine = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#177581',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#177581',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#177581',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeInputText: {
    fontSize: 16,
    color: '#177581',
    marginLeft: 8,
  },
  dosageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dosageInput: {
    flex: 1,
    marginRight: 8,
  },
  unitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#177581',
    borderRadius: 8,
    padding: 12,
    minWidth: 80,
  },
  unitButtonText: {
    fontSize: 16,
    color: '#177581',
    marginRight: 8,
  },
  intakeModeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#177581',
    borderRadius: 8,
    padding: 12,
  },
  intakeModeButtonText: {
    fontSize: 16,
    color: '#177581',
  },
  button: {
    backgroundColor: '#177581',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  timePicker: {
    width: '100%',
    marginTop: 8,
  },
  timePickerContainer: {
    marginTop: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
  },
  timeSaveButton: {
    backgroundColor: '#177581',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  timeSaveButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default stylesAddMedicine; 