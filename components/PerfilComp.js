import React from "react";
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, TouchableOpacity} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { updateDoc } from "firebase/firestore";

export default function PerfilComp({
    id,
    email,
    nombre,
    telefono,
}){
    return(
        <View style={styles.container}>
            <KeyboardAvoidingView
                behavior= {(Platform.OS === 'ios')? "padding" : null}>
                <Image style={styles.foto}
                    source={require('../assets/foto.jpg')}/>
                <TextInput style={styles.input}
                        defaultValue={email}/>
                <TextInput style={styles.input}
                        defaultValue={nombre}/>
                <TextInput style={styles.input}
                        defaultValue={telefono}/>
                <TouchableOpacity style={styles.button}>
                    <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>Actualizar</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>   
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
        height: 50,
        width: 250,
        marginBottom: 20,
        fontSize: 17,
        borderRadius: 10,
        padding: 12,
        textAlign:'center'
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 40,
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: "#006B76",
        alignSelf: "center",
        paddingBottom: 24,
    },
    button: {
        backgroundColor: '#006B76',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 100,
    },
    foto: {
        height: 250,
        width: 250,
        borderRadius: 50,
        marginBottom: 30,
        marginTop: 20
    }
  })