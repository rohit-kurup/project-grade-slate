import React, { useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, ActivityIndicator, Image } from 'react-native';
import { globalStyles } from '../Styles';

const LoadingScreen = ({ navigation, route }) => {
  // Handle cases where route is not available (e.g., at app startup)
  const grades = route?.params?.grades || null;

  useEffect(() => {
    if (grades) {
      // If grades are passed, navigate to GradeScreen after a delay
      const timer = setTimeout(() => {
        navigation.replace('Grade', { grades });
      }, 2000); // 2-second delay

      return () => clearTimeout(timer);
    }
  }, [navigation, grades]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <View style={globalStyles.loadingContent}>
        <Image
          source={require('../assets/GradeSlate-Icon.png')}
          style={globalStyles.icon}
          fadeDuration={500}
        />
        <ActivityIndicator size="large" color="#4A90E2" style={globalStyles.loadingBar} />
      </View>
    </SafeAreaView>
  );
};

export default LoadingScreen;