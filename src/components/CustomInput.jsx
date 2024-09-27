import React from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import { colors } from '../constant/Colors'; // Adjust the path as needed

const CustomInput = ({ placeholder, secureTextEntry, value, onChangeText, keyboardType }) => {
  return (
    <View style={{ marginBottom: 16 }}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        style={{
          borderColor: colors.muted,
          borderWidth: 1,
          borderRadius: 8,
          padding: 12,
          backgroundColor: '#fff',
          fontSize: 16,
          color: '#000',
        }}
      />
    </View>
  );
};

export default CustomInput;
