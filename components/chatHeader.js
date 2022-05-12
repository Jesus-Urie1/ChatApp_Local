import React,{useState} from "react";
import {StyleSheet, View,Text,TouchableOpacity,TextInput,Platform,Image} from "react-native";

export default function ChatHeader(props){
    return (
    <View style={styles.header}>
        <Text style={styles.headerText}>{props.chatName}</Text>
    </View>
    );
}
const styles = StyleSheet.create({
   
  header:{
    paddingBottom:15 ,
    paddingTop:15,
    flexDirection: "row",
    justifyContent:"center",
    backgroundColor:"#141d27",
  },

  headerText:{
    fontWeight: "bold",
    color: "#ffff",
  }
});