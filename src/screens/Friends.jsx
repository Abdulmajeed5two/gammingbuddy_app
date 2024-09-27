import React, { useEffect, useState } from 'react';
import { TextInput, View, ActivityIndicator, FlatList, Text, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styled } from 'nativewind'; // Using NativeWind for styling

const API_BASE_URL = 'https://hq8740lv-5200.inc1.devtunnels.ms/api';

const Friends = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [friendRequests, setFriendRequests] = useState([]); // Incoming friend requests
  const [suggestions, setSuggestions] = useState([]); // Suggested users
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsersAndRequests = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          setLoading(false);
          return;
        }

        // Fetch all users, friend requests, and suggestions
        const response = await axios.get(`${API_BASE_URL}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const users = response.data.users;

        // Assuming the API returns 'isFriendRequest' for friend requests you have received
        setFriendRequests(users.filter(user => user.isFriendRequest)); // Incoming friend requests
        setSuggestions(users.filter(user => !user.isFriendRequest)); // Suggestions
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };

    fetchUsersAndRequests();
  }, []);

  // Accept a friend request
  const acceptFriendRequest = async (userId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post(`${API_BASE_URL}/friend-request/accept`, { userId }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        // Remove the accepted friend from the friend requests
        setFriendRequests(prev => prev.filter(user => user._id !== userId));
        Alert.alert('Success', 'Friend request accepted!');
      }
    } catch (error) {
      console.error('Error accepting friend request:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'Failed to accept friend request. Please try again.');
    }
  };

  // Cancel or reject a friend request
  const cancelFriendRequest = async (userId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post(`${API_BASE_URL}/friend-request/cancel`, { userId }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        // Remove the cancelled friend request from the list
        setFriendRequests(prev => prev.filter(user => user._id !== userId));
        Alert.alert('Cancelled', 'Friend request cancelled.');
      }
    } catch (error) {
      console.error('Error cancelling friend request:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'Failed to cancel friend request. Please try again.');
    }
  };

  const sendFriendRequest = async (userId) => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await axios.post(`${API_BASE_URL}/friend-request`, { receiverId: userId }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        // Remove the user from suggestions once the request is sent
        setSuggestions(prev => prev.filter(user => user._id !== userId));
        Alert.alert('Success', 'Friend request sent!');
      }
    } catch (error) {
      console.error('Error sending friend request:', error.response ? error.response.data : error.message);
      Alert.alert('Error', 'Failed to send friend request. Please try again.');
    }
  };

  const renderFriendRequestItem = ({ item }) => (
    <View className="flex-row items-center p-4 bg-gray-200 mb-2 rounded-lg shadow-md">
      <View className="mr-4">
        <Image
          source={{ uri: item.profileImage || 'https://via.placeholder.com/50' }}
          className="w-12 h-12 rounded-full"
        />
      </View>
      <View className="flex-1">
        <Text className="text-lg font-semibold">{item.name}</Text>
      </View>
      <View className="flex-row">
        <TouchableOpacity
          onPress={() => acceptFriendRequest(item._id)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-sm mr-2"
        >
          <Text className="text-white font-semibold">Accept</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => cancelFriendRequest(item._id)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-sm"
        >
          <Text className="text-white font-semibold">Reject</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderUserItem = ({ item }) => (
    <View className="flex-row items-center p-4 bg-gray-200 mb-2 rounded-lg shadow-md">
      <View className="mr-4">
        <Image
          source={{ uri: item.profileImage || 'https://via.placeholder.com/50' }}
          className="w-12 h-12 rounded-full"
        />
      </View>
      <View className="flex-1">
        <Text className="text-lg font-semibold">{item.name}</Text>
      </View>
      <TouchableOpacity
        onPress={() => sendFriendRequest(item._id)}
        className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-sm"
      >
        <Text className="text-white font-semibold">Send Request</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView className="flex-1 p-4 bg-gray-50">
      {/* Search Input */}
      <TextInput
        className="p-3 mb-4 border border-gray-300 rounded-lg bg-white shadow-sm"
        placeholder="Search Friends..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {/* Friend Requests Section */}
      <View className="mb-6">
        <Text className="text-xl font-bold mb-4">Friend Requests</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={friendRequests}
            keyExtractor={(item) => item._id}
            renderItem={renderFriendRequestItem}
          />
        )}
      </View>

      {/* Suggestions Section */}
      <View>
        <Text className="text-xl font-bold mb-4">Suggestions</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={suggestions.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()))}
            keyExtractor={(item) => item._id}
            renderItem={renderUserItem}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default Friends;
