import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icons from '../../constant/Icons'; // Assuming Icons holds the paths to your images
import { CommonActions } from '@react-navigation/native';


const { width } = Dimensions.get('window');

const SettingsScreen = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token'); // Clear the token
      
      // Reset the navigation stack and navigate to the Login screen
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }], // Specify the screen to navigate to
        })
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to log out. Please try again.');
      console.error('Failed to log out:', error);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.section}>
        <TouchableOpacity style={styles.option}>
          <Image source={Icons.Bell} style={styles.icon} />
          <Text style={styles.optionText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Image source={Icons.Setting} style={styles.icon} />
          <Text style={styles.optionText}>Security</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Image source={Icons.Notifications} style={styles.icon} />
          <Text style={styles.optionText}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Image source={Icons.Privacy} style={styles.icon} />
          <Text style={styles.optionText}>Privacy</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.option}>
          <Image source={Icons.HelpSupport} style={styles.icon} />
          <Text style={styles.optionText}>Help & Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Image source={Icons.TermsPolicies} style={styles.icon} />
          <Text style={styles.optionText}>Terms & Policies</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity style={styles.option}>
          <Image source={Icons.FreeSpace} style={styles.icon} />
          <Text style={styles.optionText}>Free up space</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={handleLogout}>
          <Image source={Icons.Logout} style={styles.icon} />
          <Text style={styles.optionText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 40, // Added top margin
    backgroundColor: '#f4f4f4', // Modern light background
  },
  section: {
    marginBottom: 30,
    backgroundColor: '#fff', // White background for sections
    borderRadius: 10,
    overflow: 'hidden', // Ensures rounded corners
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, // Adds elevation for Android shadow effect
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  optionText: {
    marginLeft: 20,
    fontSize: 18,
    color: '#333', // Darker text for contrast
  },
  icon: {
    width: 24, // Adjust the size as needed
    height: 24,
    resizeMode: 'contain',
    tintColor: '#555', // Slight tint for icons
  },
});

export default SettingsScreen;
