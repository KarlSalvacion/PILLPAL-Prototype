import { StyleSheet } from 'react-native';

const stylesSymptomTracker = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#177581',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#177581',
    marginBottom: 16,
  },
  symptomItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 1,
        borderColor: 'rgba(198, 198, 198, 0.4)',
  },
  symptomHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  symptomName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginLeft: 8,
  },
  symptomDetails: {
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  checkButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#E6F7F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  deleteButton: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F9E6E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: '#177581',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyState: {
    padding: 20,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default stylesSymptomTracker; 