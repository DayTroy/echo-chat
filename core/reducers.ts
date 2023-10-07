import { combineReducers } from 'redux';
import chatReducer from './chat/chatReducer';

const rootReducer = combineReducers({
  chat: chatReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
