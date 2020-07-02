/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import {StyleSheet, TouchableOpacity,} from 'react-native'
import PropTypes from 'prop-types';

import colors from "../constants/colors";

import Icon from "react-native-vector-icons/MaterialIcons";

const callButton = (props) => {
  const {type = 'Accept', size=30} = props; // TODO: make reject red button here
  return (
    <TouchableOpacity
      style={[styles.callButton, styles.shadow, {backgroundColor: colors.acceptGreen}]}
      activeOpacity={0.7}
      onPress={props.onPress}
    >
      <Icon name="call" color="white" size={size}/>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
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
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35
  },
});

export default callButton;