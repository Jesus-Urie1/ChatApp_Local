import React,{useState, useEffect, useContext, useRef} from "react";
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
import { database} from "../config/firebase";
import { collection, onSnapshot, orderBy, query, addDoc } from '@firebase/firestore'

export default function Chat(navigation){

  var numbermsg 
  const chatScrollR = useRef();
  const navigationChat= useNavigation();
  const { user } = useContext(AuthenticatedUserContext);
  const [mensajes,setMensajes] = useState([]);
  const chatname = navigation.route.params.chatcode;
  

  useEffect(() => {
    const collectionRef = collection(database, chatname);
    const q = query(collectionRef, orderBy('numbermsg', 'asc'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      setMensajes(
        querySnapshot.docs.map(doc => {
            return {
              texto: doc.data().texto,
              tiempo: doc.data().tiempo,
              user: doc.data().usuario,
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
            <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={styles.perfilButton}>
                <Entyop name="cog" size={24} style={{color: '#006B76'}}/>
            </TouchableOpacity>
        ),
        title: chatname,
        headerTitleAlign: 'center',
    });
}, [navigationChat]);


  const usuario = user.displayName

 

  const sendMsj = (msj) => {
    numbermsg = ++numbermsg
    const time = moment().format("hh:mm a");
    const datos = {
      "texto": msj,
      "tiempo": time,
      "usuario": usuario,
      "numbermsg": numbermsg
    }
    addDoc(collection(database, chatname), datos);
  }
  

  return(
    <>
        <View style={styles.msj}>
            <ScrollView style={styles.chatView} ref={chatScrollR}>
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