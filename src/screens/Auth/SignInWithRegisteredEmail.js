import React, { useState, Component } from 'react';
import { Text, View, TextInput, Button, ScrollView, KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { login } from '../../API';
import * as actionCreators from "../../store/actions";
import { connect } from "react-redux";
import { signInWithEmail } from '../../API/firebaseMethods';

class SignInWithRegisteredEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      icon: "eye-off",
      isPasswordHidded: true,
      height: '80%',
      email: '',
      password: ''
        ``
    }
  }

  changePasswordVisibility() {
    this.setState(
      prevState => ({
        icon: prevState.icon === 'eye' ? 'eye-off' : 'eye',
        isPasswordHidded: !prevState.isPasswordHidded
      })
    );
  }

  async signIn() {
    // let temail = '';
    // let tpassword = ''
    // if (this.state.email != "") {
    //   temail = JSON.stringify(this.state.email.text);
    //   temail = temail.slice(1, -1);
    // }
    // if (this.state.password != "") {
    //   tpassword = JSON.stringify(this.state.password.text);
    //   tpassword = tpassword.slice(1, -1);
    // }

    // var result = await login(temail, tpassword);
    var result = await signInWithEmail(this.state.email.text, this.state.password.text);

    // if (result) {
    //   this.props.setAuthToken(result.token);
    //   this.props.setAuthenticated(true);
    // } else {
    //   return (
    //     <Text style={{color: 'red'}}>incorrect password</Text>
    //   );
    // }
  }

  render() {
    return (

      <KeyboardAwareScrollView enableOnAndroid={true} contentContainerStyle={{ flexGrow: 1, backgroundColor: 'white' }}>

        <View style={{ flex: 1, marginLeft: 20, marginRight: 20, justifyContent: 'center', marginTop: 20 }}>


          <View style={{ flex: 1, justifyContent: 'space-evenly', marginBottom: 20 }}>
            <Text style={{ fontSize: 18 }}>Email</Text>
            <TextInput
              placeholder="Your email"
              placeholderTextColor="grey"
              style={{
                marginTop: 10,
                color: 'black',
                fontSize: 18,
                borderBottomColor: 'grey',
                borderBottomWidth: 1,
                marginRight: 30
              }}
              autoCapitalize="none"
              onChangeText={(text) => {
                this.setState({ email: { text } })
              }}
            />
            <Text style={{ fontSize: 18, marginTop: 15 }}>Password</Text>
            <View style={{ flexDirection: 'row' }}>
              <TextInput

                placeholder="Your password"
                placeholderTextColor="grey"
                style={{
                  marginTop: 20,
                  flex: 1,
                  color: 'black',
                  fontSize: 18,
                  borderBottomColor: 'grey',
                  borderBottomWidth: 1
                }}
                autoCapitalize="none"
                secureTextEntry={this.state.isPasswordHidded}
                onChangeText={(text) => {
                  this.setState({ password: { text } });
                }}
              />
              <TouchableOpacity
                style={{ marginTop: 20, marginRight: 10 }}
                onPress={() => this.changePasswordVisibility()}>
                <Feather
                  name={this.state.icon}
                  color="black"
                  size={20}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ alignItems: 'flex-end' }}>
              <Text style={{ color: 'blue' }}>Forgot password?</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.signIn()} style={{
              backgroundColor: 'blue',
              borderRadius: 25,
              width: '30%',
              alignItems: 'center',
              marginLeft: "35%",
              padding: 5
            }}>
              <Text style={{ color: 'white', fontSize: 22, marginLeft: 10, marginRight: 10 }}>Sign in</Text>
            </TouchableOpacity>

          </View>

          <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center', marginLeft: 20, marginRight: 20 }}>
            <View style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20
            }}>
              <Text style={{ fontSize: 16 }}>By proceeding further, you are agreeing to our </Text>
              <TouchableOpacity style={{}}>
                <Text style={{ color: 'blue', fontSize: 17 }}>terms & conditions</Text>
              </TouchableOpacity>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>
              <Text style={{ fontSize: 16 }}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('Signup')
              }}>
                <Text style={{ color: 'blue', fontSize: 17 }}> Sign up</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 2 }}></View>


          </View>

        </View>
      </KeyboardAwareScrollView>


    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  setAuthToken: (token) => dispatch(actionCreators.setAuthToken(token)),
  setAuthenticated: (value) => dispatch(actionCreators.setAuthenticated(value))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignInWithRegisteredEmail);

