import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Image } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../../constant/Colors';

const { width } = Dimensions.get('window');

const EditProfileScreen = ({ route }) => {
  const { user } = route.params;
  const navigation = useNavigation();
  const [name, setName] = useState(user.name || '');
  const [username, setUsername] = useState(user.username || '');
  const [email, setEmail] = useState(user.email || '');
  const [bio, setBio] = useState(user.bio || '');
  const [profileImage, setProfileImage] = useState(user.profileImage || '');
  const [coverImage, setCoverImage] = useState(user.coverImage || '');

  const updateProfileImage = () => {
    launchImageLibrary({}, response => {
      if (!response.didCancel && !response.errorCode) {
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  const updateCoverImage = () => {
    launchImageLibrary({}, response => {
      if (!response.didCancel && !response.errorCode) {
        setCoverImage(response.assets[0].uri);
      }
    });
  };

  const handleUpdateProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await fetch('https://hq8740lv-5200.inc1.devtunnels.ms/api/profile/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            username,
            email,
            bio,
            profileImage,
            coverImage,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Update Response:', data);

        navigation.goBack(); // Return to ProfileScreen after update
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={updateCoverImage} style={styles.coverImageContainer}>
        <Image source={{ uri: coverImage }} style={styles.coverImage} />
        <Text style={styles.coverImageText}>Change Cover Photo</Text>
      </TouchableOpacity>
      <View style={styles.avatarContainer}>
        <TouchableOpacity onPress={updateProfileImage}>
          <Image source={{ uri: profileImage }} style={styles.avatar} />
        </TouchableOpacity>
        <Text style={styles.avatarText}>Change Profile Photo</Text>
      </View>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Name"
      />
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TextInput
        style={styles.textArea}
        value={bio}
        onChangeText={setBio}
        placeholder="Bio"
        multiline
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleUpdateProfile}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  coverImageContainer: {
    width: width,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
    marginBottom: 20,
  },
  coverImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  coverImageText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
    borderRadius: 5,
  },
  avatarContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
  },
  avatarText: {
    marginTop: 10,
    fontSize: 16,
    color: colors.muted,
  },
  input: {
    width: width * 0.9,
    padding: 10,
    marginVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
  },
  textArea: {
    width: width * 0.9,
    padding: 10,
    marginVertical: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    height: 100,
  },
  saveButton: {
    backgroundColor: colors.accent,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 10,
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;
