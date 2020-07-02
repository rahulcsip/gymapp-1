import axios from "./config";
import {validateResponseCode} from "../utils/utils";

export const listTrainers = async () => {
  try {
    let response = await axios.get('/trainers');
    if (validateResponseCode(response.status)) {
      return response.data;
    } else
      return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const updateUserInfo = async (name) => {
  try {
    let response = await axios.put('/user', {
      name: name
    });
    if (validateResponseCode(response.status)) {
      return response.data;
    } else
      return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getMyInfo = async () => {
  try {
    let response = await axios.get(`/user`);
    if (validateResponseCode(response.status)) {
      return response.data;
    } else
      return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const getUserInfo = async (userId) => {
  try {
    let response = await axios.get(`/user/${userId}`);
    if (validateResponseCode(response.status)) {
      return response.data;
    } else
      return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}