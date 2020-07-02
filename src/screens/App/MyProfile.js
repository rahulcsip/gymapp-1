/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {StyleSheet} from 'react-native'
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import {connect} from "react-redux";
import FastImage from 'react-native-fast-image'

import ProfileOverview from '../../components/Profile/ProfileOverview';

import {appTheme} from "../../constants/colors";
import {screenHeight, screenWidth} from '../../utils/screenDimensions';
import strings from "../../constants/strings";
import {userTypes} from "../../constants/appConstants";
import {getRandomImage} from "../../constants/images";

const STATUS_BAR_HEIGHT = 0;
const HEADER_HEIGHT = 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

class MyProfile extends Component {

  state = {
    bgImage: getRandomImage()
  }

  renderContent = () => {
    const user = this.props.userData;

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
      <ProfileOverview
        name={name}
        dpUrl={displayPictureUrl}
        hits={userType === userTypes.TRAINER ? trainerHits : userHits}
        rating={rating}
        description={"No description provided for this user"}
        profileType={userType}
        userType={userType}
      />
      // </View>
    )
  }

  render() {

    const {userData} = this.props;
    console.log(userData)
    let {displayPictureUrl} = userData;
    if (!displayPictureUrl) displayPictureUrl = defaultDP;

    return (
      <ParallaxScrollView
        backgroundColor={appTheme.darkBackground}
        contentBackgroundColor={appTheme.darkBackground}
        parallaxHeaderHeight={screenHeight * 2 / 3}
        renderForeground={() => (
          <FastImage
            style={{width: screenWidth, height: screenHeight}}
            // source={{
            //   uri: displayPictureUrl,
            //   priority: FastImage.priority.normal,
            // }}
            source={this.state.bgImage}
            resizeMode={FastImage.resizeMode.cover}
          />
        )}>
        <this.renderContent/>
      </ParallaxScrollView>

    )
    return (
      <this.renderContent/>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: appTheme.darkBackground,
    padding: 0,

    margin: 0
    // flex: 1,
    // backgroundColor: 'transparent'
  },
  contentContainer: {
    // flexGrow: 1,
  },
  navContainer: {
    height: HEADER_HEIGHT,
    // alignItems: 'center',
    justifyContent: 'center',
    // marginHorizontal: 10,
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
    // backgroundColor: 'transparent',
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
  userData: state.user.userData
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);