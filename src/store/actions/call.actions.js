import * as actionTypes from "./actionTypes";

import {customDelay} from "../../utils/utils";

export const setIncomingCall = (callData, inAppCall=false) => ({
  type: actionTypes.SET_INCOMING_CALL,
  payload: {
    callData,
    inAppCall
  }
});

export const setCallActive = (value) => ({
  type: actionTypes.SET_CALL_ACTIVE,
  payload: {
    callActive: value
  }
});

export const endCall = () => ({
  type: actionTypes.END_CALL,
  payload: {
    callData: {},
    callActive: false
  }
})

export const resetInAppCall = ()=> ({
  type: actionTypes.END_CALL,
  payload: {
    inAppCall: false
  }
})

export const endCallAction = () => {
  return async (dispatch) => {
    await dispatch(endCall());
    await customDelay(100); //allow it to change state
    return true;
  };
};
