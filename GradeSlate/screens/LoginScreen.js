import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
import { globalStyles } from '../Styles';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://192.168.1.228:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          s_number: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigation.navigate('Loading', { grades: data.grades }); // Pass grades to LoadingScreen
      } else {
        Alert.alert('Error', data.error || 'Failed to fetch grades.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <Image
        source={require('../assets/GradeSlate-Icon.png')}
        style={globalStyles.icon}
        fadeDuration={500}
      />
      <Text style={globalStyles.title}>Login</Text>
      <TextInput
        style={globalStyles.input}
        placeholder="Username"
        placeholderTextColor="#888" // Light gray placeholder
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={globalStyles.input}
        placeholder="Password"
        placeholderTextColor="#888" // Light gray placeholder
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="#4A90E2" />
      ) : (
        <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
          <Text style={globalStyles.buttonText}>Login</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default LoginScreen;