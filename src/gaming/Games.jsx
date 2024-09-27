import React, { useState } from 'react';
import { Text, View, TouchableOpacity, FlatList, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';
import WebView from 'react-native-webview';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient'; 

const { width, height } = Dimensions.get('window'); 

const Games = () => {
  const [selectedGame, setSelectedGame] = useState(null);

  
  const games = [
    { id: 1, name: 'Ludo', url: 'https://poki.com/en/g/ludo-multiplayer', icon: require('../../assets/icons/ludo.png') },
    { id: 2, name: 'Cricket', url: 'https://www.crazygames.com/game/cricket-frvr', icon: require('../../assets/icons/cri.png') },
    { id: 3, name: 'Chess', url: 'https://www.chess.com/play/online', icon: require('../../assets/icons/chess.png') },
    { id: 4, name: 'Sudoku', url: 'https://sudoku.com/', icon: require('../../assets/icons/sudoku.png') },
    { id: 5, name: 'Tic Tac Toe', url: 'https://playtictactoe.org/', icon: require('../../assets/icons/tic.png') },
    { id: 6, name: 'Pac-Man', url: 'https://www.google.com/logos/2010/pacman10-i.html', icon: require('../../assets/icons/pacma.png') },
  ];

  const handlePlayGame = (game) => {
    setSelectedGame(game);
  };

  const renderGameCard = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handlePlayGame(item)}>
      <LinearGradient
        colors={['#FF6347', '#FF4500']} 
        style={styles.gradientCard}
      >
        <Image
          source={item.icon} 
          style={styles.icon} 
          resizeMode="contain"
        />
        <Text style={styles.cardText}>{item.name}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {!selectedGame ? (
        <>
        
          <LottieView
            source={require('../../assets/lottie/snake.json')}
            autoPlay
            loop
            style={styles.backgroundLottie}
          />
          <ScrollView contentContainerStyle={styles.contentContainer}>
            <Text style={styles.title}>Games</Text>
            <FlatList
              data={games}
              renderItem={renderGameCard}
              keyExtractor={(item) => item.id.toString()}
              numColumns={3}  // Display 3 cards in a row
              contentContainerStyle={styles.gameList}
            />
            <Text style={styles.title}>Streaming</Text>
            <View style={styles.streamingSection}>
              <LottieView
                source={require('../../assets/lottie/commin.json')}  
                autoPlay
                loop
                style={styles.lottieStreaming}
              />
              <Text style={styles.comingSoonText}>Streaming Coming Soon!</Text>
            </View>
          </ScrollView>
        </>
      ) : (
        <WebView source={{ uri: selectedGame.url }} style={{ flex: 1 }} />
      )}
    </View>
  );
};

export default Games;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor:'white'
  },
  contentContainer: {
    zIndex: 1,  
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 20,
    zIndex: 2,
  },
  gameList: {
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  card: {
    borderRadius: 8,
    margin: 10,
    width: '28%', 
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  gradientCard: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    padding: 16,
  },
  cardText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,  // Space between the icon and the text
  },
  lottie: {
    width: 50,
    height: 50,
  },
  streamingSection: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  lottieStreaming: {
    width: 200,
    height: 200,
  },
  comingSoonText: {
    fontSize: 18,
    marginTop: 10,
    color: '#555',
  },
  backgroundLottie: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    zIndex: 0, 
  },
});
