import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, TextInput, SafeAreaView, ImageBackground, TouchableOpacity, Alert, KeyboardAvoidingView } from "react-native";
import AuthContext from "../hooks/authContext";
const backImage = require("../assets/backImage.png");

export default function Signup({navigation}) {
    const imagenPrincipal = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Antu_insert-image.svg/1200px-Antu_insert-image.svg.png";
    const [nombre, setNombre] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {signup} = useContext(AuthContext);

    const Registro = () => {
        if(nombre === '' || telefono === '' || email === '' || password === ''){
            Alert.alert("Error", 'Ingresa todos los datos')
        }else {
            signup(
                navigation,
                nombre,
                telefono,
                email,
                password,
                imagenPrincipal
            )
        }
    }
    return (
        <View style={styles.container}>
            <ImageBackground source={backImage} style={styles.backImage}/>
            <View style={styles.whiteSheet} />
            
            <SafeAreaView style={styles.form}>
                <Text style={styles.title}>Registrate</Text>
                <KeyboardAvoidingView
                behavior= {(Platform.OS === 'ios')? "padding" : "height"}
                keyboardVerticalOffset={-50}>
                    <TextInput style={styles.input}
                        placeholder="Nombre(s)"
                        value={nombre}
                        maxLength={20}
                        onChangeText={(text) => setNombre(text)}
                        />
                    <TextInput style={styles.input}
                        placeholder="Numero de Telefono"
                        value={telefono}
                        keyboardType='numeric'
                        maxLength={10}
                        onChangeText={(text) => setTelefono(text)}
                        />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        autoCapitalize="none"
                        autoCorrect={false} 
                        secureTextEntry={true}
                        textContentType="password"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <TouchableOpacity style={styles.button} onPress={() => Registro()}>
                        <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>Registrate</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
                <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
                    <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>Ya tienes cuenta? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                        <Text style={{color: '#006B76', fontWeight: '600', fontSize: 14}}>Inicia Sesion</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: "#006B76",
        alignSelf: "center",
        paddingBottom: 24,
    },
    input: {
        backgroundColor: "#F6F7FB",
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
    },
    backImage: {
        width: "100%",
        height: 340,
        position: "absolute",
        top: 0,
        resizeMode: 'cover',
    },
    whiteSheet: {
        width: '100%',
        height: '90%',
        position: "absolute",
        bottom: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 60,
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 40,
    },
    button: {
        backgroundColor: '#006B76',
        height: 50,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
});