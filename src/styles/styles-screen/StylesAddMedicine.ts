import { StyleSheet } from 'react-native';

const stylesAddMedicine = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: 'fff',
    width: '100%',
    height: 60,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#177581',
    alignSelf: 'center',
    textAlign: 'center',
  },
  inputGroup: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#177581',
    flex: 1,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#177581',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginTop: 8,
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
    justifyContent: 'center',
  },
  dosageInput: {
    flex: 1,
    marginRight: 8,
  },
  unitButton: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
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
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  toggleButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 5,
  },
  toggleButtonActive: {
    backgroundColor: '#177581',
  },
  toggleButtonText: {
    color: '#666',
    fontSize: 16,
  },
  toggleButtonTextActive: {
    color: '#fff',
  },
  addMedicineButton: {
    backgroundColor: '#177581',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,

    marginHorizontal: 16,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  addQuantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#177581',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#177581',
    marginTop: 8,
  },

  minusQuantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#177581',
    marginTop: 8,
  },

  quantityInput: {
    flex: 1,
    marginHorizontal: 8,
    textAlign: 'center',
  },
});

export default stylesAddMedicine; 