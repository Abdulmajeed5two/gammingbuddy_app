import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, AsyncStorage } from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import { colors } from '../constant/Colors';

const users = ['Zain', 'Habib', 'Bilal', 'Ayesha', 'Sara', 'Ahmed'];

const ChatScreen = () => {
  const [activeUser, setActiveUser] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadMessages = async () => {
      const storedMessages = await AsyncStorage.getItem('messages');
      if (storedMessages) {
        setMessages(JSON.parse(storedMessages));
      }
    };
    loadMessages();
  }, []);

  const saveMessages = async (newMessages) => {
    await AsyncStorage.setItem('messages', JSON.stringify(newMessages));
  };

  const handleSend = () => {
    if (message.trim()) {
      const newMessages = [...messages, { user: activeUser, text: message }];
      setMessages(newMessages);
      saveMessages(newMessages);
      setMessage('');
    }
  };

  const handleBack = () => {
    setActiveUser(null);
  };

  const filteredUsers = users.filter((user) =>
    user.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {!activeUser ? (
        <>
          {/* Search Input */}
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search users..."
            style={styles.searchInput}
          />

          {/* User List with Cards */}
          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setActiveUser(item)} style={styles.userCard}>
                <Text style={styles.userText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      ) : (
        // Active User Chat
        <View style={styles.chatContainer}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton}>
              <Icon name="arrow-back" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.activeUser}>Chat with {activeUser}</Text>
          </View>
          <FlatList
            data={messages.filter((msg) => msg.user === activeUser)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.messageContainer}>
                <Text style={styles.messageText}>{item.text}</Text>
              </View>
            )}
          />
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            style={styles.input}
          />
          <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  searchInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f5f5f5',
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  userText: {
    fontSize: 18,
    marginLeft: 10,
  },
  chatContainer: {
    flex: 1,
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backButton: {
    marginRight: 10,
  },
  activeUser: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  messageContainer: {
    padding: 10,
    backgroundColor: colors.accent,
    borderRadius: 5,
    marginBottom: 5,
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  sendButton: {
    backgroundColor: colors.accent,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
