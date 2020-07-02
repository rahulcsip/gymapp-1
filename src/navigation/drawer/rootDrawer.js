import * as React from 'react';
import {Button, View} from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';

import CoreApp from '../stacks/coreAppStack';
import Settings from "../../screens/App/Settings";
import {signOutFirebase} from "../../API/firebaseMethods";
import {appTheme} from "../../constants/colors";
import PackageList from "../../screens/App/PackageList";
import SlotList from "../../screens/App/SlotList";

const Drawer = createDrawerNavigator();
const MyTheme = {
  colors: {
    primary: appTheme.darkBackground,
  },
};
const rootDrawer = ({navigationRef}) => {
  return (
    <NavigationContainer theme={MyTheme} ref={navigationRef}>
      <Drawer.Navigator initialRouteName="Home"
                        drawerType={'slide'}
                        drawerContent={CustomDrawerContent}
      >
        <Drawer.Screen name="Home" component={CoreApp}/>
        <Drawer.Screen name="PackageList" component={PackageList}/>
        <Drawer.Screen name="Slots" component={SlotList}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} style={{backgroundColor:appTheme.background}}>
      <DrawerItemList {...props} labelStyle={{color:'white'}}/>
      {/*<DrawerItem*/}
      {/*  label="Sign Out"*/}
      {/*  onPress={() => signOutFirebase()}*/}
      {/*/>*/}
    </DrawerContentScrollView>
  );
}

export default rootDrawer;

