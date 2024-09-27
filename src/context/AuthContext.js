import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

// Create AuthContext
export const AuthContext = createContext();

// AuthProvider component to wrap around the app's root component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  // Load user data from AsyncStorage on app start
  useEffect(() => {
    const loadUserData = async () => {
      const token = await AsyncStorage.getItem('userToken');
      if (token) {
        setUser({ token });
      }
      setLoading(false);
    };

    loadUserData();
  }, []);

  // Register function
  const register = async (name, username, email, password, confirmPassword) => {
    try {
      if (password !== confirmPassword) {
        console.error('Passwords do not match');
        return;
      }

      // Make API call to register the user
      const response = await axios.post('http://localhost:5200/api/auth/register', {
        name,
        username,
        email,
        password,
      });

      const data = response.data;

      if (response.status === 201) {
        // Store the token locally
        await AsyncStorage.setItem('userToken', data.token);
        // Update the user state
        setUser({ token: data.token });

        // Navigate to the home screen
        navigation.navigate('HomeScreen');
      } else {
        console.error('Registration Error:', data.message);
      }
    } catch (error) {
      console.error('Registration Error:', error.message);
    }
  };

  // Logout function
  const logout = async () => {
    await AsyncStorage.removeItem('userToken');
    setUser(null);
    navigation.navigate('LoginScreen');
  };

  return (
    <AuthContext.Provider value={{ user, register, logout }}>
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" />
        </View>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
