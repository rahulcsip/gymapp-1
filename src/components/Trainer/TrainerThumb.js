/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types';
import {AirbnbRating} from "react-native-ratings";

import Avatar from '../Avatar';
import strings from "../../constants/strings";

import {spacing} from "../../constants/dimension";
import {toTitleCase} from "../../utils/utils";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import {appTheme} from "../../constants/colors";
import HitsList from "../HitsList";
import PackagePreviewList from './PackagePreviewList';

const trainerThumb = (props) => {
  const hits = [
    {
      title: strings.POSTS,
      count: props.postCount || 5
    },
    {
      title: strings.MAKEOVERS,
      count: 5
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
    <View>
      <TouchableOpacity onPress={props.onPress} activeOpacity={0.7}>
        <View style={styles.mainTitle}>
          <View style={styles.dpContainer}>
            <Avatar roundedMultiplier={4} size={spacing.thumbnailMini} url={props.dpUrl}/>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.displayName}>{toTitleCase(props.name)}</Text>
            <Text style={styles.location}>{toTitleCase(props.location)}</Text>
          </View>
        </View>

        <View style={styles.extraContent}>
          <HitsList hits={hits} size={fontSizes.h3}/>
        </View>

      </TouchableOpacity>

      <View style={styles.packageListContainer}>
        <PackagePreviewList packages={props.packages}/>
      </View>
    </View>
  );
}

trainerThumb.propTypes = {
  name: PropTypes.string.isRequired,
  experience: PropTypes.number.isRequired,
  dpUrl: PropTypes.string.isRequired,
  slots: PropTypes.shape({
    used: PropTypes.number.isRequired,
    remaining: PropTypes.number.isRequired
  }),
  rating: PropTypes.number.isRequired
};

const styles = StyleSheet.create({
  mainTitle: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  displayName: {
    color: 'white',
    fontSize: fontSizes.h1,
    fontFamily: fonts.PoppinsSemiBold
  },
  location: {
    color: appTheme.grey,
    fontSize: fontSizes.h3,
    fontFamily: fonts.PoppinsMedium
  },
  dpContainer: {
    marginBottom: spacing.small
  },
  textContainer: {
    paddingTop: spacing.small,
    paddingBottom: spacing.small,
    marginLeft: spacing.medium_lg,
    marginRight: 'auto'
  },
  callButtonContainer: {
    marginLeft: 'auto'
  },
  extraContent: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: spacing.small,
    marginLeft: spacing.small
  },
  packageListContainer: {
    width: '100%',
    marginTop: spacing.medium_sm,
    // backgroundColor:appTheme.grey,
    padding: spacing.small,
    zIndex: 100
  },
  hitsContainer: {
    marginLeft: 'auto',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  hits: {
    marginRight: spacing.medium_sm
  },
  plan: {
    color: appTheme.brightContent,
    fontSize: fontSizes.h5,
    fontFamily: fonts.PoppinsRegular,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: appTheme.brightContent,
    width: spacing.thumbnailMini,
    textAlign: 'center'
  },
  bioContainer: {
    marginLeft: spacing.medium_lg,
    width: '60%'
  },
  rating: {
    // marginTop: spacing.small,
  },
  experienceContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  }


});

export default trainerThumb;