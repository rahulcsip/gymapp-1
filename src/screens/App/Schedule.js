/**
 * @author Yatanvesh Bhardwaj <yatan.vesh@gmail.com>
 */
import React, {Component} from 'react';
import {View, StyleSheet, Text, FlatList, ScrollView} from 'react-native';
import {connect} from "react-redux";
import moment from "moment";
import {Card} from 'native-base';

import {spacing} from "../../constants/dimension";
import * as actionCreators from "../../store/actions";
import CustomCalendar from '../../components/customCalendar';
import Appointment from "../../components/Appointment";
import {appTheme} from "../../constants/colors";

import SelectableButtonGroup from '../../components/selectableButtonGroup';
import strings from "../../constants/strings";
import fontSizes from "../../constants/fontSizes";
import fonts from "../../constants/fonts";

class Schedule extends Component {

  state = {
    dates: [{
      start: moment(),
      end: moment().add(6, 'days')
    }],
    selectedDate: Date.now(),
    timeSlots: [
      '10:00 am',
      '11:00 am',
      '12:00 pm',
      '13:00 pm',
      '14:00 pm',
      '15:00 pm',
      '16:00 pm',
    ],
    selectedTimeSlot: null,
    appointments: [{
      name: 'Jane Nikalson',
      dpUrl: 'https://i.pinimg.com/originals/c5/a9/5f/c5a95f05b14e7f35abd07adf80bc3482.jpg',
      time: '11:00 am'
    }, {
      name: 'Jane Nikalson',
      dpUrl: 'https://i.pinimg.com/originals/c5/a9/5f/c5a95f05b14e7f35abd07adf80bc3482.jpg',
      time: '11:00 am'
    }, {
      name: 'Jane Nikalson',
      dpUrl: 'https://i.pinimg.com/originals/c5/a9/5f/c5a95f05b14e7f35abd07adf80bc3482.jpg',
      time: '11:00 am'
    }, {
      name: 'Jane Nikalson',
      dpUrl: 'https://i.pinimg.com/originals/c5/a9/5f/c5a95f05b14e7f35abd07adf80bc3482.jpg',
      time: '11:00 am'
    }]
  }

  onDateSelected = date => {
    this.setState({selectedDate: date});
  }

  selectTimeSlot = async timeSlot => {
    this.setState({selectedTimeSlot: timeSlot});
  }

  renderAppointments = (date) => {

    return this.state.appointments.map((appointment, index) => (
      <View key={index} style={styles.appointmentContainer}>
        <Appointment  displayName={appointment.name} imageUrl={appointment.dpUrl} startTime={appointment.time}/>
      </View>
    ))
  }

  render() {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.calendarContainer}>
          <CustomCalendar
            selectedDate={this.state.selectedDate}
            onDateChange={this.onDateSelected}
          />
        </View>
        <View style={styles.buttonGroup}>
          <SelectableButtonGroup
            data={this.state.timeSlots}
            selected={this.state.selectedTimeSlot}
            onSelect={this.selectTimeSlot}
          />
        </View>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>{strings.APPOINTMENTS}</Text>
        </View>
        <View style={styles.appointmentList}>
          <this.renderAppointments/>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: appTheme.lightBackground
  },
  calendarContainer: {
    paddingLeft: spacing.medium_lg,
    paddingRight: spacing.medium_lg,
    backgroundColor: appTheme.background
  },
  appointmentList: {},
  appointmentContainer: {
    marginLeft: spacing.medium_sm,
    marginRight: spacing.medium_sm
  },
  buttonGroup: {
    marginLeft: spacing.medium,
    marginRight: spacing.medium,
    marginTop: spacing.large
  },
  headingContainer: {
    margin: spacing.medium,
    alignItems: 'center',
  },
  heading: {
    color: 'white',
    fontSize: fontSizes.h1,
    fontFamily: fonts.PoppinsMedium
  }
});

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);