/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React from 'react';
import PropTypes from 'prop-types';
import colors, {appTheme} from "../constants/colors";
import {StyleSheet, View} from "react-native";
import {Card, Text} from 'native-base';
import Avatar from "./Avatar";
import {spacing} from "../constants/dimension";
import GenericButton from "./GenericButton";
import SelectableButton from "./selectableButton";
import strings from "../constants/strings";

const appointment = (props) => {
  return (
    <Card style={styles.cardStyle}>
      <View style={styles.container}>
        <Avatar
          size={60}
          border={true}
          rounded={false}
          url={props.imageUrl}
        />
        <View style={styles.appointmentDetails}>
          <Text style={styles.displayName}>{props.displayName}</Text>
          <Text style={styles.timeText}>{props.startTime}</Text>
        </View>
        <View style={styles.actionButtonContainer}>
          <SelectableButton selected={true} textContent={strings.CALL}/>
        </View>
      </View>
     </Card>
  );
}


appointment.propTypes = {
  startTime: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired
};

appointment.defaultProps = {
  displayName: 'Yash Shrivastav',
  startTime: '5:20 PM',
  imageUrl: 'sd'
}

const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: 6,
    backgroundColor:appTheme.background,
    borderColor:appTheme.background
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: spacing.medium_sm,
    paddingLeft: spacing.medium,
    paddingRight: spacing.medium,
    justifyContent: 'space-between'
  },
  appointmentDetails: {
    paddingLeft: spacing.medium
  },
  displayName: {
    color: 'white',
    fontFamily: 'Poppins-SemiBold'
  },
  timeText: {
    color:appTheme.grey,
    fontFamily: 'Poppins-Medium',
  },
  actionButtonContainer:{
    // justifySelf:'flex-end'
    marginLeft:'auto',
    // padding:spacing.medium_sm
  }

});

export default appointment;