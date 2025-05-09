import { StyleSheet } from "react-native";

const stylesMedicineScreen = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      header: {
        backgroundColor: '#fff',
        padding: 16,

      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#177581',
        textAlign: 'left',
      },
      
      scrollView: {
        flex: 1,
        padding: 16,
      },
      section: {
        marginBottom: 24,
      },
      sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#177581',
        marginBottom: 16,
      },
      medicineBox: {
        backgroundColor: 'rgb(255, 255, 255)',
        borderRadius: 12,
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

      checkmarkContainer: {
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 1,
      },
      
      medicineHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
      },
      medicineName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#177581',
        marginLeft: 8,
      },
      medicineDetails: {
        marginTop: 8,
      },
      detailText: {
        fontSize: 14,
        color: '#666666',
        marginBottom: 4,
      },
      actionButtons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 12,
        gap: 12,
      },
      checkButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#E6F7F9',
      },
      deleteButton: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#F9E6E6',
      },
      emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        marginBottom: 12,
      },
      emptyStateText: {
        fontSize: 16,
        color: '#666666',
        textAlign: 'center',
      },
      addButton: {
        backgroundColor: '#177581',
        padding: 16,
        borderRadius: 8,
        margin: 16,
        alignItems: 'center',
      },
      addButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
      },
});

export default stylesMedicineScreen;