import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import icons from '../constant/Icons'; // Adjust the path as needed
import { useNavigation } from '@react-navigation/native';
import { tw } from 'nativewind'; // Ensure correct import
import { colors } from '../constant/Colors';

const BottomBar = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: colors.accent,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 10, // Android shadow
      }}
    >
      {/* Home */}
      <TouchableOpacity onPress={() => navigation.navigate('MainScreen')}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={icons.Home}
            style={{ width: 30, height: 30, tintColor: '#fff' }} // Icon size and color
          />
        </View>
      </TouchableOpacity>

      {/* Explore */}
      <TouchableOpacity onPress={() => navigation.navigate('Friends')}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={icons.menu}
            style={{ width: 30, height: 30, tintColor: '#fff' }} // Icon size and color
          />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Games')}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={icons.Explore}
            style={{ width: 30, height: 30, tintColor: '#fff' }} // Icon size and color
          />
        </View>
      </TouchableOpacity>

      {/* User */}
      <TouchableOpacity onPress={() => navigation.navigate('profile')}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={icons.User}
            style={{ width: 30, height: 30, tintColor: '#fff' }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BottomBar;
