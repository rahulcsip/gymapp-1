import {userState as initialState} from './initialState';
import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../../utils/utils";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_INCOMING_CALL:
      return updateObject(state, action.payload);
    case actionTypes.END_CALL:
      return updateObject(state, action.payload);
    case actionTypes.SET_CALL_ACTIVE:
      return updateObject(state, action.payload);

    default:
      return state;
  }
};

export default reducer;
