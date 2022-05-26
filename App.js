import React, { useState, useContext, useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { onAuthStateChanged } from "firebase/auth";

import Chat from "./screens/Chat";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import NewChat from "./screens/NewChat";
import Profile from "./screens/Profile";
import PerfilEdit from "./screens/PerfilEdit";
import ChatPerfil from "./screens/ChatPerfil";
import ChatPerfilEdit from "./screens/ChatPerfilEdit";
import { auth } from "./config/firebase";
import AuthenticatedUserContext from "./components/context";

const Stack = createStackNavigator();

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return ( 
    <AuthenticatedUserContext.Provider value={{user, setUser}}>
      {children}
    </AuthenticatedUserContext.Provider>
  )
}

function ChatStack () {
  return (
    <Stack.Navigator defaultScreenOptions={Home}>
      <Stack.Screen name="Home" component={Home} options={{ title:''}}/>
      <Stack.Screen name="Profile" component={Profile} options={{ title:'Perfil'}}/>
      <Stack.Screen name="PerfilEdit" component={PerfilEdit} options={{ title:'Editar Perfil'}}/>
      <Stack.Screen name="NewChat" component={NewChat} options={{ title:''}}/>
      <Stack.Screen name="Chat" component={Chat}/>
      <Stack.Screen name="ChatPerfil" component={ChatPerfil} options={{ title:'Perfil Chat'}}/>
      <Stack.Screen name="ChatPerfilEdit" component={ChatPerfilEdit} options={{ title:'Editar Chat'}}/>
    </Stack.Navigator>
  )
}

function AuthStack () {
  return (
   <Stack.Navigator defaultScreenOptions={Login} screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Signup" component={Signup}/>
   </Stack.Navigator>
  )
}

function RootNavigator () {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,
      async authenticatedUser => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, [user]);
  if(loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large"/>
      </View>
    )
  }
  return(
    <NavigationContainer>
      { user ? <ChatStack /> : <AuthStack/> }
    </NavigationContainer>
  )
}

export default function App() {
  
  return (
    <AuthenticatedUserProvider>
      <RootNavigator/>
    </AuthenticatedUserProvider>
  )
}