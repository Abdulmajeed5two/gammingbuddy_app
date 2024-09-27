import React from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import HeadLayout from './components/HeadLayout';
import FeedScreen from './post/FeedScreen';
import { colors } from './constant/Colors';
import BottomBar from './components/BottomBar';

const MainScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <HeadLayout />
      </View>


      <ScrollView contentContainerStyle={styles.scrollView}>
        <FeedScreen />
      </ScrollView>


      <TouchableOpacity
        style={styles.fab}
        onPress={() => {
          navigation.navigate('ai'); 
        }}
      >
        <Text style={styles.fabText}>AI</Text>
      </TouchableOpacity>

      <BottomBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 2,
  },
  scrollView: {
    paddingBottom: 70,
    flex: 1,
    padding: 2,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 70,
    backgroundColor: 'red',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fabText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MainScreen;
