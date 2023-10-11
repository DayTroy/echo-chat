import { ActionTypes } from "./chatActionTypes";
import axios from "axios";
import { Dispatch } from "redux";
export const setChats = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get("http://localhost:4000/get-chats/");
      dispatch({
        type: ActionTypes.SET_CHATS,
        payload: response.data,
      });
    } catch (error) {
      console.error("Error creating chat:", error);
    }
  };
};

export const createChat = (chatData: any) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post("http://localhost:4000/create-chat/", {
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
      console.error("Error creating chat:", error);
    }
  };
};

export const editChat = (chatData: any) => {
  return async (dispatch: Dispatch) => {
    try {
      await axios.put(`http://localhost:4000/update-chat/${chatData.chatId}/`, {
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
      console.error("Error editing chat:", error);
    }
  };
};

export const deleteChat = (chatData: any) => {
  return async (dispatch: Dispatch) => {
    try {
      await axios.delete(
        `http://localhost:4000/delete-chat/${chatData.chatId}`
      );
      dispatch({
        type: ActionTypes.DELETE_CHAT,
        payload: chatData.chatId,
      });
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };
};

export const connectChat = (chatId: string, userId: string) => ({
  type: ActionTypes.CONNECT_CHAT,
  payload: { chatId, userId },
});
