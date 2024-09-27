import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { colors } from '../constant/Colors'; // Adjust the path as needed

const CustomButton = ({ onPress, title, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[{ backgroundColor: colors.accent, padding: 12, borderRadius: 8 }, style]}
    >
      <Text style={{ color: 'white', textAlign: 'center', fontSize: 18, fontWeight: '600' }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default CustomButton;
