/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import {StyleSheet, Text, View} from 'react-native'
import PropTypes from 'prop-types';
import {AirbnbRating} from 'react-native-ratings';
import {spacing} from "../../constants/dimension";

import HitsList from '../HitsList';
import ExpandingText from "../ExpandingText";
import {userTypes} from "../../constants/appConstants";
import colors, {appTheme} from "../../constants/colors";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import {toTitleCase} from "../../utils/utils";
import Avatar from "../Avatar";
import CallButton from '../callButton';
import CommentList from './CommentList'
import PostCardList from './PostCardList';
import CreatePost from './CreatePost';
const ProfileOverview = (props) => {
  const {hits} = props;
  return (
    <View style={styles.container}>

      <View style={styles.profileHeader}>
        <View style={styles.profileTitle}>
          <Text style={styles.displayName}>{toTitleCase(props.name)}</Text>
          <Text style={styles.location}>{toTitleCase(props.location)}</Text>
          {
            props.userType === userTypes.TRAINER && (
              <AirbnbRating
                count={5}
                showRating={false}
                defaultRating={props.rating}
                starContainerStyle={styles.rating}
                size={12}
                isDisabled={true}
              />
            )
          }
        </View>
        <View style={styles.avatarContainer}>
          <Avatar url={props.dpUrl} size={spacing.thumbnailMed}/>
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <ExpandingText
          style={{color: 'white'}}>
          {props.description}</ExpandingText>
      </View>
      <View style={styles.profileHitsContainer}>
        <HitsList hits={props.hits}/>
        {
          props.initiateVideoCallCallback && (
            <View style={styles.callButtonContainer}>
              <CallButton onPress={props.initiateVideoCallCallback}/>
            </View>
          )
        }
      </View>


    </View>
  );
}

ProfileOverview.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  dpUrl: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  enrollCallback: PropTypes.func,
  initiateVideoCallCallback: PropTypes.func,
  userType: PropTypes.string
};

ProfileOverview.defaultProps = {
  name: 'Sangeetha Thevar',
  location: 'Bangalore',
  dpUrl: Math.random() > 0.5 ? 'https://i.ya-webdesign.com/images/people-standing-png-4.png' : 'https://www.pngitem.com/pimgs/m/28-288789_transparent-png-person-standing-standing-png-download.png',
  hits: {
    followers: 555,
    following: 19,
    transformations: 161,
    rating: 4.6,
  },
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum sapien neque, auctor sit amet odio sit amet, euismod placerat augue. Aenean molestie est neque, quis commodo leo semper sit amet. Mauris nec neque et ex posuere viverra. Sed auctor faucibus nisi sit amet varius. Nullam lacinia, nulla sed pulvinar scelerisque, est libero pulvinar ligula, et auctor eros ipsum vel tortor. Vivamus massa neque, ullamcorper in purus at, placerat euismod est. Aliquam sodales neque et malesuada finibus. Aliquam libero tortor, venenatis sit amet dapibus ac, rhoncus in quam. Pellentesque pretium eros justo, nec accumsan dolor facilisis sed. Sed et augue ut lorem rhoncus ultrices. Duis condimentum aliquet finibus. Praesent iaculis justo ut elit feugiat ultricies. Nulla consequat diam elit, a auctor urna convallis gravida. Nulla facilisi. Sed porttitor pulvinar sapien sed venenatis.',
  speciality: ['Fat-loss', 'Transformation', 'General well being'],
  profileType: 'TRAINER',
  // userOnline:false
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appTheme.darkBackground,
    width: '100%',
    borderRadius: 20,
    borderColor: 'transparent',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    marginTop: -20,
    paddingLeft: spacing.large,
    paddingRight: spacing.large
  },
  displayName: {
    color: 'white',
    fontSize: fontSizes.h0,
    fontFamily: fonts.MontserratMedium
  },
  location: {
    color: appTheme.grey,
    fontSize: fontSizes.h1,
    fontFamily: fonts.MontserratMedium
  },
  profileHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.medium_lg
  },
  rating: {
    marginTop: spacing.medium_sm,
    // marginLeft: -25 //accomodating for default margin of 25 in the package //TODO:change airbnb to rating import
  },
  profileTitle: {},
  avatarContainer: {
    marginTop: -spacing.medium_lg - (spacing.thumbnailMed / 6) //Bring some of it out of container
  },
  profileHitsContainer: {
    marginTop: spacing.medium_lg,
    flexDirection: 'row'
  },
  descriptionContainer: {
    marginTop: spacing.medium_lg,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  callButtonContainer: {},
});

export default ProfileOverview;