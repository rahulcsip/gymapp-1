import React from "react";
import {NavigationContainer} from "@react-navigation/native";

import RouteNames from "../RouteNames";
import Stack from './stack';

import ChooseUserType from "../../screens/Auth/ChooseUserType";
import Login from "../../screens/Auth/Login";
import Signup from "../../screens/Auth/Signup";
import SignInWithRegisteredEmail from "../../screens/Auth/SignInWithRegisteredEmail";

const authStack = ({navigationRef}) => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name={RouteNames.ChooseUserType} component={ChooseUserType} />
        <Stack.Screen name={RouteNames.Login} component={Login} options={{title: ''}}/>
        <Stack.Screen name={RouteNames.Signup} component={Signup} options={{title: 'Sign up'}}/>
        <Stack.Screen name="signInWithRegisteredEmail" component={SignInWithRegisteredEmail}
                      options={{title: 'Sign in'}}/>
        {/*<Stack.Screen name={RouteNames.VideoCall} component={VideoCall} options={noHeader}/>*/}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default authStack;