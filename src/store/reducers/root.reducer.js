import {combineReducers} from "redux";
import AsyncStorage from "@react-native-community/async-storage";
import {persistReducer, createMigrate} from "redux-persist";

import auth from "./auth.reducer";
import user from "./user.reducer";
import call from "./call.reducer";
import app from "./app.reducer";
import trainer from './trainer.reducer';
import {callState} from "./initialState";
import * as actionTypes from "../actions/actionTypes";

import postReducer from './postReducer'
import postCreateReducer from './postCreateReducer'
const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage
};

const migrations = {
  0: (state) => {
    return {
      ...state,
      call:callState
    }
  }
}
const rootPersistConfig = {
  key: "root",
  version: 2,
  storage: AsyncStorage,
  blacklist: ["auth"],
  migrate: createMigrate(migrations, {debug: true})
};



const appReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  user,
  app,
  call,
  trainer,
  postReducer,
  postCreateReducer
});

const rootReducer = (state, action) => {
  if (action.type === actionTypes.RESET_APP) {
    state = undefined
  }
  return appReducer(state, action)
}

export default persistReducer(rootPersistConfig, rootReducer);
