import React, { useEffect,}from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet} from "react-native"
import Entyop from '@expo/vector-icons/Entypo'
import { signOut } from 'firebase/auth';
import { auth,database } from '../config/firebase';
import { onSnapshot,doc,query,where,collection,setDoc } from "@firebase/firestore";

export default function Home({navigation}) {
    //console.log("user: ",auth.currentUser.displayName);

    useEffect(() => {
        onSnapshot(doc(database, "users", auth.currentUser.email), (docu) => {
            let userdata = docu.data(); 
            userdata['uid'] = auth.currentUser.uid;
            setDoc(doc(database,"users",userdata.email),userdata)
            .then(console.log("se ha agregado la uid al usr"))
            .catch((Error)=>console.log(Error))

        });
    }, []);

    const onSignOut = () => {
        signOut(auth).catch(error => console.log(error));
        navigation.navigate("Login")
    };
    
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity style={{ marginLeft: 15 }} onPress={onSignOut} >
                    <Entyop name="log-out" size={24} style={{color: '#006B76', marginRight: 10}}/>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={styles.perfilButton}>
                    <Entyop name="user" size={24} style={{color: '#006B76'}}/>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("NewChat")} style={styles.chatButton}>
                <Entyop name="chat" size={24} style={{color: '#fff'}}/>
            </TouchableOpacity> 
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: "#fff",
    },
    chatButton: {
        backgroundColor: "#006B76",
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
        marginBottom: 50,
    },
    perfilButton: {
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    }
});