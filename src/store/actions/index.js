export {
  setAuthenticated,
  resetAuth,
  syncFirebaseAuth
} from "./auth.actions";

export {
  setAuthToken,
  resetUser,
  setUserType,
  setInitialLoginOff,
  updateUserData
} from "./user.actions";

export {
  setIncomingCall,
  endCallAction as endCall,
  setCallActive,
  resetInAppCall
} from './call.actions';

export {
  setTrainers,
  updateTrainers,
  setUser
} from "./app.actions";

export {
  createPackage,
  deletePackage,
  createSlots
} from './trainer.actions'