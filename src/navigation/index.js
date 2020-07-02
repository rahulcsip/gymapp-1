import React from 'react';
import {AppState} from 'react-native';
import {connect} from "react-redux";
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';

import * as actionCreators from '../store/actions';

import VideoTest from './stacks/videoTestStack';
import Splash from './stacks/splashStack';
import InitialLogin from './stacks/initialLoginStack';
import Auth from './stacks/authStack';
import Calling from './stacks/callingStack';
import RootDrawer from './drawer/rootDrawer';

import {updateAxiosToken} from "../API";

import {navigationRef} from './RootNavigation';
import {storageKeys, videoTestMode} from "../constants/appConstants";
import {callHandler, configureFCMNotification} from "../utils/notification";
import {deleteFromStorage, readFromStorage} from "../utils/utils";
import RoundedFas from "../components/RoundedFas";

messaging().setBackgroundMessageHandler(callHandler);
configureFCMNotification();

class App extends React.Component {
  state = {
    loading: true,
    videoTestMode, // set this to true to enter video testing mode,
  }

  async componentDidMount() {
    // this.props.resetUser();this.props.resetAuth()
    const {setAuthenticated, setIncomingCall} = this.props;
    setAuthenticated(false); // TODO: Remove this line and fix auth blacklisting
    this.authSubscriber = auth().onAuthStateChanged(this.onAuthStateChanged);
    this.syncing = false;
    await this.checkCallData();
    AppState.addEventListener("change", this._handleAppStateChange);
    messaging().onMessage(async remoteMessage => {
      console.log("Remote message received in app", remoteMessage);
      this.props.setIncomingCall(remoteMessage.data, true);
    })
  }

  checkCallData = async () => {
    const callData = await readFromStorage(storageKeys.PENDING_CALL);
    if (callData) {
      deleteFromStorage(storageKeys.PENDING_CALL);
      this.props.setIncomingCall(callData);
      console.log("Set call data", callData);
    }
  }

  _handleAppStateChange = nextAppState => {
    if (nextAppState === 'active') {
      this.checkCallData();
    }
  };

  onAuthStateChanged = async (user) => {
    const {authToken, setAuthenticated, syncFirebaseAuth} = this.props;
    console.log("Auth state changed", user);
    let fcmToken = await messaging().getToken();
    console.log('fcm', fcmToken)
    if (user) {
      if (!!authToken) {
        console.log('authToken present, going home');
        updateAxiosToken(authToken);
        setAuthenticated(true);
      } else {
        console.log("No auth token, getting one");
        let fcmToken = await messaging().getToken();
        let idToken = await auth().currentUser.getIdToken(true);
        let authSuccess;
        if (this.syncing == false) {
          this.syncing = true; // avoid multiple api calls
          authSuccess = await syncFirebaseAuth(idToken, fcmToken);
        }
        this.syncing = false;

        if (authSuccess)
          setAuthenticated(true);
        else {
          //TODO:Handle this case
        }
      }
    } else {
      setAuthenticated(false);
    }
    if (this.state.loading)
      this.setState({loading: false});
  }

  render() {
    const {loading, videoTestMode} = this.state;
    const {authenticated, initialLogin, callData, callActive} = this.props;

    if (loading)
      return <Splash/>
    if (videoTestMode)
      return <VideoTest navigationRef={navigationRef}/>
    if (callData &&  Object.keys(callData).length !== 0 || callActive) {
      return <Calling navigationRef={navigationRef}/>
    }
    if (authenticated) {
      if (initialLogin)
        return <InitialLogin navigationRef={navigationRef}/>
      else
        return <RootDrawer navigationRef={navigationRef}/>
    }
    return <Auth navigationRef={navigationRef}/>
  }
}

const mapStateToProps = (state) => ({
  authToken: state.user.authToken,
  authenticated: state.auth.authenticated,
  initialLogin: state.user.initialLogin,
  callActive: state.call.callActive,
  callData: state.call.callData
});

const mapDispatchToProps = (dispatch) => ({
  resetAuth: () => dispatch(actionCreators.resetAuth()),
  resetUser: () => dispatch(actionCreators.resetUser()),
  setAuthenticated: (value) => dispatch(actionCreators.setAuthenticated(value)),
  syncFirebaseAuth: (idToken, fcmToken) => dispatch(actionCreators.syncFirebaseAuth(idToken, fcmToken)),
  setIncomingCall: (callData, inAppCall) => dispatch(actionCreators.setIncomingCall(callData, inAppCall))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);