import React, { Component } from "react";
import { Text, StyleSheet, View } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import colors from "../../constants/colors";
import size from "../../constants/fontSizes";
import { spacing } from "../../constants/dimension";
export default class HitCounter extends Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <FontAwesome
          name={this.props.icon}
          color={colors.darkGrey}
          size={spacing.large}
        />
        <View style={styles.container}>
          <Text style={styles.insiderText}>{this.props.iconValue}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,

    flexDirection: "row",
    justifyContent: "space-around",
  },
  container: { justifyContent: "center", alignItems: "center" },
  insiderText: { fontSize: size.h1, color: colors.darkGrey },
});
