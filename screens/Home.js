import React, { useEffect, useContext}from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet, FlatList, SafeAreaView, StatusBar} from "react-native"
import Entyop from '@expo/vector-icons/Entypo'
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import AuthenticatedUserContext from "../components/context";
import { collection, onSnapshot, orderBy, query, doc, updateDoc} from '@firebase/firestore'
import { database } from '../config/firebase'

const DATA = [
    {
        id: '1',
        title: 'First Chat',
        date: '28/04/2022',
    },
    {
        id: '2',
        title: 'Second Chat',
        date: '28/04/2022',
    },
    {
        id: '3',
        title: 'Third chat',
        date: '28/04/2022',
    },
    {
        id: '4',
        title: 'Fourth chat',
        date: '28/04/2022',
    }
]


const Item = ({ datosChat }) => (
    <TouchableOpacity style={styles.item}>
        <Image
            style={styles.imagen}
            source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
            width= {70}
            height={70}
        />
      <Text style={styles.title}>{datosChat.title}</Text>
      <Text style={styles.title}>{datosChat.date}</Text>
    </TouchableOpacity>
  );

export default function Home({navigation}) {
    const {user} = useContext(AuthenticatedUserContext);
    const onSignOut = () => {
        signOut(auth).catch(error => console.log(error));
    };
    
    useEffect(() => {
        const collectionRef = collection(database, "users");
        const q = query(collectionRef, orderBy('email', 'desc'));
        onSnapshot(q, querySnapshot => {
            querySnapshot.docs.map(docs => {
              if (docs.data().email === user.email){
                const docRef = doc(database, "users", docs.id);
                updateDoc(docRef, {
                    "uid": user.uid,
                })
              }
            })
          })
    },[])

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
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity style={{ marginLeft: 15}} onPress={onSignOut} >
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

    const renderItem = ({ item }) => (
        <Item datosChat={item} />
      );
    return (
        <View style={styles.container}>
            
                <FlatList
                    data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}/>
                
           
            <TouchableOpacity onPress={() => navigation.navigate("NewChat")} style={styles.chatButton}>
                <Entyop name="chat" size={24} style={{color: '#fff'}}/>
            </TouchableOpacity> 
        </View>    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: "#fff",
        backgroundColor: '#FFFFFF',
    },
    chatButton: {
        backgroundColor: "#006B76",
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
        marginBottom: 20,
        marginTop: 10,
        
    },
    perfilButton: {
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    item: {
        display: "flex",
        flexGrow: 1,
        flexDirection: 'row',
        backgroundColor: '#f8f6f6',
        paddingBottomg: 15,
        paddingTop: 15,
        paddingStart: 3,
        marginVertical: 1,
        marginHorizontal: 30,
        borderRadius: 7,
        paddingLeft: 5,
        flexWrap: 'wrap',
        // borderBottomColor: 'black',
        // borderBottomWidth: 1,
      },
      title: {
        color: '#1e272e',
        fontSize: 20,
        margin: 5,
        alignItems: 'center',
      },
      imagen: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 30,
        marginBottom: 10,
      },
      
});