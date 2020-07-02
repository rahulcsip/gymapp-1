/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import {Text, StyleSheet, View} from 'react-native'
import PropTypes from 'prop-types';
import fontSizes from "../constants/fontSizes";
import {appTheme} from "../constants/colors";
import fonts from "../constants/fonts";

const Hits = (props) => {
  const {count, property, size = fontSizes.h0} = props;
  return (
    <View style={styles.container}>
      <Text style={[styles.count, {fontSize: size}]}>
        {count}
      </Text>
      {/* scale it down consistently*/}
      <Text style={[styles.property, {fontSize: size / 1.574}]}>
        {property}
      </Text>
    </View>
  );
}

Hits.propTypes = {
  count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  property: PropTypes.string.isRequired,
  size: PropTypes.number
};

const styles = StyleSheet.create({
  count: {
    color: 'white',
    paddingLeft: 0,
    fontFamily: fonts.MontserratSemiBold
  },
  property: {
    paddingLeft: 0,
    color: 'lightgrey',
    fontFamily: fonts.MontserratMedium

  }
});

export default Hits;