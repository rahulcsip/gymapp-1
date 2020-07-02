import React, { Component } from 'react';
import { Text, View, ImageBackground, StatusBar, StyleSheet, TouchableOpacity, ActivityIndicator, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import FormElementThree from '../../components/Login/FormElementThree';
import PasswordElementThree from '../../components/Login/PasswordElementThree';
import ActionButtonFour from '../../components/Login/ActionButtonFour';
import LoginFooterTwo from '../../components/Login/LoginFooterTwo';
import bgImage from '../../../assets/images/loginbg.jpg';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RouteNames from "../../navigation/RouteNames";
import { attemptGoogleAuth, signInWithEmail } from "../../API";
import Loader from '../../components/Loader';
import { showMessage } from "react-native-flash-message";
import strings from '../../constants/strings';
import { string } from 'prop-types';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      googleLoading: false,
      loading: false
    }
  }

  googleLogin = async () => {
    this.setState({ loading: true })
    let res = await attemptGoogleAuth();
    this.setState({ loading: false })
    if (res)
      this.setState({ googleLoading: true });
    else
      showMessage({
        message: strings.LOGIN_FAILED,
        type: "danger",
      });
  }
  signIn = async () => {
    Keyboard.dismiss()
    this.setState({ loading: true })
    var result = await signInWithEmail(this.state.email, this.state.password);
    this.setState({ loading: false })
    if (result) {

    }
    else
      showMessage({
        message:string.LOGIN_FAILED,
        type: "danger",
      });
  }
  setEmail=(text)=>{
    this.setState({email:text})
  }
  setPassword=(text)=>{
    this.setState({password:text})
  }
  navigateToSignup=()=>{
    this.props.navigation.navigate(RouteNames.Signup)
  }
  render() {
    return (
      <KeyboardAwareScrollView enableOnAndroid={true} keyboardShouldPersistTaps={'handled'} contentContainerStyle={styles.contentContainer}>
        <StatusBar backgroundColor='black' />
        <ImageBackground source={bgImage} resizeMode="cover" blurRadius={2} style={styles.backgroundImage}>
          <Loader
            loading={this.state.loading} />
          <View style={styles.subContainer}>
            <View style={styles.heading}>
              <Text style={styles.headingElement}>Hello there,</Text>
              <Text style={styles.headingElement}>Welcome back</Text>
            </View>
            <View style={styles.secSubContainer}>
              <View style={styles.FormElement}>
                <FormElementThree placeholder="  Email" onChangeText={(text) => this.setEmail(text)} />
                <PasswordElementThree placeholder="  Password" onChangeText={(text) => this.setPassword(text)} />
              </View>
              <View style={styles.ActionButton}>
                <ActionButtonFour label="SIGN IN" onPress={() => this.signIn()}></ActionButtonFour>
              </View>
              <View style={styles.thirdSubContent}>
                <View style={{ flex: 1 }}>
                  <TouchableOpacity>
                    <Text style={styles.forgotPassword}>Forgot Password?</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.footerOne}>
                  <Text style={styles.footerText}>Or Continue with </Text>
                  {
                    this.state.googleLoading && (
                      <ActivityIndicator size="large" color="white" />
                    )
                  }
                  {
                    !this.state.googleLoading && (
                      <TouchableOpacity onPress={() => {
                        this.googleLogin()
                      }}>
                        <FontAwesome
                          name='google'
                          color='white'
                          size={40}
                          style={{ marginTop: 15 }}
                        />
                      </TouchableOpacity>
                    )
                  }
                </View>
                <LoginFooterTwo content="Dont't have an account?  " clickableContent=" Sign up" onPress={() => this.navigateToSignup()} />
              </View>
            </View>
          </View>
        </ImageBackground>
      </KeyboardAwareScrollView>
    );
  }
}
const styles = StyleSheet.create(
  {
    contentContainer: {
      flexGrow: 1,
      backgroundColor: 'black',
      width: "100%"
    },
    backgroundImage: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%'
    },
    subContainer: {
      flex: 1,
      width: '100%',
      marginRight: 30,
      marginLeft: 30
    },
    heading: {
      flex: 1,
      justifyContent: 'flex-end',
      width: '100%',
      marginRight: 30,
      marginLeft: 30
    },
    headingElement: {
      color: "white",
      fontSize: 32,
      fontWeight: 'bold'
    },
    secSubContainer: {
      flex: 5,
      marginRight: 30,
      marginLeft: 30
    },
    FormElement: {
      flex: 2,
      justifyContent: 'center'
    },
    ActionButton: {
      flex: 2,
      alignItems: 'center',
      marginTop: 10
    },
    thirdSubContent: {
      alignItems: 'center',
      flex: 2,
      justifyContent: 'flex-start',
      marginBottom: 30
    },
    forgotPassword: {
      color: '#BCBCBF',
      marginBottom: 40,
      fontSize: 20,
      fontWeight: "bold"
    },
    footerOne: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center'
    },
    footerText: {
      color: '#BCBCBF',
      fontSize: 18,
      fontWeight: 'bold'
    },

  }
);