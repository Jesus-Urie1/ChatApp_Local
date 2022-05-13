import React, { useEffect, useState, useContext } from 'react'
import { database } from '../config/firebase'
import { collection, onSnapshot, orderBy, query } from '@firebase/firestore'
import PerfilComp from '../components/PerfilComp'
import AuthenticatedUserContext from "../components/context";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Profile({navigation}) {
    const {user} = useContext(AuthenticatedUserContext);
    const [products, setProducts] = useState([]);
    const [idpass, setIdpass] = useState("");
    useEffect(() => {
        const collectionRef = collection(database, "users");
        const q = query(collectionRef, orderBy('email', 'desc'));

        const unsubscribe = onSnapshot(q, querySnapshot => {
          setProducts(
            querySnapshot.docs.map(doc => {
              if (doc.data().email === user.email)
              return {
                id: doc.id,
                imagen: doc.data().imagen,
                nombre: doc.data().nombre,
                email: doc.data().email,
                telefono: doc.data().telefono
            }
            setIdpass(doc.id)
            } 
            )
          )})
        return unsubscribe;
    },[])
    console.log(idpass)
    return (
      <>
        {products.map(product => {
          if(product !== undefined)
          return <PerfilComp key={product.id} {...product}/>
        })}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("PerfilEdit",{chatcode: idpass})}>
          <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}>Editar</Text>
        </TouchableOpacity>
      </>
    )
}
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#006B76',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100,
},
})