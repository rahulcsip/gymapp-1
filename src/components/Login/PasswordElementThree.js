import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const PasswordElementThree = (props) => {
    const [icon, setIcon] = useState('eye-off');
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);

    const changePasswordVisibility = () => {
        if (icon === 'eye')
            setIcon('eye-off')
        else
            setIcon('eye')

        if (isPasswordHidden)
            setIsPasswordHidden(false)
        else
            setIsPasswordHidden(true)
    }

    return (
        <View>
            <View style={styles.container}>
                <TextInput
                    placeholder={props.placeholder}
                    // placeholderTextColor="grey"
                    // placeholderTextColor="white"
                    placeholderTextColor="#D1D8EB"
                    style={styles.password}
                    autoCapitalize="none"
                    secureTextEntry={isPasswordHidden}
                    {...props}
                />
                <TouchableOpacity
                    style={styles.icon}
                    onPress={() => changePasswordVisibility()}>
                    <Feather
                        name={icon}
                        color="white"
                        size={20}
                    />
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create(
    {
        container: {
            flexDirection: 'row',
            marginLeft: 15
        },
        password: {
            marginTop: 20,
            flex: 1,
            color: 'white',
            fontSize: 28,
            borderWidth: 1,
            borderRadius: 25,
            // backgroundColor: "rgba(52, 52, 52, 0.3)",
            backgroundColor: "rgba(52, 52, 52, 0.5)",
            borderColor: 'grey',
            marginRight: 10,

        },
        icon: {
            position: 'absolute',
            top: 38,
            right: 40
        }
    }
);

export default PasswordElementThree;