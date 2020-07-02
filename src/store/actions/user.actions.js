import * as actionTypes from "./actionTypes";
import {updateAxiosToken} from "../../API";
import {userTypes} from "../../constants/appConstants";
import {signOutFirebase} from "../../API/firebaseMethods";
import * as API from "../../API";
import {setTrainers} from "./app.actions";
import {setPackages} from "./trainer.actions";

export const genericUserFieldSetter = (payload) => ({ // TODO: refactor this function into multiple specific setters
  type: actionTypes.GENERIC_USER_FIELD_SET,
  payload
})

export const setUserType = (userType = userTypes.USER) => ({
  type: actionTypes.SET_USER_TYPE,
  payload: {
    userType
  }
})
export const setInitialLoginOff = () => ({
  type: actionTypes.SET_INITIAL_LOGIN_OFF,
  payload: {
    initialLogin: false
  }
})

export const setAuthTokenAction = (authToken) => ({
  type: actionTypes.SET_AUTH_TOKEN,
  payload: {
    authToken
  },
});

export const setAuthToken = (authToken) => {
  return async (dispatch) => {
    dispatch(setAuthTokenAction(authToken));
    updateAxiosToken(authToken);
  };
};

export const resetUser = () => ({
  type: actionTypes.RESET_USER,
});

export const signOutUser = () => {
  return async (dispatch) => {
    dispatch(resetUser());
    signOutFirebase();
  };
};


export const setUserName = (userName) => ({
  type: actionTypes.SET_USER_NAME,
  payload: {
    userName
  },
});

export const setUserData = (userData) => ({
  type: actionTypes.SET_USER_DATA,
  payload: {
    userData
  },
});

export const updateUserData = () => {
  return async (dispatch) => {
    try {
      let {user} = await API.getMyInfo();
      if (!user) throw new Error("No user returned");
      dispatch(setUserData(user));
      let {name} = user;
      if (!!name)
        dispatch(setUserName(name));

      if (user.userType === userTypes.TRAINER) {
        const {packages} = user;
        // if(packages)
        dispatch(setPackages(packages));
      }

    } catch (error) {
      console.log("User info update failed", error);
    }
  };
};