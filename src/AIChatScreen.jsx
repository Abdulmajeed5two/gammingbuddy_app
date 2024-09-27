import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import { colors } from './constant/Colors';

const AIChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (message.trim()) {
      const userMessage = { id: Date.now().toString(), text: message, sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      setMessage('');
      setLoading(true);

      try {
        const response = await fetch('https://hq8740lv-5200.inc1.devtunnels.ms/api/generate-content', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt: message }),
        });

        const data = await response.json();
        const aiMessage = { id: Date.now() + 1, text: data.reply, sender: 'ai' };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      } catch (error) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: Date.now() + 1, text: 'Failed to get response from AI', sender: 'error' },
        ]);
        console.error('Error fetching AI response:', error);
      }

      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.sender === 'user' ? styles.userMessage : item.sender === 'ai' ? styles.aiMessage : styles.errorMessage]}>
            <Text style={item.sender === 'user' ? styles.userText : styles.aiText}>{item.text}</Text>
          </View>
        )}
        style={styles.messagesList}
        onContentSizeChange={() => this.flatList.scrollToEnd({ animated: true })}
        ref={ref => { this.flatList = ref; }}
      />
      
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Gaming Buddy is thinking...</Text>
        </View>
      )}
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity
          style={[styles.sendButton, !message.trim() && styles.disabledButton]}
          onPress={handleSend}
          disabled={!message.trim()}
        >
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f8fa',
    padding: 10,
  },
  messagesList: {
    flex: 1,
  },
  messageContainer: {
    padding: 15,
    borderRadius: 20,
    marginVertical: 5,
    maxWidth: '80%',
  },
  userMessage: {
    backgroundColor: colors.accent,
    alignSelf: 'flex-end',
  },
  aiMessage: {
    backgroundColor: '#E5E5EA',
    alignSelf: 'flex-start',
  },
  errorMessage: {
    backgroundColor: '#FF3B30',
    alignSelf: 'flex-start',
  },
  userText: {
    color: '#fff',
    fontSize: 16,
  },
  aiText: {
    color: '#000',
    fontSize: 16,
  },
  loadingContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  loadingText: {
    marginTop: 5,
    fontSize: 16,
    color: colors.accent,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    padding: 10,
    paddingLeft: 15,
    marginRight: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AIChatScreen;
