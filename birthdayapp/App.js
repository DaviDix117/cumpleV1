import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, StatusBar, View, Button } from 'react-native';
import firebase from './src/utils/Firebase';
import "firebase/auth";
import Auth from './src/components/Auth';

export default function App() {
  const [user, setUser] = useState(undefined); //GUarda el estado del usuario con el setUser

  useEffect(() => {
    //captura el estado del usuario si esta logueado o no, con el .onAuth...
    firebase.auth().onAuthStateChanged((response) => {
      setUser(response);
    })
  }, [])
  
  //MIeras usuario sea undefined,significa que vacio pero no Null, espera a que setUser tenga contenido
  if (user === undefined) return null;
  
  return (

    <>
      <StatusBar barStyle={'light-content'}/>
      
      <SafeAreaView style={styles.background }>
        {/* si user tiene contenido, 1.muestra el texto esta logueado ~si es nulo ~ 2. carga auth */}
        {user ? <Logout /> : <Auth />}
      </SafeAreaView>

      

    </>
  )
}

function Logout() {
  const logout = () =>{
    firebase.auth().signOut();
  }

  return(
    <View>
      <Text>Estas logueado</Text>
      <Button title="cerrar sesión" onPress={logout}></Button>
    </View>
  )
};

const styles = StyleSheet.create({
  background:{
    backgroundColor: '#15212b',
    height: '100%',
  }
});

