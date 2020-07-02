import React, { Component } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import size from "../../constants/fontSizes";
import colors, { appTheme } from "../../constants/colors";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { spacing } from "../../constants/dimension";

export default class CommentCard extends Component {
  render() {
    return (
      <View style={styles.topRow}>
        <View style={styles.profilePicContainer}>
          <Image
            source={{
              uri: this.props.profilePicUri,
            }}
            style={styles.profilepic}
          />
        </View>
        <View style={{ flex: 6, backgroundColor: "" }}>
          <View style={styles.titileContainer}>
            <Text numberOfLines={1} style={styles.name}>
              {this.props.name}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              numberOfLines={1}
              style={{ color: colors.darkGrey, fontSize: size.h2 }}
            >
              {this.props.comment} 
            </Text>
          </View>
          <View
            style={{
              backgroundColor: "",
              flexDirection: "row",
              paddingTop: spacing.small,
            }}
          >
            <View
              style={{
                flex: 1.5,
                justifyContent: "center",
              }}
            >
              <Text style={{ color: colors.darkGrey }}>
                {this.props.timeStatus}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: "",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: colors.darkGrey }}>{this.props.like}</Text>
            </View>
            <View
              style={{
                backgroundColor: "",
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: colors.darkGrey }}>reply</Text>
            </View>
          </View>
        </View>
        <View style={styles.editIcon}>
          <TouchableOpacity>
            <FontAwesome
              name="heart"
              size={spacing.medium_lg}
              color={colors.darkGrey}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topRow: {
    flex: 1,
    flexDirection: "row",
    marginBottom: spacing.medium_lg,
  },
  profilePicContainer: {
    flex: 2,

    justifyContent: "center",
    alignItems: "center",
  },
  profilepic: {
    height: spacing.thumbnailMini,
    width: spacing.thumbnailMini,
    borderRadius: spacing.thumbnail,
  },
  titileContainer: {
    flex: 1,

    justifyContent: "flex-end",
  },
  name: { color: "#fff", fontWeight: "bold", fontSize: size.h1 },
  editIcon: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center",
  },
  desrepContainer: {
    flex: 1,

    marginBottom: spacing.medium_sm,
  },
  postImage: {
    height: spacing.coverImageSize,
    width: "100%",
    borderRadius: spacing.medium_lg,
  },
});
