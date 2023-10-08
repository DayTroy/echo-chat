import { ActionTypes } from "./chatActionTypes";
import { Chat } from "../../shared/interfaces/Chat";
import axios from "axios";

export const setChats = (chats: Chat[]) => ({
  type: ActionTypes.SET_CHATS,
  payload: chats,
});

export const createChat = (chatData: any) => {
  return async (dispatch: any) => {
    try {
      const response = await axios.post('http://localhost:3000/create-chat/', {
        uid: chatData.uid,
        chatTitle: chatData.chatTitle,
      });

      dispatch({
        type: ActionTypes.CREATE_CHAT,
        payload: {
          id: response.data.id,
          title: chatData.chatTitle,
          creatorID: chatData.uid,
        },
      });

    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };
};

export const editChat = (chatData: any) => {
  return async (dispatch: any) => {
    try {
      await axios.put(`http://localhost:3000/update-chat/${chatData.chatId}`, {
        updatedChatTitle: chatData.updatedChatTitle,
      });
      dispatch({
        type: ActionTypes.EDIT_CHAT,
        payload: {
          id: chatData.chatId,
          title: chatData.updatedChatTitle,
        },
      });

    } catch (error) {
        console.error('Error editing chat:', error);
    }
  };
};

export const deleteChat = (chatId: string) => ({
  type: ActionTypes.DELETE_CHAT,
  payload: chatId,
});

export const connectChat = (chatId: string, userId: string) => ({
  type: ActionTypes.CONNECT_CHAT,
  payload: { chatId, userId },
});
