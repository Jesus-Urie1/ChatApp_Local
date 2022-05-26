import {Text, StyleSheet, Image} from "react-native";

export default function PerfilComp({
    imagen,
    codechat,
    nombrechat,
}){
    return(
        <>
            <Image source={{ uri: imagen}} style={styles.foto} />
            <Text style={styles.text}>{"Codigo:"}</Text>
            <Text style={styles.text}>{codechat}</Text>
            <Text style={styles.text}>{nombrechat}</Text>
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