import React from "react";
import { View, Text, StyleSheet} from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function PerfilComp({
    id,
    email,
    nombre,
    telefono,
}){
    return(
        <View style={styles.container}>
            <Text>{email}</Text>
            <TextInput
                style={styles.input}
                defaultValue={nombre}
            />
            <TextInput
                style={styles.input}
                defaultValue={telefono}
            />
            <TextInput
                style={styles.input}
                
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    input: {
        backgroundColor: "#F6F7FB",
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
    },
  })