import React, { useEffect }from 'react'
import { View, TouchableOpacity, Text, Image, StyleSheet, FlatList, SafeAreaView, StatusBar} from "react-native"
import Entyop from '@expo/vector-icons/Entypo'
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Chat',
      date: '28/04/2022',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Chat',
      date: '28/04/2022',
    },
    {
        id: '1',
        title: 'Contenid del chat',
        date: '28/04/2022',
    },
    {
        id: '2',
        title: 'Contenido de otro chat xd',
        date: '28/04/2022',
    }
]

const Separator = () => (
    <View style={styles.separator} />
  );

const Item = ({ datosChat }) => (
    <View style={styles.item}>
        <Image
            style={styles.imagen}
            source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
            width= {70}
            height={70}
        />
      <Text style={styles.title}>{datosChat.title}</Text>
      <Text style={styles.title}>{datosChat.date}</Text>
    </View>
  );

export default function Home({navigation}) {
    const onSignOut = () => {
        signOut(auth).catch(error => console.log(error));
    };
    const renderItem = ({ item }) => (
        <Item datosChat={item} />
      );
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity style={{ marginLeft: 10 }} onPress={onSignOut} >
                    <Entyop name="log-out" size={24} style={{color: '#006B76', marginRight: 10}}/>
                </TouchableOpacity>
            ),
            headerRight: () => (
                <TouchableOpacity onPress={() => navigation.navigate("Profile")} style={styles.perfilButton}>
                    <Entyop name="user" size={24} style={{color: '#006B76'}}/>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    return (
        <View style={styles.container}>
            {/* Flatlist */}
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}/>
                <Separator/>
            </SafeAreaView>

            <TouchableOpacity onPress={() => navigation.navigate("NewChat")} style={styles.chatButton}>
                <Entyop name="chat" size={24} style={{color: '#fff'}}/>
            </TouchableOpacity> 
        </View>    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        backgroundColor: "#fff",
        marginTop: StatusBar.currentHeight || 0,
        backgroundColor: '#FFFFFF',
    },
    chatButton: {
        backgroundColor: "#006B76",
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 20,
        marginBottom: 20,
        marginTop: 10,
        
    },
    perfilButton: {
        height: 50,
        width: 50,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#f8f6f6',
        paddingBottomg: 15,
        paddingTop: 15,
        paddingStart: 3,
        marginVertical: 1,
        marginHorizontal: 15,
        borderRadius: 7,
        paddingLeft: 5,
        flexWrap: 'wrap',
        // borderBottomColor: 'black',
        // borderBottomWidth: 1,
      },
      title: {
        color: '#1e272e',
        fontSize: 20,
        margin: 5,
        alignItems: 'center',
      },
      imagen: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 30,
        marginBottom: 10,
      },
      Separator: {
        marginVertical: 10,
        borderBottomColor: 'black',
        borderBottomWidth: StyleSheet.hairlineWidth,
      },
});