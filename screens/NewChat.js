import React, { useState, useContext, useEffect } from "react";
import { Text, StyleSheet, View, TextInput, TouchableOpacity, SafeAreaView, Alert, KeyboardAvoidingView} from 'react-native'
import { database } from "../config/firebase";
import { doc, setDoc, collection, onSnapshot, orderBy, query } from '@firebase/firestore'
import AuthenticatedUserContext from "../components/context";

export default function NewChat({navigation}) {
    const [code, setcode] = useState("");
    const {user} = useContext(AuthenticatedUserContext);
    const imagenPrincipal = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Antu_insert-image.svg/1200px-Antu_insert-image.svg.png";
    const [idpass, setIdpass] = useState("");
    const cadenaAleatoria = longitud => {
        const banco = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let aleatoria = "";
        for (let i = 0; i < longitud; i++) {
            aleatoria += banco.charAt(Math.floor(Math.random() * banco.length));
        }
        return aleatoria;
        
    };
    const chatcode = cadenaAleatoria(6);

    useEffect(() => {
        const collectionRef = collection(database, "users");
        const q = query(collectionRef, orderBy('email', 'desc'));
        const unsubscribe = onSnapshot(q, querySnapshot => {
            querySnapshot.docs.map(doc => {
              if (doc.data().email === user.email){
                setIdpass(doc.id)
              }
            })
          })
        return unsubscribe;
    },[])

    const CreateChat = () => {
        const documento = doc(database, chatcode, "datosChat")
        const datosChat = {
            "codeChat": chatcode,
            "nombreChat": "nombre del chat",
            "imagenChat": imagenPrincipal,
        }
        setDoc(documento, datosChat)
        const usrDoc = doc(database,`users/${idpass}/chats/${chatcode}`)
        setDoc(usrDoc,{'chat': chatcode})
        const usrChat = doc(database,`${chatcode}/datosChat/usrs/${user.uid}`)
        setDoc(usrChat,{'uid': user.uid})
        navigation.navigate("Chat",{chatcode: chatcode})
    }

    const SelectChat = () => {
        if(code === '' ){
            Alert.alert("Error", 'Ingresa un codigo')
        } else{
        const collectionRef = collection(database, code);
        const q = query(collectionRef, orderBy('codeChat', 'desc'));
        
        onSnapshot(q, querySnapshot => {
            if(querySnapshot.docs.length === 0){
                Alert.alert("Error","Ingresa codigo valido")
            }else{
                querySnapshot.docs.map(docs => {
                    if(docs.data().codeChat === code){
                        const usrDoc = doc(database,`users/${idpass}/chats/${code}`)
                        setDoc(usrDoc,{'chat': code})
                        navigation.navigate("Chat",{chatcode: code})
                    }
                  })
            }
          })
        }
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.form}>
            <KeyboardAvoidingView
                behavior= {(Platform.OS === 'ios')? "padding" : null}>
                <Text style={styles.title}>Crear nuevo Chat</Text>
                <TouchableOpacity style={styles.button} onPress={() => CreateChat()}>
                    <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>Crear</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Entrar a un Chat</Text>
                    <TextInput style={styles.input}
                        placeholder="Ingresa un codigo"
                        value={code}
                        onChangeText={(text) => setcode(text)}
                        />
                <TouchableOpacity style={styles.button} onPress={() => SelectChat()}>
                    <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>Entrar</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            </SafeAreaView>
      </View>
      
      
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 40,
    },
    input: {
        backgroundColor: "#F6F7FB",
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
    },
    title: {
        fontSize: 30,
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
})