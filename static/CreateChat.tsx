// CreateChat.tsx
import React, { useState } from 'react';
import { View, Button, TextInput } from 'react-native';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { createChat } from '../core/chat/chatActions';
import { RootState } from '../core/reducers';

const CreateChat: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, null, any> = useDispatch();
  const [chatName, setChatName] = useState('');

  const handleCreateChat = () => {
    dispatch(createChat({ name: chatName }));
  };

  return (
    <View>
      <TextInput placeholder="Chat Name" onChangeText={setChatName} />
      <Button title="Create Chat" onPress={handleCreateChat} />
    </View>
  );
};

export default CreateChat;
