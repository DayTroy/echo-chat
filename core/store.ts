import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // Use any middleware you need
import rootReducer from './rootState';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
