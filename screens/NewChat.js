import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, TouchableOpacity, SafeAreaView, Alert, KeyboardAvoidingView} from 'react-native'

export default function NewChat({navigation}) {
    const [code, setcode] = useState("");

    const cadenaAleatoria = longitud => {
        const banco = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let aleatoria = "";
        for (let i = 0; i < longitud; i++) {
            aleatoria += banco.charAt(Math.floor(Math.random() * banco.length));
        }
        return aleatoria;
        
    };

    const SelectChat = () => {
        if(code === '' ){
            Alert.alert("Error", 'Ingresa un codigo')
        } else {
            navigation.navigate("Chat",{chatcode: code})
        }
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.form}>
            <KeyboardAvoidingView
                behavior= {(Platform.OS === 'ios')? "padding" : null}>
                <Text style={styles.title}>Crear nuevo Chat</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Chat",{chatcode: cadenaAleatoria(6)})}>
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