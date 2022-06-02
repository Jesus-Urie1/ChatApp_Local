import {Text, StyleSheet, Image} from "react-native";

export default function PerfilComp({
    imagen,
    codechat,
    nombrechat,
    usersChat
}){
    console.log(usersChat,"plss")
    return(
        <>
            <Image source={{ uri: imagen}} style={styles.foto} />
            <Text style={styles.text}>{"Codigo: "}{codechat}</Text>
            <Text style={styles.text}>{"Nombre del chat: "}</Text>
            <Text style={styles.text}>{nombrechat}</Text>
            <Text style={styles.text}>{usersChat.length}{" Participantes "}</Text>
            
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