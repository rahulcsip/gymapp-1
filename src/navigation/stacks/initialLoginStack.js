import React from "react";
import {NavigationContainer} from "@react-navigation/native";

import ProfileEdit from "../../screens/App/ProfileEdit";
import Stack from './stack';
import RouteNames from "../RouteNames";

const initialLoginUpScreen = ({navigationRef}) => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name={RouteNames.ProfileEdit} component={ProfileEdit}
                      options={{title: 'Enter details'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default initialLoginUpScreen;