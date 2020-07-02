import React from 'react';
import {TouchableOpacity, Text, StyleSheet,View} from 'react-native';

const ActionButtonFour = (props) => {
  return (
    
    <TouchableOpacity  style={styles.Button} {...props}>
      <Text style={styles.label}>{props.label}</Text>
    </TouchableOpacity>
    
  );
}

const styles = StyleSheet.create(
  {
    Button: {

      backgroundColor: "rgba(0,0,0,0.5)",
      borderColor:'grey',
      borderWidth:1,
      borderRadius: 25,
      width:'70%',
      alignItems: 'center',
      padding: 15,
      textAlign:'center'
    },
    label: {
      color: 'white',
      fontSize: 22,

    }
  }
);

export default ActionButtonFour;