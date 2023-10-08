import { combineReducers } from 'redux';
import chatReducer from './chat/chatReducer';

const rootReducer = combineReducers({
  chat: chatReducer,
  // Add other module reducers here if you have more
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
