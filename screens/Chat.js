import React,{useState, useEffect, useContext} from "react";
import {StyleSheet, View,ScrollView} from "react-native";
import Teclado from "../components/teclado";
import ChatHeader from "../components/chatHeader";
import { map } from "lodash";
import { db }from "../config/firebase";
import { ref, push, onValue} from "firebase/database"; 
import Mensaje from "../components/mensaje";
import moment from "moment";
import AuthenticatedUserContext from "../components/context";

export default function Chat(navigation){
  
  const { user } = useContext(AuthenticatedUserContext);
  const [mensajes,setMensajes] = useState([]);
  const chatname = navigation.route.params.chatcode

  useEffect(() =>{
    const chat =  ref(db,chatname);
    onValue(chat, (snapshot) => {
      const data = snapshot.val();
      setMensajes(snapshot.val());
    })
  }, []);

  //Props necesarias:
  const chatName = chatname
  const usuario = user.email


  const sendMsj = (msj) => {
    const time = moment().format("hh:mm a");
    push(ref(db,chatname),{
      user: usuario,
      texto: msj,
      tiempo: time,
    });
  }

  return(
    <>
        
        <View style={styles.msj}>
        <ChatHeader chatName={chatName}/>
            <ScrollView style={styles.chatView}>
              {
                map(mensajes, (msj,index) => (
                  <Mensaje key={index} msj={msj} usuario={usuario}/>
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
        marginTop:10,
        backgroundColor:"#1b2734"
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
    color: "#ffff",
  },
  chatView:{
    backgroundColor:"#1b2734"
  },
});