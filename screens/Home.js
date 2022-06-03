import React, { useEffect, useContext, useState}from 'react'
import { TouchableOpacity, Text, Image, StyleSheet, FlatList, SafeAreaView, StatusBar} from "react-native"
import Entyop from '@expo/vector-icons/Entypo'
import AuthenticatedUserContext from "../components/context";
import { collection, onSnapshot, orderBy, query, doc, updateDoc} from '@firebase/firestore'
import { database } from '../config/firebase'




const Item = ({ datosChat }) => (
    <TouchableOpacity style={styles.item}>
        <Image
            style={styles.imagen}
            source={{uri: datosChat.url}}
            width= {70}
            height={70}
        />
      <Text style={styles.title}>{datosChat.title}</Text>
      <Text style={styles.msj}>{datosChat.msj}</Text>
      <Text style={styles.hora}>{datosChat.hora}</Text>
    </TouchableOpacity>
  );

export default function Home({navigation}) {
    const {user} = useContext(AuthenticatedUserContext);
    const [chats, setChats] = useState([]);
    let DATA = []
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
          mostrarChats("Khcktz")
    },[])
    
    function mostrarChats(codeChat){
        const collectionRef = collection(database, codeChat);
        const q = query(collectionRef, orderBy('codeChat', 'desc'));
        onSnapshot(q, querySnapshot => {
        setChats(querySnapshot.docs.map(doc => {
                return {
                  codechat: doc.data().codeChat,
                  title: doc.data().nombreChat,
                  url: doc.data().imagenChat,
                  msj: 'Primer mensaje',
                  hora: '01:15 pm',
                }
            }))
          })
    }

   
    console.log(DATA, "=> DATA")
    console.log(chats,"=> chats")
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
                <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={styles.perfilButton}>
                    <Entyop name="user" size={24} style={{color: '#006B76'}}/>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate("NewChat")} style={styles.chatButton}>
                    <Entyop name="chat" size={24} style={{color: '#006B76'}}/>
                </TouchableOpacity> 
            ),
        });
    }, [navigation]);

    const renderItem = ({ item }) => (
        <Item datosChat={item} />
      );
    return (
        <SafeAreaView style={styles.container}>
                <FlatList
                data={chats}
                renderItem={renderItem}
                keyExtractor={item => item.codechat}/>
        </SafeAreaView>   
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,       
        backgroundColor: '#FFFFFF',
    },
    chatButton: {
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    perfilButton: {
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        display: "flex",
        flexGrow: 1,
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        paddingBottomg: 15,
        paddingTop: 15,
        paddingStart: 3,
        marginVertical: 1,
        borderRadius: 10,
        paddingLeft: 5,
       
      },
      title: {
        color: '#1e272e',
        fontSize: 17,
        margin: 5,
        alignItems: 'center',
        fontWeight: 'bold',
      },
      hora: {
        color: '#1e272e',
        position:"absolute",
        bottom: 5,
        right:10,
      },
      msj: {
        color: '#1e272e',
        position:"absolute",
        bottom: 10,
        left:80,
        fontStyle: 'italic',
      },
      imagen: {
        alignItems: 'center',
        width: 60,
        height: 60,
        borderRadius: 40,
        marginBottom: 10,
      },
      
});