import React, { useEffect, useContext}from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet} from "react-native"
import Entyop from '@expo/vector-icons/Entypo'
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import AuthenticatedUserContext from "../components/context";
import { collection, onSnapshot, orderBy, query } from '@firebase/firestore'
import { database } from '../config/firebase'

export default function Home({navigation}) {
    const {user} = useContext(AuthenticatedUserContext);
    const onSignOut = () => {
        signOut(auth).catch(error => console.log(error));
    };
    
    useEffect(() => {
        const collectionRef = collection(database, "users");
        const q = query(collectionRef, orderBy('email', 'desc'));

        const unsubscribe = onSnapshot(q, querySnapshot => {
            querySnapshot.docs.map(doc => {
              if (doc.data().email === user.email){
                user.displayName = doc.data().nombre
              }
            })
          })
        return unsubscribe;
    },[])
    console.log(user.displayName)
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