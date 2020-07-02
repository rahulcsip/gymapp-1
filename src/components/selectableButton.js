/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native'
import PropTypes from 'prop-types';
import colors, {appTheme} from "../constants/colors";
import {spacing} from "../constants/dimension";
import LinearGradient from "react-native-linear-gradient";
import fontSizes from "../constants/fontSizes";

const selectableButton = (props) => {
  const {textContent, selected, activeStyle} = props;

  return (
    <TouchableOpacity activeOpacity={0.7}  {...props} >
      {
        selected && (
          <LinearGradient
            colors={appTheme.gradient}
            style={[styles.container, activeStyle]}
            start={{x: 0, y: 0}} end={{x: 1, y: 0}}>
            <Text style={styles.textContentStyle}>{textContent}</Text>
          </LinearGradient>
        )
      }
      {
        !selected && (
          <View style={styles.container}>
            <Text style={styles.textContentStyle}>{textContent}</Text>
          </View>
        )
      }
    </TouchableOpacity>
  );
}

selectableButton.propTypes = {
  // textContent: PropTypes.string.isRequired,
  onPress: PropTypes.func
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: spacing.medium_sm,
    paddingRight: spacing.medium_sm,
    paddingTop: spacing.small,
    paddingBottom: spacing.small_sm,
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 6,
  },
  textContentStyle: {
    color: 'white',
    fontFamily:'Poppins-SemiBold',
    fontSize:fontSizes.h2

  }
});

export default selectableButton;