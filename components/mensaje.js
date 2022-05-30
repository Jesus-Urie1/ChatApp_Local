import React,{useState,useEffect} from "react";
import {StyleSheet, View,Text} from "react-native";
import letterColors from "../utils/letterColors";
import { collection, onSnapshot, query, where } from '@firebase/firestore'
import { database} from "../config/firebase";

export default function mensaje(props){
    const {
        msj:{
            texto,iduser,tiempo,usuarioname
        },id
    } = props;
    
    const msjMio = iduser === id;
    const [Msjuser, setMsjuser] = useState(null)
    const [bgColorLetter, setBgColorLetter] = useState(null);
   
    useEffect(() =>{
        const char = usuarioname.trim()[0].toUpperCase();
        const indexLetter = char.charCodeAt() - 65;
        setBgColorLetter(letterColors[indexLetter]);
    })
    const conditionalStyle = {
        container:{
            justifyContent: msjMio ? "flex-end" : "flex-start", 
        },
        viewMsj:{
            backgroundColor: msjMio ? '#006B76' : "#fff",
            borderTopRightRadius: msjMio ? 0 : 20,
            borderTopLeftRadius: msjMio ? 20: 0,
        },
        msj:{
            color: msjMio ? "#fff" : "#000",
            textAlign: msjMio ? 'left' : 'left',
        }
    }

    function getUserData(uid) {

      const q = query(collection(database, "users"), where("uid", "==", uid));      
      onSnapshot(q, (querySnapshot) => {
          querySnapshot.forEach((doc) => {
              let nombre = doc.data().nombre
              setMsjuser(nombre)
          }); 
      });
      return(Msjuser);
  }
    return(
        <View style={[styles.container, conditionalStyle.container]}>
            <View style={[styles.viewMsj, conditionalStyle.viewMsj]}>
            {!msjMio &&(
                     <Text style={[styles.letter, {color: `rgb(${bgColorLetter})`}]}>
                        {getUserData(iduser)}
                    </Text>
            )}
                <Text style={[styles.msj, conditionalStyle.msj]}>{texto}</Text>
                <Text style={[styles.tiempo, msjMio ? styles.tiempoDerechaMio : styles.tiempoDerecha]}>{tiempo}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center',
    },
    viewMsj:{
        borderBottomEndRadius:20,
        borderBottomLeftRadius:20,
        minHeight: 20,
        minWidth:"30%",
        maxWidth:"80%",
    },
    msj:{
        padding:10,
        paddingBottom:18,
        textAlign:'lef'
    },
    tiempo:{
        fontSize:10,
        position:"absolute",
        bottom: 5,
        right:10,
    },
    tiempoDerecha:{
        color:"#a9a9a9"
    },
    tiempoDerechaMio:{
        color:'#d1d1d1',
    },
    letter:{
        fontSize:12,
        paddingHorizontal:10,
        paddingTop:5,
    }
})