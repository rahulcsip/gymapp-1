import React from "react";
import {NavigationContainer} from "@react-navigation/native";

import Stack from './stack';
import RouteNames from "../RouteNames";
import Splash from "../../screens/Auth/Splash";

const splashScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name={RouteNames.Splash} component={Splash}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default splashScreen;