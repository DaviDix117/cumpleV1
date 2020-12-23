import React,{useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AddBirthday from './AddBirthday'
import ActionBar from './ActionBar'
import firebase from '../utils/Firebase';
import 'firebase/firestore';
import moment from 'moment';

firebase.firestore().settings({experimentalForceLongPolling: true});
const db = firebase.firestore(firebase);

export default function ListBirthday(props) {
    const {user}=props;
    const [showList, setShowList] = useState(true); /* State para determinar si cargar la "List"
                                                    o el componente AddBirthday */

    const [birthday, setBirthday] = useState([]);
    const [pasaBirthday, setPasaBirthday] = useState([]);

    useEffect(() => {
        setBirthday([]);
        setPasaBirthday([]);
        db.collection(user.uid)
        .orderBy("dateBirth","asc")
        .get()
        .then((response) => {
            const itemsArray = [];
            response.forEach((doc) => {
                const data = doc.data();
                data.id = doc.id;
                itemsArray.push(data);
            });
            formatData(itemsArray);
        })
    }, [])

    const formatData = (items) => {
        const currentDate = moment().set({
            hours: 0,
            minute: 0,
            second: 0,
            millisecond: 0,
        });

        const birthdayTempArray = [];
        const pasatBrithdayTempArray = [];

        //Iterar todas las fechas
        items.forEach((item) => {
            //Darle format a la fecha que nos llega
            const dateBirth = new Date(item.dateBirth.seconds * 1000);
            const dateBirthday = moment(dateBirth);
            const currentYear = moment().get('year');
            dateBirthday.set({year: currentYear});
            
            //sacar la difernecia entre dias
            const diffDate = currentDate.diff(dateBirthday, "days");//DIferencia entre hoy y la qu ellega
            //Guardar nuevas propiedades en nuestro item
            const itemTemp = item;
            itemTemp.dateBirth = dateBirthday;
            itemTemp.days = diffDate;

            //Comparacion si es actual o posterior
            if(diffDate <= 0){
                birthdayTempArray.push(itemTemp);

            }else{
                pasatBrithdayTempArray.push(itemTemp);

            }

            setBirthday(birthdayTempArray);
            setPasaBirthday(pasatBrithdayTempArray);
        });
    }

    return (
        <View style={styles.container}>
            {showList ? (
                <>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <Text>LIST</Text>
                    <ActionBar />
                </>
            ): (
                <AddBirthday user={user} setShowList={setShowList}/>
            ) }

            {/* Le envia el use ste¿ate de cambiar al boton que s eencuetra en un componente aparte para que este lo ejecute */}
            <ActionBar  showList={showList} setShowList={setShowList} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        height: '100%',
    }
})
