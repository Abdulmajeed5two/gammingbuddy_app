import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton'; 
import Snackbar from '../constant/Snackbar';
import icons from '../constant/Icons';

const API_Register = 'https://hq8740lv-5200.inc1.devtunnels.ms/api';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); 
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); 
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('success'); // 'success' or 'error'

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setSnackbarMessage('Passwords do not match');
      setSnackbarType('error');
      setSnackbarVisible(true);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${API_Register}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSnackbarMessage('Registration successful');
        setSnackbarType('success');
        setSnackbarVisible(true);
        navigation.navigate('Login');
      } else {
        setSnackbarMessage(data.message || 'Registration failed');
        setSnackbarType('error');
        setSnackbarVisible(true);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setSnackbarMessage('Something went wrong. Please try again later.');
      setSnackbarType('error');
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-background justify-center items-center px-6">
      <View className="items-center mb-8">
        <Image
          source={icons.logo_} 
          className="w-40 h-32 mb-6"
        />
      </View>

      <View className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          className="border-b border-gray-300 py-2"
        />
        <TextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          className="border-b border-gray-300 py-2"
        />
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          className="border-b border-gray-300 py-2"
        />
        
        {/* Password Field */}
        <View className="flex-row items-center border-b border-gray-300 py-2">
          <TextInput
            placeholder="Password"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
            className="flex-1"
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Image
              source={passwordVisible ? icons.eye_open : icons.eye_closed} // Toggle between open and closed eye icon
              className="w-6 h-6 ml-2"
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password Field */}
        <View className="flex-row items-center border-b border-gray-300 py-2 mb-10">
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry={!confirmPasswordVisible}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            className="flex-1"
          />
          <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
            <Image
              source={confirmPasswordVisible ? icons.eye_open : icons.eye_closed} // Toggle between open and closed eye icon
              className="w-6 h-6 ml-2"
            />
          </TouchableOpacity>
        </View>

        <CustomButton
          onPress={handleRegister}
          title={loading ? 'Registering...' : 'Register'}
          className="mb-4"
          disabled={loading}
        />
        
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          className="mt-4"
        >
          <Text className="text-secondary text-center text-sm">Already have an account? Login</Text>
        </TouchableOpacity>
      </View>

      {/* Snackbar Component */}
      <Snackbar
        message={snackbarMessage}
        type={snackbarType}
        visible={snackbarVisible}
        duration={3000}
      />
    </View>
  );
};

export default RegisterScreen;
