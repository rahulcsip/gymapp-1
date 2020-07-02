import {combineReducers} from "redux";
import AsyncStorage from "@react-native-community/async-storage";
import {persistReducer, createMigrate} from "redux-persist";

import auth from "./auth.reducer";
import user from "./user.reducer";
import call from "./call.reducer";
import app from "./app.reducer";
import trainer from './trainer.reducer';
import {callState} from "./initialState";


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



const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, auth),
  user,
  app,
  call,
  trainer
});

export default persistReducer(rootPersistConfig, rootReducer);
