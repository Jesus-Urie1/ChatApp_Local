import React, {useState, useContext}from "react";
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, TouchableOpacity, SafeAreaView, Alert} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { doc, updateDoc } from "firebase/firestore";
import * as ImagePicker from 'expo-image-picker';
import { database } from "../config/firebase";
import { useNavigation } from '@react-navigation/native';
import AuthenticatedUserContext from "../components/context";

export default function PerfilEdit(navigation){
    const imgprincipal = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Antu_insert-image.svg/1200px-Antu_insert-image.svg.png"
    const navigationBack = useNavigation();
    const { user } = useContext(AuthenticatedUserContext);
    const id = navigation.route.params.idpass
    const [nombresend, setNombresend] = useState("");
    const [telefonosend, setTelefonosend] = useState("");
    const [imagensend, setImagensend] = useState(imgprincipal);
    
    const showImagePicker = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          alert("¡Te has negado a permitir que esta aplicación acceda a tus fotos!");
          return;
        }
    
        const result = await ImagePicker.launchImageLibraryAsync();
    
        if (!result.cancelled) {
          setImagensend(result.uri);
        }
      }

    

    const actualizar = () => {
        if(nombresend === "" && telefonosend === "" && imagensend === imgprincipal){
            Alert.alert("Error", "Ingresa datos")
        }else{
            const docRef = doc(database, "users", id);
            if(nombresend !== ""){
                updateDoc(docRef, {
                    "nombre": nombresend,
                })
            }
            if(telefonosend !== ""){
                updateDoc(docRef, {
                    "telefono": telefonosend,
                })
            }
            if(imagensend !== imgprincipal){
                updateDoc(docRef, {
                    "imagen": imagensend,
                })
            }
            navigationBack.goBack();
        }
        
    }
    return(
        <View style={styles.container}>
            <SafeAreaView style={styles.form}>
            <KeyboardAvoidingView
                behavior= {(Platform.OS === 'ios')? "padding" : null}>
                <TouchableOpacity onPress={showImagePicker}>
                <Image
                    source={{ uri: imagensend}}
                    style={styles.foto}
                    />
                </TouchableOpacity>
                <TextInput style={styles.input}
                        placeholder="Nuevo Nombre"
                        value={nombresend}
                        maxLength={20}
                        onChangeText={(text) => setNombresend(text)}/>
                <TextInput style={styles.input}
                        placeholder="Nuevo Telefono"
                        value={telefonosend}
                        keyboardType={"number-pad"}
                        maxLength={10}
                        onChangeText={(text) => setTelefonosend(text)}/>
                <TouchableOpacity style={styles.button} onPress={actualizar}>
                    <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>Actualizar</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            </SafeAreaView>
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
    },
    text: {

    }
  })