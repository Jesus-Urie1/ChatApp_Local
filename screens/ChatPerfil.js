import React, { useEffect, useState, useContext} from 'react'
import { database } from '../config/firebase'
import { collection, onSnapshot, orderBy, query } from '@firebase/firestore'
import ChatperfilComponent from '../components/ChatperfilComponent'
import { Text, TouchableOpacity, StyleSheet, View, Alert} from "react-native";
import { useNavigation } from '@react-navigation/native';
import AuthenticatedUserContext from "../components/context";
import { deleteDoc, doc} from '@firebase/firestore'
import Entyop from '@expo/vector-icons/Entypo'

export default function ChatPerdil(navigation) {
    const [products, setProducts] = useState([]);
    const { user } = useContext(AuthenticatedUserContext);
    const navigationChat = useNavigation();
    const chatcode = navigation.route.params.chatcode
    
    useEffect(() => {
        const collectionRef = collection(database, chatcode);
        const q = query(collectionRef, orderBy('codeChat', 'desc'));
        const unsubscribe = onSnapshot(q, querySnapshot => {
          setProducts(querySnapshot.docs.map(doc => {
                return {
                  imagen: doc.data().imagenChat,
                  nombrechat: doc.data().nombreChat,
                  codechat: doc.data().codeChat,
                }
              }
            )
          )})
        return unsubscribe;
    },[])

    function salirChat(code){
      Alert.alert(
        "Abandonar Chat",
        "¿Seguro que deseas salir?",
        [
          {
            text: "Cancelar",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Si", onPress: () => {deleteDoc(doc(database, "users", user.email,"chats",code));
          navigationChat.reset({index: 0, routes: [{name: "Home"}]})} }
        ]
      );
      
    }
    useEffect(() => {
      navigationChat.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={() => salirChat(chatcode)} style={styles.chatButton}>
            <Entyop name="log-out" size={24} style={{ color: '#006B76', paddingRight: 5 }} />
          </TouchableOpacity>
        ),
      });
    }, [navigationChat]);
    return (
      <View style={styles.container}>
        {products.map(product => {
          if(product !== undefined)
          return <ChatperfilComponent key={product.codechat} {...product}/>
        })}
          <TouchableOpacity style={styles.button} onPress={() => navigationChat.navigate("ChatPerfilEdit",{codechat: chatcode})}>
            <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>Editar</Text>
          </TouchableOpacity>
      </View>
    )
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#006B76',
    height: 50,
    width: 250,
    alignSelf: "center",
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
  }
})