import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Button, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreatePlanModal = ({ navigation }) => {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  
  const handleSubmit = async () => {
    const newPlan = {
      description,
      location,
      date: new Date().toLocaleDateString(),
    };

    try {
      // Retrieve existing posts from AsyncStorage
      const existingPlans = await AsyncStorage.getItem('gamingPlans');
      const plansArray = existingPlans ? JSON.parse(existingPlans) : [];
      
      // Add new post to the array
      plansArray.push(newPlan);
      
      // Save the updated array back to AsyncStorage
      await AsyncStorage.setItem('gamingPlans', JSON.stringify(plansArray));

      // Navigate to DoneActivity after submission
      navigation.navigate('DoneActivity');
    } catch (error) {
      console.error('Error saving plan:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create a New Gaming Session</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter location"
        value={location}
        onChangeText={setLocation}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default CreatePlanModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});
