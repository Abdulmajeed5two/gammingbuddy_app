import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { colors } from '../constant/Colors'; // Adjust the path as needed
import icons from '../constant/Icons'; // Adjust the path as needed

const FirstScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkIfShown = async () => {
      const isFirstLaunch = await AsyncStorage.getItem('hasShownFirstScreen');
      if (isFirstLaunch) {
        navigation.navigate('MainScreen');
      }
    };

    checkIfShown();
  }, [navigation]);

  const handleContinue = async (screen) => {
    await AsyncStorage.setItem('hasShownFirstScreen', 'true');
    navigation.navigate(screen);
  };

  return (
    <View className="flex-1 items-center justify-center px-6" style={{ backgroundColor: colors.background }}>
      {/* Logo */}
      <Image
        source={icons.logo_} // Ensure this path is correct
        className="w-32 h-28 mb-6"
      />

      {/* Slogan */}
      <Text className="text-xl font-bold text-center mb-8 text-primary">
        Gaming Buddy - Connect & Play
      </Text>

      {/* Buttons */}
      <View className="w-full max-w-sm">
        <TouchableOpacity
          onPress={() => handleContinue('Login')}
          className="py-3 rounded-lg mb-4"
          style={{ backgroundColor: colors.accent }}
        >
          <Text className="text-white text-center text-lg">Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleContinue('Register')}
          className="py-3 border rounded-lg"
        >
          <Text className="text-black text-center text-lg">Register</Text>
        </TouchableOpacity>
      </View>

      {/* Continue */}
      <View className="absolute bottom-10 w-full max-w-sm px-6">
        <Text className="text-center text-muted mb-4">Or continue with</Text>

        <View className="flex-row justify-around">
          {/* Google Login */}
          <TouchableOpacity
            onPress={() => handleContinue('GoogleLogin')}
            className="bg-white p-4 rounded-lg shadow-md w-24 h-24 items-center justify-center"
            style={{ borderColor: colors.greyBorderColor, borderWidth: 1 }}
          >
            <Image
              source={icons.google} // Ensure this path is correct
              className="w-12 h-12"
            />
            <Text className="mt-2 text-gray-700">Google</Text>
          </TouchableOpacity>

          {/* Facebook Login */}
          <TouchableOpacity
            onPress={() => handleContinue('FacebookLogin')}
            className="bg-white p-4 rounded-lg shadow-md w-24 h-24 items-center justify-center"
            style={{ borderColor: colors.greyBorderColor, borderWidth: 1 }}
          >
            <Image
              source={icons.Facebook}
              className="w-12 h-12"
            />
            <Text className="mt-2 text-gray-700">Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FirstScreen;
