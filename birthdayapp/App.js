import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView } from 'react-native';
import firebase from './src/utils/Firebase';
import "firebase/auth";

export default function App() {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((response) => {
      setUser(response);
    })
  }, [])
  
  if (user === undefined) return null;
  
  return (
    <SafeAreaView>
      {user ? <Text>Estas logueado</Text> : <Text>NO estas logueado</Text>}
    </SafeAreaView>
  )
}
