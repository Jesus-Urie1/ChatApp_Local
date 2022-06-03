import React, { useEffect, useContext, useState}from 'react'
import { TouchableOpacity, Text, Image, StyleSheet, FlatList, SafeAreaView, StatusBar} from "react-native"
import Entyop from '@expo/vector-icons/Entypo'
import AuthenticatedUserContext from "../components/context";
import { collection, onSnapshot, orderBy, query, doc, updateDoc} from '@firebase/firestore'
import { database } from '../config/firebase'


export default function Home({navigation}) {
    const {user} = useContext(AuthenticatedUserContext);
    const [chats, setChats] = useState([]);
    const [chatsId, setChatsId] = useState([]);
    
    const Item = ({ datosChat }) => (
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate("Chat",{chatcode: datosChat.codeChat})}>
          <Image
              style={styles.imagen}
              source={{uri: datosChat.imagenChat}}
              width= {70}
              height={70}
          />
        <Text style={styles.title}>{datosChat.nombreChat}</Text>
        <Text style={styles.msj}>{datosChat.ultimoTexto}</Text>
        <Text style={styles.hora}>{datosChat.ultimoTiempo}</Text>
      </TouchableOpacity>
    );
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
          getChatsId()
          mostrarChats()
    },[])
    
    function mostrarChats(){
        chatsId.map((chat) => {
          const collectionRef = collection(database, chat.chats);
          const q = query(collectionRef, orderBy('codeChat', 'desc'));
          onSnapshot(q, querySnapshot => {
          setChats(querySnapshot.docs.map(doc => {
                  DATA.unshift(doc.data())
                  return DATA
              }))
            })
        })
    }
   
    function getChatsId(){
      const collectionRef = collection(database, `users/${user.email}/chats`);
      const q = query(collectionRef, orderBy('chat', 'desc'));
      onSnapshot(q, querySnapshot => {
      setChatsId(querySnapshot.docs.map(doc => {
              return {
                chats:doc.data().chat
              }
          }))
        })
    }
      
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
    console.log(chats[0],"=> chats")
    
    return (
        <SafeAreaView style={styles.container}>
                <FlatList
                data={chats[0]}
                renderItem={renderItem}
                keyExtractor={item => item.codeChat}/>
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