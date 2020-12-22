import React, { useState } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';


export default function Auth() {
    //Hook para determinar si renderizar el formulario de login o el formulario de registro
    const [isLogin, setIsLogin] = useState(true);

    //Función para cambiar el form, le enviar lo contrario de login o register
    const changeForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <View style={styles.view}>
            <Image style={styles.logo} source={require('../assets/logo.png')} />
            {isLogin ? <LoginForm changeForm={changeForm} /> : <RegisterForm  changeForm={changeForm} /> }
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
        height: 220,
        marginTop: 30,
        marginBottom: 30,
    }
})

