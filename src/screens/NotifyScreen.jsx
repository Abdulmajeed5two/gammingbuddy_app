import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const NotifyScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>No notifications available</Text>
    </View>
  );
};

export default NotifyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Allow the view to take the full height of the screen
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: '#fff', // Background color of the screen
  },
  message: {
    fontSize: 18, // Font size of the message
    color: '#333', // Text color
  },
});
