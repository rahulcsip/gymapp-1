import * as actionTypes from "./actionTypes";
import * as API from "../../API";

export const setPackages = (packages) => ({
  type: actionTypes.SET_PACKAGES,
  payload: {
    packages
  },
});

export const updatePackage = (packageData) => ({
  type: actionTypes.UPDATE_PACKAGE,
  payload: {
    packageData
  },
});

export const createPackage = (packageData) => {
  return async (dispatch, getState) => {
    try {
      const {title, noOfSessions, price, description, _id} = packageData;
      let result = null;
      if (_id) {
        result = await API.updatePackage(_id, {title, noOfSessions, description, price});
        dispatch(updatePackage(packageData)); //optimistic TODO:rollback
        console.log("package updated", result);
      } else {
        result = await API.createPackage({title, noOfSessions, description, price});
        console.log("package created", result);
        const packageData = result.package;
        dispatch(updatePackage(packageData));
      }
      return result;
    } catch (error) {
      console.log("Trainer package creation failed", error);
      return false;
    }
  };
};

export const removePackage = (packageId) => ({
  type: actionTypes.REMOVE_PACKAGE,
  payload: {
    packageId
  },
});

export const deletePackage = (packageId) => {
  return async (dispatch) => {
    try {
      dispatch(removePackage(packageId));
      let result = await API.deletePackage(packageId);
      if (result && result.success) {
        console.log('package deleted', result);
        return true;
      } else {
        //TODO:rollback
        return false;
      }
    } catch (error) {
      console.log("Trainer package deletion failed", error);
      return false;
    }
  };
};


export const setSlots = (slots) => ({
  type: actionTypes.SET_SLOTS,
  payload: {
    slots
  },
});


export const createSlots = (slotArray) => {
  return async (dispatch, getState) => {
    let oldSlots = getState().trainer.slots;
    try {
      dispatch(setSlots(slotArray));
      let slots = await API.syncSlots(slotArray);
      if (slots) {
        console.log('slots created', slots);
        dispatch(setSlots(slots));
        return true;
      } else {
        //TODO: finish this rollback by showing error
        console.log("Trainer slot creation failed", slots);
        dispatch(setSlots(oldSlots));
        return false;
      }
    } catch (error) {
      console.log("Trainer slot creation failed", error);
      dispatch(setSlots(oldSlots));
      return false;
    }
  };
};