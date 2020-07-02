import React, { Component } from "react";
import { Text, StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { spacing } from "../../constants/dimension";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import HitCounter from "./HitCounter";
import size from "../../constants/fontSizes";
import colors from "../../constants/colors";
import CommentList from "./CommentList";




export default class PostCard extends Component {

constructor(props){
  super(props)
  this.state={
    status:false
  }
}

  render() {
    return (
      <View style={styles.mainContainer}>
        <View style={styles.topRow}>
          <View style={styles.profilePicContainer}>
            <Image
              source={{
                uri: this.props.profilePicUri,
              }}
              style={styles.profilepic}
            />
          </View>
          <View style={{ flex: 6 }}>
            <View style={styles.titileContainer}>
              <Text numberOfLines={1} style={styles.title}>
                {this.props.title}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text
                numberOfLines={1}
                style={{ color: "#000", fontSize: size.h1 }}
              >
                {this.props.bio}
              </Text>
            </View>
          </View>
          <View style={styles.editIcon}>
            <TouchableOpacity>
              <FontAwesome name="ellipsis-v" size={spacing.medium_lg} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.desrepContainer}>
          <Text
            numberOfLines={4}
            style={{ fontSize: size.h1, textAlign: "justify" }}
          >
            {this.props.discription}
          </Text>
        </View>

        {/* for Post Imagess */}

        <View>
          <Image
            source={{ uri: this.props.postPicUri }}
            style={styles.postImage}
          />
        </View>

        {/* HitCounter */}

        <View style={styles.hitCounterContainer}>
          <HitCounter icon="thumbs-up" iconValue={this.props.like} />

          <HitCounter icon="fire" iconValue={this.props.calorie} />

          <HitCounter icon="comment" iconValue={this.props.comment} />

          <View style={styles.timeStatusContainer}>
            <Text style={{ fontSize: 18, color: colors.darkGrey }}>
              {this.props.timeStatus}
            </Text>
          </View>
        </View>

        {/* Cheerful Button */}

        <View style={styles.buttonContainer}>
          <View style={{ flex: 1 }}></View>
          <View style={styles.buttonSubContainer}>
            <View style={{ flex: 1 }}>
              
            </View>
            <View style={{ flex: 1 }}>
              <TouchableOpacity  style={styles.button}>
                <FontAwesome name="comment" color="#fff" size={spacing.large} />

                <Text style={{ color: "#fff", fontSize: size.h1 }}>
                  Comment
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>



      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: spacing.medium_sm,
    backgroundColor: "#fff",
    borderRadius: spacing.medium,
  },
  topRow: {
    flex: 1,
    flexDirection: "row",
    marginBottom: spacing.medium_sm,
  },
  profilePicContainer: {
    flex: 2,

    justifyContent: "center",
    alignItems: "center",
  },
  profilepic: {
    height: spacing.thumbnailMiniPlus,
    width: spacing.thumbnailMiniPlus,
    borderRadius: spacing.thumbnail,
  },
  titileContainer: {
    flex: 1,

    justifyContent: "flex-end",
  },
  title: { color: "#000", fontWeight: "bold", fontSize: spacing.large },
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
  hitCounterContainer: {
    flex: 1,
    flexDirection: "row",
    margin: spacing.medium_sm,
  },
  timeStatusContainer: {
    flex: 2,

    justifyContent: "center",
    alignItems: "flex-end",
  },
  buttonContainer: { marginTop: spacing.medium_sm, flexDirection: "row" },
  buttonSubContainer: {
    flex: 3,

    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    height: 30,
    width: "95%",
    backgroundColor: "black",
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 5,
  },
});
