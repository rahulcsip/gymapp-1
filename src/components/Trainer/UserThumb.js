/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types';

import Avatar from '../Avatar';
import GenericText from "../GenericText";
import CallButton from '../callButton';
import {spacing} from "../../constants/dimension";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";
import {toTitleCase} from "../../utils/utils";
import {appTheme} from "../../constants/colors";
import ExpandingText from "../ExpandingText";
import Hits from "../Hits";
import HitsList from "../HitsList";
import strings from "../../constants/strings";

const userThumb = (props) => {
  const hits = [
    {
      title: strings.POSTS,
      count: props.postCount || 5
    },
    {
      title: strings.SUBSCRIPTIONS,
      count: props.subscriptionCount || 1
    }
  ]
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.titleContent}>
        <View style={styles.dpContainer}>
          <Avatar roundedMultiplier={4} size={spacing.thumbnailMini} url={props.dpUrl}/>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.displayName}>{toTitleCase(props.name)}</Text>
          <Text style={styles.location}>{toTitleCase(props.location)}</Text>
        </View>

      </View>

      <View style={styles.extraContent}>
        <Text style={styles.plan}>{props.plan}</Text>
        <View style={styles.hitsContainer}>
          <HitsList hits={hits} size={fontSizes.h3}/>
        </View>
      </View>
    </TouchableOpacity>
  );
}

userThumb.propTypes = {
  name: PropTypes.string.isRequired,
  dpUrl: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  postCount: PropTypes.number.isRequired,
  subscriptionCount: PropTypes.number.isRequired
};

const styles = StyleSheet.create({
  titleContent: {
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
    // marginBottom: spacing.small
  },
  textContainer: {
    paddingTop: spacing.small,
    // paddingBottom: spacing.small,
    marginLeft: spacing.medium_lg,
    marginRight: 'auto'
  },
  hitsContainer: {
    marginLeft: spacing.medium_lg,
  },
  extraContent: {
    alignItems: 'center',
    flexDirection: 'row',
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
});

export default userThumb;