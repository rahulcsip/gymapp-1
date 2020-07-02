import {authState as initialState} from './initialState';
import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../../utils/utils";

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_AUTHENTICATED:
      return updateObject(state, action.payload);
    case actionTypes.RESET_AUTH:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
