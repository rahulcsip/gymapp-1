import axios from "./config";
import {validateResponseCode} from "../utils/utils";

export const createPackage = async ({title, noOfSessions, price, description}) => {
  try {
    let response = await axios.post(`/package/create`, {
      title,
      noOfSessions,
      price,
      description
    });
    if (validateResponseCode(response.status)) {
      return response.data;
    } else
      return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const getPackage = async (packageId) => {
  try {
    let response = await axios.get(`/package/${packageId}`);
    if (validateResponseCode(response.status)) {
      return response.data;
    } else
      return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const updatePackage = async (packageId, {title, noOfSessions, price, description}) => {
  try {
    let response = await axios.put(`/package/${packageId}`, {
      title,
      noOfSessions,
      price,
      description
    });
    if (validateResponseCode(response.status)) {
      return response.data;
    } else
      return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const deletePackage = async (packageId) => {
  try {
    let response = await axios.delete(`/package/${packageId}`);
    if (validateResponseCode(response.status)) {
      return response.data;
    } else
      return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export const syncSlots = async (slotArray) => {
  try {
    let response = await axios.post(`/slot/createOrUpdate`, slotArray);
    if (validateResponseCode(response.status)) {
      return response.data;
    } else
      return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}