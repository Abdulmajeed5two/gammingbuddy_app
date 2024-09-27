import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Plan = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const storedPlans = await AsyncStorage.getItem('gamingPlans');
        if (storedPlans) {
          setPlans(JSON.parse(storedPlans));
        }
      } catch (error) {
        console.error('Error loading plans:', error);
      }
    };

    fetchPlans();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.location}>Location: {item.location}</Text>
      <Text style={styles.date}>Date: {item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Completed Gaming Sessions</Text>
      <FlatList
        data={plans}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Plan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderRadius: 8,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  location: {
    fontSize: 14,
    color: '#555',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
});
