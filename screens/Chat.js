import React,{useState, useEffect, useRef} from "react";
import {StyleSheet, View,ScrollView, TouchableOpacity} from "react-native";
import Teclado from "../components/teclado";
import { map } from "lodash";
import { db }from "../config/firebase";
import { ref, push, onValue} from "firebase/database"; 
import Mensaje from "../components/mensaje";
import moment from "moment";
import { useNavigation } from '@react-navigation/native';
import Entyop from '@expo/vector-icons/Entypo';
import { auth, database } from "../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { collection, onSnapshot, orderBy, query, addDoc} from '@firebase/firestore'

export default function Chat(navigation){

  const chatScrollR = useRef();
  const navigationChat= useNavigation();
  const [mensajes,setMensajes] = useState([]);
  const chatcode = navigation.route.params.chatcode;
  //Props necesarias:
  const usuario = auth.currentUser.displayName;
  const iduser = auth.currentUser.uid;
  const correo = auth.currentUser.email;
  const [nombreChat, setNombreChat] = useState();

  const title = () => {
    navigationChat.setOptions({
      title: nombreChat,
      headerTitleAlign: 'center',
    });
  }
  title();
  useEffect(()=>{
    const collectionRef = collection(database, chatcode);
      const qname = query(collectionRef, orderBy('codeChat', 'desc'));
      const nameChat = onSnapshot(qname, querySnapshot => {
        querySnapshot.docs.map(doc => {
          setNombreChat(doc.data().nombreChat)
            }
          )
        })
    return nameChat;
  },[])
  //const [nombreChat, setNombreChat] = useState(navigation.currentUser.params.displayName);

  //const documento = doc(database,chatname,"datosChat");
  /*const datosChat = {
    "chatName": chatname,
    "user": usuario,
  }
  setDoc(documento,datosChat)*/

  useEffect(() => {
    const collectionRef = collection(database, chatcode);
    const q = query(collectionRef, orderBy('tiempomsj', 'asc'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      setMensajes(
        querySnapshot.docs.map(doc => {
            return {
              texto: doc.data().texto,
              tiempo: doc.data().tiempo,
              iduser: doc.data().iduser,
              usuarioname: doc.data().usuarioname,
              correo: doc.data().correo,
            }
        } 
        )
      )})
    return unsubscribe;
  },[])

  useEffect(()=>{
    chatScrollR.current.scrollTo({y: 100000000});
  },[mensajes]);
  
  useEffect(() => {
    navigationChat.setOptions({
        headerRight: () => (
          <TouchableOpacity onPress={() => navigationChat.navigate("ChatPerfil",{chatcode: chatcode})} style={styles.perfilButton}>
          <Entyop name="cog" size={24} style={{color: '#006B76'}}/>
      </TouchableOpacity>
        ),

    });
}, [navigationChat]);


  const sendMsj = (msj) => {
    const time = moment().format("hh:mm a");
    const timemsj = moment().format("hh:mm:ss a");
    const datos = {
      "texto": msj,
      "tiempo": time,
      "tiempomsj": timemsj,
      "iduser": iduser,
      "usuarioname": usuario,
      "correo":correo
    }
    addDoc(collection(database, chatcode), datos);
  }

  return(
    <>
        <View style={styles.msj}>
            <ScrollView style={styles.chatView} ref={chatScrollR}>
              {
                map(mensajes, (msj,index) => (
                  <Mensaje key={index} msj={msj} usuario={iduser} />
                ))
              }   
            </ScrollView> 
            <Teclado sendMsj={sendMsj}/>
        </View>
    </>
  )
}

const styles = StyleSheet.create({
  msj: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor:"#fbf2ea"
  },
  botonLogout: {
    paddingVertical:5,
    paddingHorizontal:40,
    marginTop: 40,
  }, 
  header:{
    paddingBottom:15 ,
    paddingTop:15,
    flexDirection: "row",
    justifyContent:"center",
  },
  headerText:{
    fontWeight: "bold",
    color: "#fff",
  },
  chatView:{
    backgroundColor:"#fbf2ea"
  },
  perfilButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  }
});