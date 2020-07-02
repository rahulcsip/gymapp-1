/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {useState} from 'react';
import {ImageBackground, LayoutAnimation, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import PropTypes from 'prop-types';
import strings from "../../constants/strings";
import {spacing} from "../../constants/dimension";

import fonts from "../../constants/fonts";
import fontSizes from "../../constants/fontSizes";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import {getRandomImage} from "../../constants/images";
import colors, {appTheme, darkPallet} from "../../constants/colors";

const toggleAnimation = (callback, value) => {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  callback(value)
}

const PackageOverview = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const chevron = !collapsed ? 'chevron-up' : 'chevron-down';
  const [imageSrc] = useState(getRandomImage());

  const EditButtons = ()=> (
    <View style={styles.editContainer}>
      <TouchableOpacity
        style={styles.enrollButton}
        onPress={props.editCallback}
        hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
      >
        <Entypo
          name={'edit'}
          color={'white'}
          size={24}
        />
      </TouchableOpacity>
      <TouchableOpacity style={{marginLeft:spacing.medium}} onPress={props.deleteCallback} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
      >
        <FontAwesome
          name={'trash'}
          color={colors.rejectRed}
          size={25}
        />
      </TouchableOpacity>
    </View>
  )

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={() => toggleAnimation(setCollapsed, !collapsed)}>
      <ImageBackground
        style={styles.container}
        blurRadius={4}
        borderRadius={12}
        source={imageSrc}>
        <View style={[styles.textContainer, {flexDirection: 'row', justifyContent: 'space-between'}]}>
          <Text style={styles.title}>{props.title}</Text>
          <FontAwesome
            name={chevron}
            color={'white'}
            size={12}
            style={{marginTop: spacing.small}}
          />
        </View>
        {
          !collapsed && (
            <>
              <View style={styles.textContainer}>
                <Text style={styles.description}>{props.description}</Text>
              </View>
            </>
          )
        }
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>{props.sessionCount} {strings.SESSIONS}</Text>

          <Text style={styles.price}>{strings.RUPEE} {props.price}</Text>
          {
            props.enrollCallback && !collapsed && (
              <TouchableOpacity style={styles.enrollButton}>
                <Text style={styles.enroll}>{strings.ENROLL}</Text>
              </TouchableOpacity>
            )
          }
          {
            props.editCallback && !collapsed && (
              <EditButtons/>
            )
          }

        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
}

PackageOverview.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  callback: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    padding: spacing.medium,
    borderRadius: 12,
    paddingLeft: spacing.large,
    paddingRight: spacing.large,
    // justifyContent:'center'
  },
  textContainer: {
    marginBottom: spacing.medium_sm
  },
  title: {
    color: 'white',
    fontFamily: fonts.RobotoRegular,
    fontSize: fontSizes.h0
  },
  subtitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  subtitle: {
    color: 'white',
    fontFamily: fonts.RobotoRegular,
    fontSize: fontSizes.h2
  },
  price: {
    color: 'white',
    fontFamily: fonts.RobotoBold,
    fontSize: fontSizes.h1
  },
  description: {
    color: 'white',
    fontFamily: fonts.RobotoRegular,
    fontSize: fontSizes.h2
  },
  enrollButton: {
    // backgroundColor:darkPallet.pink,

    // padding:spacing.small,
    // borderRadius: 10
  },
  enroll: {
    color: 'white',
    // borderRadius: 5,
    // borderWidth:1,
    // padding:5,
    // borderColor:appTheme.brightContent,
    fontFamily: fonts.RobotoBold,
    fontSize: fontSizes.h1
  },
  editContainer: {
    flexDirection: 'row'
  }
});

export default PackageOverview;