import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TextInput, Button } from 'react-native';

export default function LoginForm(props) {
    const {changeForm} = props; //Realizar desctructuring, para sacar la función

    const [formData, setFormData] = useState({

    });

    return (
        <>
            <Inputs placeholder="Correo electrónico" />
            <Inputs placeholder="Contraseña" />

            <TouchableOpacity onPress={changeForm}>
                <Text style={styles.btnText} >Registrarse</Text>
            </TouchableOpacity>
        </>
    )
}

//función para no repetir código de formulario
function Inputs(props) {
    const {placeholder} = props;

    return (
        <TextInput 
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor="#969696"
        />
    );
}

const styles = StyleSheet.create({
    btnText:{
        color: '#fff',
        fontSize: 18,
    },
    input: {
        height: 50,
        color: '#fff',
        width: '80%',
        marginBottom: 25,
        backgroundColor: '#1e3040',
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#1e3040', 
    }
})
