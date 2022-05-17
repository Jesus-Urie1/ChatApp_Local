import React,{useState,useEffect} from "react";
import {StyleSheet, View,Text} from "react-native";
import letterColors from "../utils/letterColors";


export default function mensaje(props){
    const {
        msj:{
            texto,user,tiempo
        },usuario
    } = props;
    
    const msjMio = user === usuario ;
    const [bgColorLetter, setBgColorLetter] = useState(null);
   
    useEffect(() =>{
        const char = user.trim()[0].toUpperCase();
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
    return(
        <View style={[styles.container, conditionalStyle.container]}>
            <View style={[styles.viewMsj, conditionalStyle.viewMsj]}>
            {!msjMio &&(
                     <Text style={[styles.letter, {color: `rgb(${bgColorLetter})`}]}>
                        {user}
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