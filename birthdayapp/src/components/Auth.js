import React, { useState } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    return (
        <View style={styles.view}>
            <Image style={styles.logo} source={require('../assets/logo.png')} />
            <Text> Auth... </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    view:{
        flex:1,
        alignItems: 'center',
    },
    logo: {
        width: '90%',
        height: 240,
        marginTop: 50,
        marginBottom: 50,
    }
})

