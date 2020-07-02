/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {useState} from "react";
// import Material from "react-native-vector-icons/MaterialCommunityIcons";
// import Ion from "react-native-vector-icons/Ionicons";
import PropTypes from "prop-types";
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {spacing} from "../constants/dimension";
import DateTimePicker from '@react-native-community/datetimepicker';
import colors, {appTheme} from "../constants/colors";
import WeekdayPicker from "react-native-weekday-picker";
import fontSizes from "../constants/fontSizes";
import fonts from "../constants/fonts";
import {formattedTime, stringToDate} from "../utils/utils";
import strings from "../constants/strings";
import SelectableButtonGroup from "./selectableButtonGroup";
import {allowedDurations, WEEK_DAYS} from "../constants/appConstants";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const slot = (props) => {
  const [show, setShow] = useState(false);
  const timeObj = stringToDate(props.time);

  const onTimeChange = (evt, time) => {
    setShow(false);
    if (time)
      props.onTimeChange(time);
  }

  const mapDaysToBooleans = daysList => {
    const days = {};
    Object.values(WEEK_DAYS).map((day, index) => {
      days[index] = daysList.includes(day) ? 1 : 0;
    });
    return days;
  }

  const mapBooleansToDays = booleans => {
    const days = [];
    Object.keys(booleans).map(dayIndex => {
      if (booleans[dayIndex]) {
        const day = Object.values(WEEK_DAYS)[dayIndex];
        days.push(day);
      }
    })
    return days;
  }

  const onDaysChanged = booleans => {
    const days = mapBooleansToDays(booleans);
    props.onDaysChange(days);
  }

  const Title = () => (
    <View style={styles.titleContainer}>
      <Text style={styles.time}>Slot {props.index}</Text>
      <TouchableOpacity onPress={props.onDelete} hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
      >
        <FontAwesome
          name={'trash'}
          color={colors.rejectRed}
          size={22}
        />
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.container}>
      <Title/>
      <TouchableOpacity style={styles.timeContainer} onPress={() => setShow(!show)}>
        <Text style={styles.title}>Time : </Text>
        <Text style={styles.time}>{formattedTime(timeObj)}</Text>
      </TouchableOpacity>
      <View style={styles.timeContainer}>
        <Text style={styles.title}>Duration : </Text>
        <SelectableButtonGroup
          containerStyle={styles.buttonGroup}
          activeStyle={styles.activeButton}
          data={allowedDurations}
          selected={props.duration}
          onSelect={props.onDurationChange}
        />
      </View>
      <WeekdayPicker
        days={mapDaysToBooleans(props.days)}
        onChange={onDaysChanged}
        // style={styles.picker}
        dayStyle={styles.day}
        dayInactiveStyle={styles.dayInactive}
        activeBackgroundColor={'white'}
        textColor={'black'}
      />
      {
        show && (
          <DateTimePicker
            value={timeObj}
            mode={'time'}
            display="clock"
            onChange={onTimeChange}
          />
        )
      }

    </View>
  )
}

slot.propTypes = {
  duration: PropTypes.number.isRequired,
  time: PropTypes.string.isRequired,
  days: PropTypes.array.isRequired
};

const styles = StyleSheet.create({
  container: {
    elevation: 14,
    width: '99%',
    padding: spacing.medium,
    borderRadius: 4,
    paddingLeft: spacing.large,
    paddingRight: spacing.large,
    margin: 2,
    backgroundColor: appTheme.darkBackground
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  timeContainer: {
    flexDirection: 'row',
    marginTop: spacing.medium_sm
  },
  durationContainer: {
    flexDirection: 'row',
    marginTop: spacing.medium_sm
  },
  timeIcon: {
    paddingTop: spacing.small,
    marginRight: spacing.medium_sm
  },
  durationIcon: {
    marginRight: spacing.medium_sm
  },
  title: {
    color: appTheme.grey,
    fontSize: fontSizes.h1,
    fontFamily: fonts.MontserratMedium
  },
  time: {
    color: 'white',
    fontSize: fontSizes.h1,
    fontFamily: fonts.MontserratMedium
  },
  duration: {
    color: 'white',
    fontSize: fontSizes.h1,
    fontFamily: fonts.MontserratMedium
  },
  day: {
    borderRadius: 8
  },
  dayInactive: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white'
  },
  buttonGroup: {
    backgroundColor: 'transparent',
    padding: 0,
    marginBottom: spacing.small
  },
  activeButton:{
  }
});

export default slot;