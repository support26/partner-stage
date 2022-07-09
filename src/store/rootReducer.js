import { combineReducers } from 'redux';

import Auth from './auth/reducer';
//import message from "store/auth/message";

const rootReducer = combineReducers({
    auth: Auth,
    // message: message
});

export default rootReducer;