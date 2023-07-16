import React from "react";

import { Image, StyleSheet, View } from 'react-native';
import logo from '../assets/Github.png';
const Logo = () => {
    return (
        <View style={Styles.container}>
            <Image source={require("../assets/Github.png")} style={Styles.logo}/>
        </View>
    )
}

export default Logo;

const Styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 150,
        height: 150,
    },
})