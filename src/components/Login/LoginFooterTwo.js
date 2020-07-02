import React from 'react';
import {View,TouchableOpacity,Text,StyleSheet} from 'react-native';
const LoginFooterTwo=(props) =>{
    return (
        <TouchableOpacity style={styles.container}  onPress={props.onPress}>
            <Text style={{color:'#BCBCBF',fontSize:16}}>{props.content}</Text>
                <Text style={{color:'white'}}  >{props.clickableContent}</Text>
         </TouchableOpacity>
     );
}
const styles=StyleSheet.create({
    container:{
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
        marginBottom:50,
        marginTop:40
    }
});
export default LoginFooterTwo;