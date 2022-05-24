import {Text, StyleSheet, Image} from "react-native";

export default function PerfilComp({
    imagen,
    email,
    nombre,
    telefono,
}){
    return(
        <>
            <Image source={{ uri: imagen}} style={styles.foto} />
            <Text style={styles.text}>{email}</Text>
            <Text style={styles.text}>{nombre}</Text>
            <Text style={styles.text}>{telefono}</Text> 
      </>
    )
}
const styles = StyleSheet.create({
    foto: {
        height: 250,
        width: 250,
        borderRadius: 50,
        marginBottom: 30,
        marginTop: 20,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: "center",
        paddingBottom: 15,
    }
  })