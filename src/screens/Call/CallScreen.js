import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  ImageBackground
} from 'react-native';
import RNExitApp from "react-native-exit-app";
import Icon from 'react-native-vector-icons/MaterialIcons';

const PushNotification = require("react-native-push-notification");
import requestCameraAndAudioPermission from "../../utils/permission";
import RouteNames from "../../navigation/RouteNames";

import CallBackground from '../../../assets/images/callBackground.png';
import DefaultUser from '../../../assets/images/defaultUser.png';

import {connect} from "react-redux";
import * as actionCreators from "../../store/actions";
import {screenWidth} from "../../utils/screenDimensions";
import colors, {appTheme} from "../../constants/colors";
import {spacing} from "../../constants/dimension";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";

class CallScreen extends Component {

  rejectCall = async () => {
    PushNotification.cancelAllLocalNotifications();
    await this.props.endCall();
    if (this.props.inAppCall === false)
      RNExitApp.exitApp();
    else this.props.resetInAppCall();
  }

  acceptCall = async () => {
    const {callData, setCallActive, navigation} = this.props;
    const {agoraAppId, sessionId} = callData;

    PushNotification.cancelAllLocalNotifications();

    const permissionGranted = await requestCameraAndAudioPermission();
    if (!permissionGranted) return;
    setCallActive();
    navigation.replace(RouteNames.VideoCall, {
      AppID: agoraAppId,
      ChannelName: sessionId
    });
  }
  callStart = () => (
    <Icon name="call" color="white" size={30}/>
  );
  callEnd = () => (
    <Icon name="call-end" color="white" size={30}/>
  );


  render() {
    const {callData} = this.props;
    let {dpUrl, displayName} = callData;
    let imgSource = !!dpUrl ? {uri: dpUrl} : DefaultUser;
    if (!!!displayName) displayName = 'User';

    return (
      <ImageBackground source={CallBackground} style={styles.container}>

        <View style={styles.imageContainer}>
          <Image style={[styles.image]} source={imgSource}/>
        </View>
        <View style={styles.textContent}>
          <Text style={styles.text}>{displayName}</Text>
        </View>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.callButton, styles.shadow, {backgroundColor: colors.rejectRed}]}
            activeOpacity={0.8}
            onPress={this.rejectCall}>
            <this.callEnd/>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.callButton, styles.shadow, {backgroundColor: colors.acceptGreen}]}
            activeOpacity={0.8}
            onPress={this.acceptCall}>
            <this.callStart/>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: screenWidth / 1.8,
    height: screenWidth / 1.8,
    borderRadius: 8
  },
  imageContainer: {
    margin: spacing.medium_sm,
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonGroup: {
    flex: 2,
    width: screenWidth / 1.6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  textContent: {
    flex: 0.1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: fontSizes.bigTitle,
    fontFamily: fonts.MontserratMedium
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  callButton: {
    height: 65,
    width: 65,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35
  },
});

const mapStateToProps = (state) => ({
  callData: state.call.callData,
  inAppCall: state.call.inAppCall
});

const mapDispatchToProps = (dispatch) => ({
  endCall: () => dispatch(actionCreators.endCall()),
  setCallActive: () => dispatch(actionCreators.setCallActive(true)),
  resetInAppCall: () => dispatch(actionCreators.resetInAppCall())
});

export default connect(mapStateToProps, mapDispatchToProps)(CallScreen);