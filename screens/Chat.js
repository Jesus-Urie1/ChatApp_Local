import React,{useState, useEffect, useContext} from "react";
import {StyleSheet, View,ScrollView, TouchableOpacity} from "react-native";
import Teclado from "../components/teclado";
import { map } from "lodash";
import { db }from "../config/firebase";
import { ref, push, onValue} from "firebase/database"; 
import Mensaje from "../components/mensaje";
import moment from "moment";
import AuthenticatedUserContext from "../components/context";
import { useNavigation } from '@react-navigation/native';
import Entyop from '@expo/vector-icons/Entypo'

export default function Chat(navigation){

  const navigationChat= useNavigation();
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

  useEffect(() => {
    navigationChat.setOptions({
        headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={styles.perfilButton}>
                <Entyop name="cog" size={24} style={{color: '#006B76'}}/>
            </TouchableOpacity>
        ),
    });
}, [navigationChat]);

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
    backgroundColor:"#fff"
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
    backgroundColor:"#fff"
  },
  perfilButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  }
});