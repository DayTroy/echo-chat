import { ActionTypes } from "./types";

const initialState = {
  chats: [],
};
const chatReducer = (state = initialState, action: any) => {
    switch (action.type) {
      case 'CREATE_CHAT':
        const newChat = { /* create new chat details */ };
        return {
          ...state,
          chats: [...state.chats, newChat],
        };
      // Handle other actions if needed
  
      default:
        return state;
    }
  };  

export default chatReducer;
