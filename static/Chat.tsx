import React, { useCallback, useLayoutEffect, useState } from 'react';
import { View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import io from 'socket.io-client';

const Chat = ({ route }: { route: any }) => {
  const [messages, setMessages] = useState([] as any[]); // Ensure messages state is initialized

  const chatId = route.params?.chatId || '';
  const socket = io();

  useLayoutEffect(() => {
    socket.on('groupMessage', (newMessage) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [newMessage])
      );
    });

    return () => {
      socket.off('groupMessage');
    };
  }, [socket]);

  const onSend = useCallback(
    (newMessages = []) => {
      socket.emit('newChatMessage', {
        chatMessage: newMessages[0].text, // Fix the key here
        groupIdentifier: chatId,
        currentUser: {
          _id: newMessages[0].user._id,
          avatar: newMessages[0].user.avatar,
        },
        timeData: {
          hr: new Date().getHours(),
          mins: new Date().getMinutes(),
        },
      });
  
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, newMessages)
      );
    },
    [chatId, socket]
  );
  

  return (
    <GiftedChat
      messages={messages}
      onSend={(newMessages) => onSend(newMessages)}
      user={{
        _id: 'someUserId', // Replace with the actual user ID
        avatar: 'https://i.pravatar.cc/300',
      }}
      messagesContainerStyle={{
        backgroundColor: 'white',
      }}
    />
  );
};

export default Chat;
