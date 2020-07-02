import React, {useState, Component} from 'react';
import {Text, TouchableOpacity, StyleSheet, TextInput, View, Image, StatusBar} from 'react-native';
import {updateUserInfo} from '../../API';
import ImagePicker from 'react-native-image-picker';
import defaultPic from '../../../assets/images/male_pic_default.jpg';
import {uploadImage} from '../../API';
import {connect} from "react-redux";
import * as actionCreators from "../../store/actions";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ActionButtonTwo from '../../components/Login/ActionButtonTwo';
import {appTheme} from '../../constants/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SignupFormElement from '../../components/Signup/SIgnupFormElement';
import KeyboardSpacer from 'react-native-keyboard-spacer';

class ProfileEdit extends Component {

  state = {
    name: '',
    bio: '',
    image: null,
    height: 0,
    weight: 0
  }

  componentDidMount() {
    this.props.updateUserData();
  }

  pickImage = () => {
    const options = {};
    ImagePicker.showImagePicker(options, (response) => {

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        console.log('image url', response.uri);
        this.setState({
          image: response.uri,
        });
        this.submitPhoto(response.path, this.props.authToken);
      }
    });
  };

  submitPhoto = async (path, token) => {
    let result = await uploadImage(path, token);
    if (result)
      console.log('image insertion successful')
    else
      console.log('image insertion failed')
  }

  submit = async () => {
    var result = await updateUserInfo(this.state.name.text);
    if (result) {
      this.props.setInitialLoginOff();
    }
  }

  render() {
    return (
      <>
        <StatusBar backgroundColor={appTheme.darkBackground}/>
        <KeyboardAwareScrollView enableOnAndroid={true} contentContainerStyle={styles.contentContainer}
                                 keyboardShouldPersistTaps={'handled'}>
          <View style={{
            flex: 0.5,
            flexDirection: 'row',
            marginLeft: 30,
            marginRight: 30,
            marginTop: 20,
            justifyContent: "space-evenly"
          }}>

            <TouchableOpacity
              style={{marginRight: 60}}
              onPress={() => {
                this.goBack()
              }}>
              <FontAwesome
                name="times-circle-o"
                color="grey"
                size={40}
              ></FontAwesome>
            </TouchableOpacity>
            <Text style={{fontSize: 28, color: 'white'}}>Edit Profile</Text>

            <TouchableOpacity
              style={{marginLeft: 60}}
              onPress={() => {
                this.submit()
              }}>
              <FontAwesome
                name="check-circle-o"
                color='#DD3180'
                size={40}
              ></FontAwesome>
            </TouchableOpacity>

          </View>
          <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginLeft: 30, marginRight: 30}}>
            {!this.state.image && <Image source={defaultPic} style={{width: 200, height: 200, borderRadius: 100}}/>}
            {this.state.image &&
            <Image source={{uri: this.state.image}} style={{width: 200, height: 200, borderRadius: 100}}/>}
            <View style={{postion: 'absolute', alignItems: 'center', bottom: 45, width: "55%"}}>
              <ActionButtonTwo onPress={() => this.pickImage()} label="Update Picture" color='#DD3180'/>
            </View>
          </View>
          <View style={{flex: 3, marginLeft: 30}}>
            <SignupFormElement size={28} label="Name" onChangeText={(text) => {
              this.setState({name: {text}})
            }}/>
            <View style={styles.itemSeparatorHorizontal}/>
            <SignupFormElement size={28} label="Height  (in cms)" maxLength={3} keyboardType='numeric'
                               onChangeText={(text) => {
                                 this.setState({height: {text}})
                               }}/>
            <View style={styles.itemSeparatorHorizontal}/>
            <SignupFormElement size={28} label="Weight  (in kgs)" maxLength={3} keyboardType='numeric'
                               onChangeText={(text) => {
                                 this.setState({weight: {text}})
                               }}/>

            <View style={styles.itemSeparatorHorizontal}/>

            <SignupFormElement label="Bio" multiline={true} size={22} onChangeText={(text) => {
              this.setState({bio: {text}})
            }}/>
            <View style={styles.itemSeparatorHorizontal}/>
            <KeyboardSpacer/>
          </View>
          <KeyboardSpacer/>
        </KeyboardAwareScrollView>

      </>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    backgroundColor: appTheme.darkBackground,
  },
  itemSeparatorHorizontal: {
    height: 1,
    borderLeftWidth: 1,
    backgroundColor: "#363636",
    marginTop: 5,
    marginBottom: 20,
    marginRight: 30
  }

})
const mapStateToProps = (state) => ({
  authToken: state.user.authToken
});

const mapDispatchToProps = (dispatch) => ({
  setAuthenticated: (value) => dispatch(actionCreators.setAuthenticated(value)),
  setInitialLoginOff: () => dispatch(actionCreators.setInitialLoginOff()),
  updateUserData: () => dispatch(actionCreators.updateUserData())
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);