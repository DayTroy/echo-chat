import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Chat {
  id: number;
  name: string;
}

interface ChatState {
  chats: Chat[];
}

const initialState: ChatState = {
  chats: [],
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChats: (state, action: PayloadAction<Chat[]>) => {
      state.chats = action.payload;
    },
    addChat: (state, action: PayloadAction<Chat>) => {
      state.chats.push(action.payload);
    },
  },
});

export const { setChats, addChat } = chatSlice.actions;
export const selectChats = (state: { chat: ChatState }) => state.chat.chats;

export default chatSlice.reducer;
