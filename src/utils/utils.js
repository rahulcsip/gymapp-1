// import {showMessage, hideMessage} from "react-native-flash-message";
// import SocketIOClient from "socket.io-client";
// import {CHANNELS, rootURL} from "../constants/appConstants";
import {navigate} from '../navigation/RootNavigation';
import RouteNames from "../navigation/RouteNames";
import AsyncStorage from '@react-native-community/async-storage';

import {makeCall} from "../API";

export const validateResponseCode = (code) => {
  return Math.floor(code / 100) === 2;
};

export const formattedTime = date => {
  let dateObj = new Date(date);
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const AM_PM = hours >= 12 ? 'PM' : 'AM';
  let minZero = minutes === 0 ? '0' : '';
  return `${hours}:${minutes}${minZero} ${AM_PM}`;
}

export const dateToString = time => {
  let dateObj = new Date(time);
  let hours = dateObj.getHours();
  let prependedZeroToHours = hours >= 10 ? '' : '0';
  let minutes = dateObj.getMinutes();
  let prependedZeroToMinutes = minutes >= 10 ? '' : '0';

  return `${prependedZeroToHours}${hours}${prependedZeroToMinutes}${minutes}`;
}

export const stringToDate = time => {
  const hours = parseInt(time.slice(0, 2));
  const minutes = parseInt(time.slice(2));
  let dateObj = new Date();
  dateObj.setHours(hours);
  dateObj.setMinutes(minutes);
  return dateObj;
}


export const saveToStorage = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
    return true;
  } catch (e) {
    console.log("Storing data to storage failed", e);
    return false;
  }
}

export const readFromStorage = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key)
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log("Reading data from storage failed", e);
    return false;
  }
}
export const deleteFromStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
}

export const textSlicer = (text, length) => {
  if (!text) return "";
  if (length < 0) return text;
  if (text.length > length) {
    text = text.slice(0, length) + " ...";
  }
  return text;
};

export const getOSPath = (path) => {
  if (path.includes("content")) return path;
  return Platform.OS === "android" ? "file:/" + path : path;
};

export const updateObject = (oldObject, updatedValues) => {
  return {
    ...oldObject,
    ...updatedValues,
  };
};

export const initialiseVideoCall = async (userId) => {
  let result = await makeCall(userId);
  if (!result) {
    console.log("Call initiate error");
    return false;
  }
  const {sessionId, agoraAppId} = result;
  navigate(RouteNames.VideoCall, {
    AppID: agoraAppId,
    ChannelName: sessionId
  })
}

export const customDelay = (duration) => new Promise((resolve) => setTimeout(resolve, duration));

export const toTitleCase = (str) => {
  return str.replace(
    /\w\S*/g,
    function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}
// coolest snippet i ever found, felt i should link source
// https://www.tutorialspoint.com/most-efficient-method-to-groupby-on-an-array-of-objects-in-javascript
export const groupBy = (objectArray, property) => { // coolest snippet i ever found, felt i should link source
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    // Add object to list for given key's value
    acc[key].push(obj);
    return acc;
  }, {});
}