import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { ActionTypes } from './types';
import { RootState } from './../reducers';

interface CreateChatAction {
  type: ActionTypes.CREATE_CHAT;
  payload: any;
}

export const createChat = () => ({
  type: 'CREATE_CHAT',
});
