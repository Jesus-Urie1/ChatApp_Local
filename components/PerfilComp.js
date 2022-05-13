import React from "react";
import { View, Text, StyleSheet} from "react-native";

export default function PerfilComp({
    id,
    email,
    nombre,
    telefono,
}){
    return(
        <View style={styles.container}>
            <Text>{nombre}</Text>
            <Text>{email}</Text>
            <Text>{telefono}</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    }
  })