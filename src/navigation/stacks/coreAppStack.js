import React from "react";
import {NavigationContainer} from "@react-navigation/native";

import Stack from './stack';
import RouteNames from "../RouteNames";
import Profile from "../../screens/App/Profile";
import Packages from "../../screens/App/PackageList";
import PackageEdit from "../../screens/App/PackageEdit";
import VideoCall from "../../screens/Call/VideoCall";
import HomeTab from '../tabs/homeTab';
import Schedule from "../../screens/App/Schedule";

import {appTheme} from "../../constants/colors";
import {TouchableOpacity} from "react-native";
import FontAwesome from "react-native-vector-icons/Feather";
import {spacing} from "../../constants/dimension";
import {openDrawer} from "../RootNavigation";
import SlotEdit from "../../screens/App/SlotList";
import PackageList from "../../screens/App/PackageList";

const noHeader = {title: '', headerStyle: {height: 0}}

const hamburgerButton = ()=> (
  <TouchableOpacity onPress={openDrawer} style={{marginLeft:spacing.medium_lg, marginRight:0}}>
    <FontAwesome
      name={'menu'}
      color={appTheme.brightContent}
      size={20}
    />
  </TouchableOpacity>
)

const coreApplication = () => {
  return (
    <Stack.Navigator>

      <Stack.Screen name={RouteNames.HomeTab} component={HomeTab} options={{
        title: 'Overview',
        headerTintColor: appTheme.brightContent,
        headerStyle: {
          backgroundColor: appTheme.darkGrey,
        },
        headerLeft: hamburgerButton
      }}/>
      <Stack.Screen name={RouteNames.Profile} component={Profile}
                    options={{title: '', headerTintColor: appTheme.brightContent, headerTransparent: true}}/>
      <Stack.Screen name={RouteNames.VideoCall} component={VideoCall} options={noHeader}/>
      <Stack.Screen name={RouteNames.Schedule} component={Schedule} options={{title: '', headerTransparent: true}}/>
      <Stack.Screen name={RouteNames.Packages} component={Packages}
                    options={{title: 'My Packages', headerTintColor: appTheme.brightContent}}/>
      <Stack.Screen name="PackageList" component={PackageList} options={{title: '', headerTransparent: true}}/>

      <Stack.Screen name={RouteNames.PackageEdit} component={PackageEdit}
                    options={{title: '', headerTintColor: appTheme.brightContent, headerTransparent: true}}/>
      <Stack.Screen name={RouteNames.SlotEdit} component={SlotEdit}
                    options={{title: '', headerTintColor: appTheme.brightContent, headerTransparent: true}}/>

    </Stack.Navigator>
  );
}

export default coreApplication;