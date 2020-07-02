import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { spacing } from "../../constants/dimension";
import ImagePicker from "react-native-image-picker";
import colors, { appTheme } from "../../constants/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import size from "../../constants/fontSizes";

export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
  }

  pickImage = () => {
    const options = {};
    ImagePicker.showImagePicker(options, (response) => {
      console.log("Response = ", response);

      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        console.log("image url", response.uri);
        this.setState({
          image: response.uri,
        });
      }
    });
  };

  render() {
    return (
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.firstRow}>
          <View style={styles.textInputContainer}>
            <View style={{ flex: 3 }}>
              <TextInput
                multiline={true}
                placeholder="What are you up to ?"
                placeholderTextColor={colors.darkGrey}
                underlineColorAndroid="transparent"
                style={styles.TextInput}
              />
            </View>
            <View style={styles.iconBox}>
              <TouchableOpacity>
                <FontAwesome name="trophy" size={spacing.large} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.pickImage()}>
                <FontAwesome name="camera" size={spacing.large} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.imageBox}>
            {this.state.image && (
              <Image
                source={{
                  uri: this.state.image,
                }}
                style={styles.imageStyle}
              />
            )}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={{ color: "#fff", fontSize: size.h1 }}> CANCEL</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}> POST</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    backgroundColor: appTheme.darkBackground,
  },
  firstRow: {
    flex: 1,
    backgroundColor: "#3A393E",
    padding: spacing.medium,
    marginBottom: spacing.medium_sm,
  },
  textInputContainer: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 0,
    elevation: spacing.medium_sm,
  },
  TextInput: {
    color: colors.darkGrey,
    fontSize: size.h1,
    paddingRight: spacing.medium_sm,
    lineHeight: spacing.medium_lg,
    textAlign: "justify",
  },
  iconBox: {
    flex: 1,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  imageBox: {
    flex: 1,
marginTop:spacing.medium_sm,
    marginBottom: spacing.medium_lg,
    justifyContent: "center",
    alignItems: "center",
    elevation: spacing.medium_sm,
  },
  imageStyle: {
    height: spacing.coverImageSize,
    width: spacing.coverImageSize,
    borderRadius: spacing.medium_sm,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",

    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    paddingLeft: spacing.medium,
    paddingRight: spacing.medium,
    paddingTop: spacing.small,
    paddingBottom: spacing.small,
    backgroundColor: "#000",
    borderRadius: spacing.medium_sm,
  },
  buttonText: { color: "#fff", fontSize: size.h1 },
});
