import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import LoadingScreen from './screens/LoadingScreen';
import GradeScreen from './screens/GradeScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate app loading (e.g., fetching initial data)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2-second delay

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />; // Show LoadingScreen at app start
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }} // Hide header for LoginScreen
        />
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{ headerShown: false }} // Hide header for LoadingScreen
        />
        <Stack.Screen
          name="Grade"
          component={GradeScreen}
          options={{ title: 'Grades' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;