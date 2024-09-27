import React, { useState, useEffect } from 'react';
import {
  Modal, View, Text, TextInput, TouchableOpacity, Image
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styled } from 'nativewind';
import { launchImageLibrary } from 'react-native-image-picker'; // Import image picker

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledButton = styled(TouchableOpacity);

const CreatePostModal = ({ visible, onClose, onSavePost }) => {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState(null); // Changed to hold the image object

  useEffect(() => {
    if (!visible) {
      // Clear the inputs when the modal is closed
      setDescription('');
      setLocation('');
      setImage(null);
    }
  }, [visible]);

  // Function to handle selecting an image from the library
  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        setImage(selectedImage);
      }
    });
  };

  // Function to save the post
  const handleSave = async () => {
    const newPost = { description, location, image: image?.uri }; // Storing image URI

    const existingPosts = await AsyncStorage.getItem('posts');
    const posts = existingPosts ? JSON.parse(existingPosts) : [];
    posts.unshift(newPost); // Add new post to the beginning
    await AsyncStorage.setItem('posts', JSON.stringify(posts));

    onSavePost(newPost); // Pass only the new post to onSavePost
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <StyledView className="p-5 justify-center h-full">
        {/* Description Input */}
        <TextInput
          placeholder="Write something..."
          value={description}
          onChangeText={setDescription}
          multiline // Allow multi-line input
          numberOfLines={4} // Set number of lines for the input
          style={{ borderColor: '#ccc', borderWidth: 1, padding: 8, marginBottom: 16, height: 100 }} // Custom styles
        />

        {/* Location Input */}
        <TextInput
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
          className="border border-gray-300 p-2 mb-4"
        />

        {/* Image Picker */}
        <StyledButton onPress={selectImage} className="p-2 bg-red-500 rounded mb-4">
          <StyledText className="text-white">Pick an Image</StyledText>
        </StyledButton>

        {/* Display selected image if exists */}
        {image && (
          <View className="mb-4">
            <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />
          </View>
        )}

        {/* Create Post Button */}
        <StyledButton onPress={handleSave} className="mt-4 bg-green-500 p-3 rounded">
          <StyledText className="text-white text-center">Create Post</StyledText>
        </StyledButton>

        {/* Cancel Button */}
        <StyledButton onPress={onClose} className="mt-2 bg-red-500 p-3 rounded">
          <StyledText className="text-white text-center">Cancel</StyledText>
        </StyledButton>
      </StyledView>
    </Modal>
  );
};

export default CreatePostModal;
