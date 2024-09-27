import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native'; // Import LottieView for animations
import { colors } from '../constant/Colors';
import icons from '../constant/Icons';


const HeadLayout = () => {
  const navigation = useNavigation();

  // Navigation handlers
  const handleNotificationPress = () => {
    navigation.navigate('notify'); // Replace with your notification screen route
  };

  const handleMessagePress = () => {
    navigation.navigate('chat'); // Replace with your chat screen route
  };

  return (
    <View className="flex-row items-center justify-between p-4 bg-white shadow-md">
      {/* Left Side GB Text */}
      <Text className="text-xl font-bold text-black">GB</Text>
      
      {/* Right Side Icons (Notification & Message) */}
      <View className="flex-row space-x-4">
        <TouchableOpacity onPress={handleNotificationPress}>
          <Image
            source={icons.Notify} 
            style={{ width: 32, height: 40 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleMessagePress}>
          <Image
            source={icons.chat}
            style={{ width: 40, height: 40 }} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HeadLayout;
