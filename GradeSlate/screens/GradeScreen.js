import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, SectionList, TouchableOpacity, Button } from 'react-native';
import { globalStyles } from '../Styles';

const GradeScreen = ({ navigation, route }) => {
  const { grades } = route.params;

  // State to track which class's assignments are expanded
  const [expandedClasses, setExpandedClasses] = useState({});

  // Toggle dropdown for a specific class
  const toggleClass = (className) => {
    setExpandedClasses((prev) => ({
      ...prev,
      [className]: !prev[className], // Toggle expanded state
    }));
  };

  // Handle signout
  const handleSignOut = () => {
    navigation.replace('Login'); // Navigate back to LoginScreen
  };

  // Format grades for SectionList
  const sections = Object.entries(grades).map(([className, classData]) => ({
    title: className,
    data: expandedClasses[className] ? classData.assignments : [], // Show assignments if expanded
    average: classData.average,
  }));

  return (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.title}>Your Grades</Text>
      <Button title="Sign Out" onPress={handleSignOut} color="#4A90E2" />
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item.assignment_name + index}
        renderItem={({ item }) => (
          <View style={globalStyles.assignmentContainer}>
            <Text style={globalStyles.assignmentName}>{item.assignment_name}</Text>
            <Text style={globalStyles.assignmentScore}>
              {item.score} / {item.total_points}
            </Text>
          </View>
        )}
        renderSectionHeader={({ section: { title, average } }) => (
          <TouchableOpacity onPress={() => toggleClass(title)} style={globalStyles.classHeader}>
            <View style={globalStyles.classHeaderContent}>
              <Text style={globalStyles.className}>{title}</Text>
              <Text style={globalStyles.classAverage}>{average}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default GradeScreen;