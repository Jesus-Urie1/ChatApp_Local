import React,{useState} from "react";
import {StyleSheet,View,TouchableOpacity,TextInput,Image,KeyboardAvoidingView} from "react-native";
import Entyop from '@expo/vector-icons/Entypo';

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
        <KeyboardAvoidingView
        behavior= {(Platform.OS === 'ios')? "padding" : null}
        keyboardVerticalOffset={70}>
        <View style={styles.containter}>
            <TextInput
                placeholder="Enviar mensaje..."
                placeholderTextColor='grey'
                
                value={mensaje}
                onChange={(e) => setMensaje(e.nativeEvent.text)}
            />
            <TouchableOpacity onPress={enviar} style={styles.iconSend}>
                <Entyop name="direction" size={20} style={{color:"#fff"}}/>
            </TouchableOpacity>
        </View>
        </KeyboardAvoidingView> 
    )
}

const styles = StyleSheet.create({
    containter:{
        paddingHorizontal: 15,
        flexDirection: "row",
        justifyContent:"space-between",
        borderRadius:50,
        marginBottom:5,
        marginHorizontal:5,
        backgroundColor: "#fff",
        borderWidth: 2,
        borderColor: "#006B76",
    },
    iconSend: {
        color: '#fff',
        marginBottom: 10,
        marginTop:10,
        width: 30,
        height: 30,
        backgroundColor: "#006B76",
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',  
    }
})