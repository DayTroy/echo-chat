import { ActionTypes } from "./chatActionTypes";
import { Chat } from "../../shared/interfaces/Chat";

const initialState = {
  chats: [],
};

const chatReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.SET_CHATS:
      return {
        ...state,
        chats: action.payload,
      };
    case ActionTypes.CREATE_CHAT:
      return {
        ...state,
        chats: [...state.chats, action.payload],
      };
    case ActionTypes.EDIT_CHAT:
      return {
        ...state,
        chats: state.chats.map((chat: Chat) =>
          chat.id === action.payload.id
            ? { ...chat, title: action.payload.title }
            : chat
        ),
      };
    case ActionTypes.DELETE_CHAT:
      return {
        ...state,
        chats: state.chats.filter((chat: Chat) => chat.id !== action.payload),
      };
    default:
      return state;
  }
};

export default chatReducer;
