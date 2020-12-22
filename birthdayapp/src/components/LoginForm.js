import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TextInput, Button, View } from 'react-native';
import {validateEmail} from "../utils/validations";
import firebase from "../utils/Firebase";

export default function LoginForm(props) {
    const {changeForm} = props; //Realizar desctructuring, para sacar la función
    const [formData, setFormData] = useState(defaultValue()); //Guarda los valores data
    const [formError, setFormError] = useState({}); //Guarda los posible errores producidos 

    const onChange = (e, type) => {
        // console.log("data: ", e.nativeEvent.text);
        // console.log("type ", type);
        setFormData({...formData, [type]: e.nativeEvent.text});
    };

    const login = ()=>{
        console.log(formData);

        let errors = {};


        if(!formData.email || !formData.password){
            if(!formData.email) errors.email = true;
            if(!formData.password) errors.password = true;
            console.log("dos vacíos");
        } else if(!validateEmail(formData.email)) {
            errors.email = true;
            console.log("email invalido");
        } else {
            firebase
              .auth()
              .signInWithEmailAndPassword(formData.email, formData.password)
              .catch(() => {
                setFormError({
                  email: true,
                  password: true,
                });
              });
        }
        setFormError(errors);
    };

    return (
        <>
            <TextInput 
                style={[styles.input, formError.email && styles.error]}
                placeholder="Correo electrónico"
                placeholderTextColor="#969696"
                // onChange={(e) => setFormData({...formData, email: e.nativeEvent.text})}
                onChange={(e) => onChange(e, "email")}
            />

            <TextInput 
                style={[styles.input, formError.password && styles.error]}
                placeholder="Contraseña"
                placeholderTextColor="#969696"
                secureTextEntry={true}
                // onChange={(e) => setFormData({...formData, password: e.nativeEvent.text})}
                onChange={(e) => onChange(e, "password")}

            />

            <TouchableOpacity onPress={login}>
                <Text style={styles.btnText} >Aceptar</Text>
            </TouchableOpacity>

            <View style={styles.login}>
                <TouchableOpacity onPress={changeForm}>
                    <Text style={styles.btnText} >Registrarse</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

// //función para no repetir código de formulario
// function Inputs(props) {
//     const {placeholder} = props;

//     return (
//         <TextInput 
//             style={styles.input}
//             placeholder={placeholder}
//             placeholderTextColor="#969696"
//         />
//     );
// }

function defaultValue() {
    return{
        email: "",
        password: "",
    }
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
    },
    login: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 10,
    },
    error: {
        borderColor: '#940c0c',
    },
});
