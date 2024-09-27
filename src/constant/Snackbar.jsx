import React, { useEffect, useState } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

const Snackbar = ({ message, type, visible, duration = 3000 }) => {
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      const timeout = setTimeout(() => {
        Animated.timing(animation, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start();
      }, duration);

      return () => clearTimeout(timeout);
    }
  }, [visible]);

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.snackbar,
        {
          opacity: animation,
          transform: [{ translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [50, 0] }) }],
          backgroundColor: type === 'success' ? '#4CAF50' : '#F44336', // Green for success, Red for error
        },
      ]}
    >
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  snackbar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 4,
    padding: 16,
    elevation: 4,
    zIndex: 10,
  },
  message: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default Snackbar;
