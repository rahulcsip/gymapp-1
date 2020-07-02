import {trainerState as initialState} from './initialState';
import * as actionTypes from '../actions/actionTypes';
import {updateObject} from "../../utils/utils";


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_PACKAGES:
      return updateObject(state, action.payload);
    case actionTypes.UPDATE_PACKAGE: {
      const {packageData} = action.payload;
      let packages = [...state.packages];
      let filteredPackages = packages.filter(packageObj => packageObj._id === packageData._id);
      if (filteredPackages.length === 0) {
        packages.push(packageData); // does not exist, add it
      } else {
        packages = packages.map(packageObj => packageObj._id === packageData._id ? packageData : packageObj); //update the package
      }
      return updateObject(state, {packages});
    }
    case actionTypes.REMOVE_PACKAGE: {
      const {packageId} = action.payload;
      let packages = [...state.packages];
      let filteredPackages = packages.filter(packageObj => packageObj._id !== packageId);
      return updateObject(state, {packages: filteredPackages});
    }
    case actionTypes.SET_SLOTS:
      return updateObject(state, action.payload);

    default:
      return state;
  }
};

export default reducer;
