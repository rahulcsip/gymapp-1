/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import {Text, StyleSheet, TouchableOpacity, View, FlatList} from 'react-native'
import PropTypes from 'prop-types';
import colors, {appTheme} from "../constants/colors";
import {spacing} from "../constants/dimension";

import SelectableButton from "./selectableButton";
import Appointment from "./Appointment";
import {Card} from "native-base";

const selectableButtonGroup = (props) => {

  const renderButton = (text) => {
    return <SelectableButton
      textContent={text}
      onPress={() => props.onSelect(text)}
      selected={props.selected === text}
      activeStyle={props.activeStyle}
    />
  }

  const {containerStyle} = props;
  return (
    <View style={[styles.default, containerStyle]}>
      <FlatList
        // style={styles.container}
        data={props.data}
        horizontal={true}
        // contentContainerStyle={styles.appointmentList}
        renderItem={({item}) => renderButton(item)}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )

}

selectableButtonGroup.propTypes = {
  // textContent: PropTypes.string.isRequired,
  // callback: PropTypes.func
};

const styles = StyleSheet.create({
  default: {
    backgroundColor: appTheme.content,
    borderRadius: 6,
    padding: spacing.medium_sm,
    paddingLeft: spacing.medium_sm,
    paddingRight: spacing.medium_sm
  },

});

export default selectableButtonGroup;