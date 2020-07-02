/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {connect} from "react-redux";
import FastImage from 'react-native-fast-image'

import ProfileOverview from '../../components/Profile/ProfileOverview';
import RouteNames from "../../navigation/RouteNames";
import * as actionCreators from '../../store/actions';
import Splash from "../Auth/Splash";
import requestCameraAndAudioPermission from "../../utils/permission";
import {initialiseVideoCall} from "../../utils/utils";
import {appTheme} from "../../constants/colors";
import {screenHeight, screenWidth} from '../../utils/screenDimensions';
import strings from "../../constants/strings";
import {userTypes} from "../../constants/appConstants";
import {getRandomImage} from "../../constants/images";

const STATUS_BAR_HEIGHT = 0;
const HEADER_HEIGHT = 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

class Profile extends Component {

  state = {
    bgImage:getRandomImage()
  }
  componentDidMount() {
    const {route, setUser} = this.props;
    const {userId} = route.params;
    setUser(userId);
  }

  enrollClicked = () => {
    const {navigation, route} = this.props;
    const {userId} = route.params;
    navigation.navigate(RouteNames.Packages, {
      userId
    });
  }

  callClicked = async () => {
    const {route} = this.props;
    const {userId} = route.params;
    const permissionGranted = await requestCameraAndAudioPermission();

    if (permissionGranted) {
      await initialiseVideoCall(userId);
    } else console.log("Cant initiate video call without permission");
  }

  renderContent = () => {
    const {route, users} = this.props;


    const {userId} = route.params;
    const user = users[userId];
    if (!user) return (
      <View style={styles.container}/>
    )
    let {name, userType, experience, rating, displayPictureUrl} = user;
    if (!displayPictureUrl) displayPictureUrl = this.state.bgImage;
    const userHits = [
      {
        title: strings.POSTS,
        count: 5
      },
      {
        title: strings.SUBSCRIPTIONS,
        count: 1
      }
    ]
    const trainerHits = [
      {
        title: strings.POSTS,
        count: 5
      },
      {
        title: strings.MAKEOVERS,
        count: experience
      },
      {
        title: strings.PROGRAMS,
        count: 4
      },
      {
        title: strings.SLOTS,
        count: 3
      }
    ]
    return (
      // <View style={styles.container}>
      <ProfileOverview
        name={name}
        dpUrl={displayPictureUrl}
        hits={userType === userTypes.TRAINER ? trainerHits : userHits}
        rating={rating}
        description={"No description provided for this user"}
        profileType={userType}
        enrollCallback={this.enrollClicked}
        initiateVideoCallCallback={this.callClicked}
        userType={userType}
      />
      // </View>
    )
  }

  render() {
    const {route, users} = this.props;

    const {userId} = route.params;
    const user = users[userId];
    if (!user) return <Splash/>;
    let {displayPictureUrl} = user;
    if (!displayPictureUrl) displayPictureUrl = this.state.bgImage;


    return (
      <ParallaxScrollView
        backgroundColor={appTheme.darkBackground}
        contentBackgroundColor={appTheme.darkBackground}
        parallaxHeaderHeight={screenHeight * 2 / 3}
        renderForeground={() => (
          <FastImage
            style={{width: screenWidth, height: screenHeight}}
            // source={{
            //   uri: defaultDP,
            //   priority: FastImage.priority.normal,
            // }}
            source={this.state.bgImage}
            resizeMode={FastImage.resizeMode.cover}
          />
        )}>
        <this.renderContent/>
      </ParallaxScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: appTheme.darkBackground,
    padding: 0,
    margin: 0
  },
  contentContainer: {
  },
  navContainer: {
    height: HEADER_HEIGHT,
    justifyContent: 'center',
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
  },
  navBar: {
    height: NAV_BAR_HEIGHT,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  titleStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

const mapStateToProps = (state) => ({
  trainers: state.app.trainers,
  users: state.app.users
});

const mapDispatchToProps = (dispatch) => ({
  setUser: (userId) => dispatch(actionCreators.setUser(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);