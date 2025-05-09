import { StyleSheet } from 'react-native';

const stylesContact = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',

  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#177581',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    padding: 16,
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#177581',
    marginBottom: 10,
  },
  contactContainer: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  contactItem: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  contactInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingBottom: 12,

  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#177581',
  },
  contactRelationship: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  contactDetails: {
    gap: 8,
  },
  contactDetail: {
    fontSize: 15,
    color: '#333333',
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    padding: 8,
    marginLeft: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#888888',
    textAlign: 'center',
  },
  footer: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  addButton: {
    backgroundColor: '#177581',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default stylesContact; 