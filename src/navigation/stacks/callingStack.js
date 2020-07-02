import React from "react";
import {NavigationContainer} from "@react-navigation/native";

import Stack from './stack';
import RouteNames from "../RouteNames";
import CallScreen from "../../screens/Call/CallScreen";
import VideoCall from "../../screens/Call/VideoCall";

const callingScreen = ({navigationRef}) => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name={RouteNames.CallScreen} component={CallScreen}/>
        <Stack.Screen name={RouteNames.VideoCall} component={VideoCall}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default callingScreen;