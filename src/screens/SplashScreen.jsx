import { Text, View, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { colors } from '../constant/Colors';
import icons from '../constant/Icons';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 2000);
  }, [navigation]);

  return (
    <View className="flex-1 justify-center items-center" style={{ backgroundColor: colors.accent }}>
      <Image
        source={icons.logo} 
        className="w-64 h-64 mb-4"
      />
      
      <Text className="text-sm absolute bottom-5" style={{ color: colors.textPrimary }}>
        Developed By Abdul Majeed
      </Text>
    </View>
  );
}

export default SplashScreen;
