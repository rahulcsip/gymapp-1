import React from "react";
import CalendarStrip from "react-native-calendar-strip";
import moment from "moment";
import {View} from "react-native";


const calendarStripChooser = (props)=> {

  const {dates, onDateSelect}= props;

  return (
    <CalendarStrip
      calendarAnimation={{type: 'sequence', duration: 30}}
      daySelectionAnimation={{type: 'border', duration: 50, borderWidth: 1, borderHighlightColor: '#89c9b8'}}
      style={{height: 100, paddingTop: 20, paddingBottom: 10}}
      calendarHeaderStyle={{color: 'white'}}
      selectedDate={moment()}
      scrollable={false}
      // startingDate={moment().add(0, 'days')}
      useIsoWeekday={false}
      calendarColor={'#092532'}
      dateNumberStyle={{color: 'white'}}
      dateNameStyle={{color: 'white'}}
      highlightDateNumberStyle={{color: '#89c9b8'}}
      highlightDateNameStyle={{color: '#89c9b8'}}
      disabledDateNameStyle={{color: 'grey'}}
      disabledDateNumberStyle={{color: 'grey'}}
      datesWhitelist={dates}
      // datesBlacklist={datesBlacklist}
      iconContainer={{flex: 0.1}}
      onDateSelected={onDateSelect}
    />
  )
}

export default calendarStripChooser