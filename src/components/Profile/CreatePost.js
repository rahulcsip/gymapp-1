import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  AsyncStorage
} from "react-native";
import { spacing } from "../../constants/dimension";
import ImagePicker from "react-native-image-picker";
import colors, { appTheme } from "../../constants/colors";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import size from "../../constants/fontSizes";
import Touch from 'react-native-touch';
import {CreatePostAction} from '../../store/actions/postAction'
import {connect} from 'react-redux';


export  class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      status:false,
      postText:"",
      path:''
    };
  }



  componentDidUpdate(prevProps, prevState) {
    if (prevProps.forgetPassword !== this.props.forgetPassword) {
      const {response} = this.props.forgetPassword;
      const {statusCode, message, token} = response;
      if (statusCode === 200) {
        Alert.alert(
          '',
          message,

          [
            {
              text: 'Ok',
              onPress: () => this.props.navigation.navigate('Login'),
            },
          ],
          {cancelable: false},
        );

        this.setState({showLoader: false});
      } else {
        this.setState({showLoader: false});
        alert(message);
      }
    }
  }





  postSubmit= async()=>{
  
    const { image, postText,path} = this.state
    const token = await AsyncStorage.getItem('@token');

    const data = {
        path: path,
        textContent:postText,

      };
      this.props.CreatePostAction(data,token);

console.log("Post Button " ,data)

  }






open=()=>{
   this.setState({status:true})
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
        console.log("image url ------------------------------", response.uri);
        this.setState({
          image: response.uri,
          status:false,
          path:response.path
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
            
            
            
          <View style={{ flex: 3,backgroundColor:"" ,}}>
          
            <Touch
                pointerEvents = {"box-none"}
                style={{ color: 'red',padding:10}}
                activeOpacity={0.7}
                onPress= {this.open}
                disabled={false}
            >
                
              <TextInput
                multiline={true}
                placeholder="What are you up to ?"
                placeholderTextColor={colors.darkGrey}
                underlineColorAndroid="transparent"
                style={styles.TextInput}
                onChangeText={postText =>
                    this.setState({postText})
                  }
                  value={this.state.postText}

              />
               
                
             
            </Touch>
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




{ 

this.state.status ? ( <View style={styles.buttonContainer}>
    <TouchableOpacity onPress={()=>{this.setState({status:false})}} style={styles.button}>
      <Text style={{ color: "#fff", fontSize: size.h1 }}> CANCEL</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={this.postSubmit} style={styles.button}>
      <Text style={styles.buttonText}> POST</Text>
    </TouchableOpacity>
  </View>):(null)
}


         
        </View>
      </KeyboardAwareScrollView>
    );
  }
}








const mapStateToProps = state => {
    return {
        postCreateReducer: state.postCreateReducer,
    };
  };
  
  export default connect(
    mapStateToProps,
    {CreatePostAction},
  )(CreatePost);
  






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
