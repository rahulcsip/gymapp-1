import React, { Component, useState } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';

const SignupFormElement = (props) => {

    return (
        <View>
            <Text style={styles.label}>{props.label}</Text>
            <TextInput style={[styles.textInput,{fontSize:props.size}]} {...props}></TextInput>
        </View>
    );
}
const styles = StyleSheet.create(
    {
        textInput: {
            fontSize: 22,
             marginLeft: 10, 
             color: 'white' 
        },
        label:{
             color: 'grey',
              fontSize: 20 
            }
    }
);
export default SignupFormElement; 