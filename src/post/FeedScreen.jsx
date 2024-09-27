import React, { useState, useEffect, useCallback } from 'react';
import {
  View, Text, FlatList, Image, TouchableOpacity, TextInput, Keyboard, Alert, RefreshControl
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CreatePostModal from './modals/CreatePostModal';

const FeedScreen = () => {
  const [posts, setPosts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [username, setUsername] = useState('Anonymous');
  const [comment, setComment] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadPosts();
    fetchUsername(); // Fetch username from API on component mount
  }, []);

  // Load posts from AsyncStorage
  const loadPosts = async () => {
    try {
      const savedPosts = await AsyncStorage.getItem('posts');
      if (savedPosts) {
        setPosts(JSON.parse(savedPosts));
      }
    } catch (e) {
      console.error('Failed to load posts.', e);
    }
  };

  // Fetch the username from the API using the stored token
  const fetchUsername = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      const response = await fetch('https://hq8740lv-5200.inc1.devtunnels.ms/api/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error('Failed to fetch username:', response.status, response.statusText);
        return;
      }

      const data = await response.json();
      
      // Check the structure and set username if available
      if (data.success && data.user && data.user.username) {
        setUsername(data.user.username); // Update state with the username
      } else {
        console.error('Username not found in response data');
        setUsername('Anonymous'); // Fallback if username not found
      }
    } catch (e) {
      console.error('Error fetching username:', e.message || e);
    }
  };

  // Open the modal for creating a new post
  const openModal = () => {
    setModalVisible(true);
  };

  // Close the modal after saving the post
  const closeModal = () => {
    setModalVisible(false);
  };

  // Handle saving a new post
  const handleSavePost = (newPost) => {
    const postWithUsername = { ...newPost, username }; // Add username to the new post
    setPosts([postWithUsername, ...posts]); // Display the newest post on top
    closeModal(); // Close modal after saving
  };

  // Handle joining a gaming session
  const handleJoin = (item) => {
    Alert.alert('Joined', `You have joined ${item.description} session at ${item.location}!`);
  };

  // Handle posting a comment
  const handlePostComment = (item) => {
    Keyboard.dismiss();
    Alert.alert('Comment Posted', `You commented on ${item.description}: ${comment}`);
    setComment(''); // Clear comment after posting
  };

  const renderPost = ({ item }) => (
    <View className="bg-white p-4 rounded-lg shadow-lg mb-4">
      {/* Username (username of the post creator) */}
      <Text className="font-bold text-lg mb-2">{item.username || 'Anonymous'}</Text>

      {/* Post Image */}
      {item.image && item.image !== '' && (
        <Image source={{ uri: item.image }} style={{ width: '100%', height: 200, borderRadius: 10 }} />
      )}

      {/* Post Description */}
      <Text className="text-gray-800 mb-2">{item.description}</Text>

      {/* Post Location */}
      <Text className="text-red-500 mt-1">{item.location}</Text>

      {/* Join Button */}
      <TouchableOpacity
        onPress={() => handleJoin(item)}
        className="bg-green-500 py-2 px-4 rounded-lg mt-3"
      >
        <Text className="text-white text-center font-semibold">Join</Text>
      </TouchableOpacity>

      {/* Comment Input */}
      <View className="mt-4">
        <TextInput
          placeholder="Leave a comment..."
          value={comment}
          onChangeText={setComment}
          className="border border-gray-300 p-3 rounded-lg mb-2"
        />
        <TouchableOpacity
          onPress={() => handlePostComment(item)}
          className="bg-red-500 py-2 px-4 rounded-lg"
        >
          <Text className="text-white text-center font-semibold">Post Comment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Handle pull-to-refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadPosts().then(() => setRefreshing(false));
  }, []);

  return (
    <View className="flex-1 p-5">
      {/* Row containing two buttons: "Create Post" and "Create Plan" */}
      <View className="flex-row justify-between mb-4">
        <TouchableOpacity onPress={openModal} className="bg-red-500 py-3 px-6 rounded-lg">
          <Text className="text-white text-center font-semibold">Create Post</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => Alert.alert('Create Plan', 'This will open Create Plan modal')} className="bg-red-500 py-3 px-6 rounded-lg">
          <Text className="text-white text-center font-semibold">Create Plan</Text>
        </TouchableOpacity> */}
      </View>

      {/* FlatList to display posts */}
      <FlatList
        data={posts}
        renderItem={renderPost}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text className="text-gray-500 text-center">No posts yet. Create a new post!</Text>}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      />

      {/* Modal for creating post */}
      <CreatePostModal
        visible={modalVisible}
        onClose={closeModal}
        onSavePost={handleSavePost}
      />
    </View>
  );
};

export default FeedScreen;
