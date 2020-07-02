import React from "react";
import {NavigationContainer} from "@react-navigation/native";

import Stack from './stack';
import RouteNames from "../RouteNames";
import VideoTester from "../../screens/Call/VideoTester";
import VideoCall from "../../screens/Call/VideoCall";

const noHeader = {title: '', headerStyle: {height: 0}}


const videoTestStack = ({navigationRef}) => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name={RouteNames.VideoTester} component={VideoTester}/>
        <Stack.Screen name={RouteNames.VideoCall} component={VideoCall} options={noHeader}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default videoTestStack;