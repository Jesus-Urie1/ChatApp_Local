import React,{useState,useEffect} from "react";
import {StyleSheet, View,Text} from "react-native";

export default function mensaje(props){
   
    const {
        msj:{
            texto,user,tiempo
        },usuario
    } = props;
        //si user = usuario es true si no false
    const msjMio = user === usuario ;
    const conditionalStyle = {
        container:{
            justifyContent: msjMio ? "flex-end" : "flex-start", 
        },
        viewMsj:{
            backgroundColor: msjMio ? "#006B76" : "#3b83bd",
        }
    }
    return(
        <View style={[styles.container, conditionalStyle.container]}>
            <View style={[styles.viewMsj, conditionalStyle.viewMsj]}>
                <Text style={styles.msj}>{texto}</Text>
                <Text style={styles.tiempo}>{tiempo}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        margin: 5,
        alignItems: 'center',
    },
    viewMsj:{
        borderRadius: 15,
        minHeight: 35,
        minWidth:"40%",
        maxWidth:"80%",
    },
    msj:{
        padding:10,
        paddingBottom:30,
        color:"white",
    },
    tiempo:{
        fontSize:10,
        position:"absolute",
        bottom: 10,
        color:"white",
        marginLeft:"65%",
    },
})