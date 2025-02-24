import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000', // Dark background
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#1E1E1E', // Dark input background
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    color: '#FFFFFF', // White text
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4A90E2', // Vibrant blue
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF', // White text
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  loadingBar: {
    marginTop: 20,
  },
  classHeader: {
    backgroundColor: '#1E1E1E', // Dark header background
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  classHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  className: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF', // White text
  },
  classAverage: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4A90E2', // Vibrant blue
  },
  assignmentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#1E1E1E', // Dark background
    borderRadius: 10,
    marginBottom: 5,
  },
  assignmentName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF', // White text
  },
  assignmentScore: {
    fontSize: 16,
    color: '#4A90E2', // Vibrant blue
  },
});