import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Image, Dimensions, ScrollView, ImageBackground, TouchableOpacity, RefreshControl } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../../constant/Colors';

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    name: '',
    username: '',
    email: '',
    profileImage: '',
    coverImage: '',
    bio: '',
  });
  const [refreshing, setRefreshing] = useState(false);

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await fetch('https://hq8740lv-5200.inc1.devtunnels.ms/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data);

        const userData = data.user || {};

        setUser({
          name: userData.name || '',
          username: userData.username || '',
          email: userData.email || '',
          profileImage: userData.profileImage || 'https://example.com/default-profile.jpg',
          coverImage: userData.coverImage || 'https://example.com/default-cover.jpg',
          bio: userData.bio || 'We are GammingBuddies.',
        });
      } else {
        console.log('No token found');
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUserData();
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [])
  );

  return (
    <ScrollView 
      contentContainerStyle={{ paddingBottom: 16, backgroundColor: '#fff', alignItems: 'center' }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }
    >
      {/* Curved Background with Profile Info */}
      <View style={{ width: '100%', height: 280, overflow: 'hidden', borderBottomLeftRadius: 50, borderBottomRightRadius: 50, backgroundColor: '#f4f4f4', marginBottom: 20 }}>
        <ImageBackground 
          source={{ uri: user.coverImage }}
          style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
          resizeMode="cover"
        >
          {/* Settings Icon */}
          <TouchableOpacity 
            style={{ position: 'absolute', top: 10, right: 10, backgroundColor: '#000', width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }} 
            onPress={() => navigation.navigate('Settings', { user })}
          >
            <Text style={{ color: '#fff', fontSize: 20 }}>⚙️</Text>
          </TouchableOpacity>
          
          <View style={{ alignItems: 'center', paddingTop: 50 }}>
            <View style={{ position: 'relative', marginBottom: 15 }}>
              {/* Profile Image */}
              <Image style={{ width: 120, height: 120, borderRadius: 60, borderWidth: 3, borderColor: '#fff' }} source={{ uri: user.profileImage }} />
            </View>
            <Text style={{ fontSize: 26, fontWeight: 'bold', color: '#fff', marginBottom: 5 }}>{user.name}</Text>
            <Text style={{ fontSize: 18, color: '#fff', marginBottom: 10, textAlign: 'center' }}>{user.bio}</Text>
          </View>
        </ImageBackground>
      </View>

      {/* Buttons for Edit Profile and Activity */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width * 0.6, marginBottom: 20 }}>
        <TouchableOpacity onPress={() => navigation.navigate('edit', { user })} style={{ backgroundColor: colors.accent, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10 }}>
          <Text style={{ color: '#fff', fontSize: 16 }}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('CreateActivity', { user })} style={{ backgroundColor: colors.accent, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10 }}>
          <Text style={{ color: '#fff', fontSize: 16 }}>Activity</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
