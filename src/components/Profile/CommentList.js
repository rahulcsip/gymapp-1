import React, { Component } from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";
import size from "../../constants/fontSizes";
import colors, { appTheme } from "../../constants/colors";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import { spacing } from "../../constants/dimension";
import CommentCard from "./CommentCard";

data = [
  {
    id: 1,
    profilePicUri:
      "https://www.usnews.com/dims4/USNEWS/410224b/2147483647/thumbnail/970x647/quality/85/?url=http%3A%2F%2Fmedia.beam.usnews.com%2Fd1%2Fd8%2F8501ba714a21aed9a7327e02ade1%2F180515-10thingselonmusk-editorial.jpg",
    name: "Bessie Malone",
    comment: "A Good AutoResponder",

    like: 45,

    timeStatus: "4 Hours ago",
  },
  {
    id: 1,
    profilePicUri:
      "https://res.cloudinary.com/demo/image/facebook/65646572251.jpg",
    name: "Jeniffer Smith",
    comment: "This is so important nice work matt",

    like: "4 likes",

    timeStatus: "4 Hours ago",
  },
];

const renderCommentCard = (data, index) => {
  return (
    <View style={styles.renderPostCard} key={data.id}>
      <CommentCard
        profilePicUri={data.profilePicUri}
        name={data.name}
        comment={data.comment}
        like={data.like}
        timeStatus={data.timeStatus}
      />
    </View>
  );
};

export default class CommentList extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topRow}>
          <Text style={styles.comment}>Comments (2)</Text>
          <FontAwesome name="arrow-down" color="#fff" size={size.h1} />
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item, index }) => renderCommentCard(item, index)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  renderPostCard: {
    marginBottom: spacing.medium_sm,
  },
  container: {
    backgroundColor: "#2E2D32",
    flex: 1,
    padding: spacing.medium_sm,
    borderRadius: spacing.medium_sm,
    marginBottom: spacing.medium_sm,
  },
  topRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.small,
    marginBottom: spacing.medium,
  },
  comment: { fontWeight: "bold", fontSize: spacing.medium_lg, color: "#fff" },
});
