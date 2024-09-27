import React, { useState, useEffect } from 'react';
import { Text, View, Image, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton'; 
import Snackbar from '../constant/Snackbar';
import icons from '../constant/Icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import axios from 'axios';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isCheckingLogin, setIsCheckingLogin] = useState(true);

  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarType, setSnackbarType] = useState('success');

  const STATIC_USERNAME = "Admin";
  const STATIC_PASSWORD = "Admin";
  const API_BASE_URL = 'https://hq8740lv-5200.inc1.devtunnels.ms/api'; 
  
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        navigation.navigate('MainScreen');
      }
      setIsCheckingLogin(false); 
    };
    checkLoginStatus();
  }, [navigation]);

  const handleLogin = async () => {
    if (!username || !password) {
        showSnackbar('Username and password are required', 'error');
        return;
    }

    setLoading(true);

    try {
        if (username === STATIC_USERNAME && password === STATIC_PASSWORD) {
            await AsyncStorage.setItem('token', 'static-token'); 
            await AsyncStorage.setItem('userId', 'static-user-id'); 
            showSnackbar('Login successful', 'success');
            console.log('Login successful');
            console.log(`Username: ${username}`);
            console.log('Token: static-token');
            navigation.navigate('MainScreen');
        } else {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, { username, password });
            const { token, user } = response.data;

            await AsyncStorage.setItem('token', token); 
            await AsyncStorage.setItem('userId', user.id); // Correctly storing user ID
            showSnackbar('Login successful', 'success');
            console.log('Login successful');
            console.log(`Username: ${username}`);
            console.log(`User ID: ${user.id}`);
            console.log(`Token: ${token}`);
            navigation.navigate('MainScreen');
        }
    } catch (error) {
        console.error('Login failed');
        console.error(`Username: ${username}`);
        console.error(`Error: ${error.response?.data?.message || error.message}`);
    } finally {
        setLoading(false);
    }
};


  const showSnackbar = (message, type) => {
    setSnackbarMessage(message);
    setSnackbarType(type);
    setSnackbarVisible(true);
    setTimeout(() => setSnackbarVisible(false), 3000);  
  };

  if (isCheckingLogin) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#F5F5F5', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 }}>
      <View style={{ alignItems: 'center', marginBottom: 32 }}>
        <Image
          source={icons.logo_} 
          style={{ width: 160, height: 128, marginBottom: 24 }}
        />
      </View>

      <View style={{ backgroundColor: '#FFFFFF', padding: 32, borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, width: '100%', maxWidth: 400 }}>
        <TextInput
          placeholder="Username"
          keyboardType="default"
          value={username}
          onChangeText={setUsername}
          style={{ borderBottomWidth: 1, borderBottomColor: '#D1D1D1', paddingVertical: 8, marginBottom: 16 }}
        />
        
        <View style={{ flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#D1D1D1', paddingVertical: 8, marginBottom: 24 }}>
          <TextInput
            placeholder="Password"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
            style={{ flex: 1 }}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Image
              source={passwordVisible ? icons.eye_open : icons.eye_closed}
              style={{ width: 16, height: 16, marginLeft: 8 }}
            />
          </TouchableOpacity>
        </View>

        <CustomButton
          onPress={handleLogin}
          title={loading ? 'Logging in...' : 'Login'}
          style={{ marginBottom: 12 }}
          disabled={loading}
        />

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 24, gap: 16 }}>
          <TouchableOpacity style={{ backgroundColor: '#FFFFFF', padding: 12, borderRadius: 50, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }}>
            <Image
              source={icons.google} 
              style={{ width: 32, height: 32 }}
            />
          </TouchableOpacity>

          <TouchableOpacity style={{ backgroundColor: '#FFFFFF', padding: 12, borderRadius: 50, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 }}>
            <Image
              source={icons.apple} 
              style={{ width: 32, height: 32 }}
            />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
          style={{ marginTop: 16 }}
        >
          <Text style={{ color: '#000', textAlign: 'center', fontSize: 14 }}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>

      <Snackbar message={snackbarMessage} type={snackbarType} visible={snackbarVisible} />
    </View>
  );
};

export default LoginScreen;
