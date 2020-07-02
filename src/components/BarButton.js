import FontAwesome from "react-native-vector-icons/Entypo";
import {appTheme} from "../constants/colors";
import {spacing} from "../constants/dimension";
import {TouchableOpacity} from "react-native";
import React from "react";
import PropTypes from "prop-types";

const barButton = ({onPress, name='plus'})=> {
  return (
    <TouchableOpacity onPress={onPress}>
      <FontAwesome
        name={name}
        color={'white'}
        size={30}
        style={{backgroundColor: appTheme.lightBackground, borderRadius: 200, padding: spacing.small}}
      />
    </TouchableOpacity>
  )
}

barButton.propTypes = {
  onPress: PropTypes.func,
  name: PropTypes.string
};

export default barButton;