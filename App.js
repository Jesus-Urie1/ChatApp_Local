import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chat from "./screens/Chat";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Home from "./screens/Home";
import NewChat from "./screens/NewChat";
import Profile from "./screens/Profile";
import PerfilEdit from "./screens/PerfilEdit";
import { auth } from "./config/firebase";
import {AuthContextProvider} from "./hooks/authContext";

export default function App() {
const Stack = createNativeStackNavigator();
const authentication = auth;
const user = authentication.currentUser;

const stackNavigatorProps = {
  initialRouteName: user ? "Home" : "Login",
  screenOptions: {
    headerShown: false,
  },
};
  return (
    <NavigationContainer>
      <AuthContextProvider>
        <Stack.Navigator {...stackNavigatorProps} screenOptions={{headerShown: true}}>
          
          <Stack.Screen name="Home" component={Home} options={{title:''}}/>
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="PerfilEdit" component={PerfilEdit} />
          <Stack.Screen name="NewChat" component={NewChat} options={{ title:''}} />
          <Stack.Screen name="Chat" component={Chat} options={{ title:''}}/>
          
          <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
          <Stack.Screen name="Signup" component={Signup} options={{headerShown:false}}/>

        </Stack.Navigator>
      </AuthContextProvider>
    </NavigationContainer>
  );
}
