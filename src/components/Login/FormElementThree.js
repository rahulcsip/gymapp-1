import React from 'react';
import {  StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
const FormElementThree = (props) =>{
return(
    <TextInput placeholder={props.placeholder} style={styles.textInput}   placeholderTextColor="#D1D8EB"  {...props}></TextInput>
);
}
const styles = StyleSheet.create(
    {
        textInput: {
            marginTop: 20,
            color: 'white',
            fontSize: 28,
            marginRight: 15,
            marginLeft: 15,
            borderWidth:1,
            borderRadius:25,
            // backgroundColor:"rgba(52, 52, 52, 0.3)",
            backgroundColor:"rgba(52, 52, 52, 0.5)",
            borderColor:'grey',
            
          
           
        }
    });

export default FormElementThree;