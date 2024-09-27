import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainScreen from '../MainScreen'
import SplashScreen from '../screens/SplashScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import NotifyScreen from '../screens/NotifyScreen'
import ChatScreen from '../screens/ChatScreen'

import CreateActivity from '../post/Plans'
import ProfileScreen from '../screens/Profile/ProfileScreen'
import EditProfileScreen from '../screens/Profile/EditProfileScreen'
import SettingsScreen from '../screens/Profile/SettingsScreen'
import Friends from '../screens/Friends'
import Games from '../gaming/Games'
import AIChatScreen from '../AIChatScreen'


stack = createNativeStackNavigator()


const AppNavigation = () => {
  return (
    <stack.Navigator screenOptions={{headerShown: false, presentation: 'card'}}>
      
      
      <stack.Screen name="Splash" component={SplashScreen} />
      <stack.Screen name="Login" component={LoginScreen} />
      <stack.Screen name="Register" component={RegisterScreen} />
      <stack.Screen name="MainScreen" component={MainScreen} />
      <stack.Screen name="notify" component={NotifyScreen} />
      <stack.Screen name="chat" component={ChatScreen} />
      <stack.Screen name="Friends" component={Friends} />
      <stack.Screen name="Games" component={Games} />
      
      <stack.Screen name="CreateActivity" component={CreateActivity} />
      <stack.Screen name="profile" component={ProfileScreen} />
      <stack.Screen name="edit" component={EditProfileScreen} />
      <stack.Screen name="Settings" component={SettingsScreen} />
      <stack.Screen name="ai" component={AIChatScreen} />
      


    </stack.Navigator>
    
  )
}

export default AppNavigation

const styles = StyleSheet.create({})