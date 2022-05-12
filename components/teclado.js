import React,{useState} from "react";
import {StyleSheet, View,Text,TouchableOpacity,TextInput,Platform,Image} from "react-native";


export default function teclado(props){
    const { sendMsj } = props
    const [mensaje,setMensaje] = useState('');

    const enviar = ()=>{
        
        //verificamos que el msj tenga mas de 0 caracteres
        if(mensaje.length > 0){
            sendMsj(mensaje);
            setMensaje('');
        }
    }
    return(
        <View style={styles.containter}>
            <TextInput style={styles.input}
                placeholder="Enviar mensaje..."
                placeholderTextColor='grey'
                value={mensaje}
                onChange={(e) => setMensaje(e.nativeEvent.text)}
            />
            <TouchableOpacity onPress={enviar}>
            <Image
            style={styles.iconSend}
            source={require('../assets/iconEnv.jpg')}
            />
            </TouchableOpacity>
            
        </View>
    )
}

const styles = StyleSheet.create({
    containter:{
        backgroundColor: "#141d27",
        paddingBottom: 5,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent:"space-between",
        borderRadius:50,
        marginBottom:5,
        marginHorizontal:5,
    },
    input:{
        color:'#fff'
    },
    iconSend: {
        marginTop:10,
        width: 35,
        height: 35,    
    }
})