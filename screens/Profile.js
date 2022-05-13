import React, { useEffect, useState } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { database } from '../config/firebase'
import { collection, onSnapshot, orderBy, query } from '@firebase/firestore'
import PerfilComp from '../components/PerfilComp'

export default function Profile() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const collectionRef = collection(database, "users");
        const q = query(collectionRef, orderBy('email', 'desc'));

        const unsubscribe = onSnapshot(q, querySnapshot => {
          setProducts(
            querySnapshot.docs.map(doc => ({
                id: doc.id,
                nombre: doc.data().nombre,
                email: doc.data().email,
                telefono: doc.data().telefono
            })
            )
          )})
        return unsubscribe;
    },[])
    return (
      <>
        <Text>Perfil</Text>
        {products.map(products => <PerfilComp key={products.id} {...products}/>)}
      </>
    )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  }
})