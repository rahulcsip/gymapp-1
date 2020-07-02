import * as React from "react";
import {Text, View} from "react-native";
import {appTheme} from "../../constants/colors";

class Settings extends React.Component {
  render() {
    return (
      <View style={{flex: 1, backgroundColor:appTheme.darkBackground ,justifyContent: 'center', alignItems: 'center'}}>
        {/*<Text>Settings</Text>*/}
      </View>
    );
  }
}

export default Settings;