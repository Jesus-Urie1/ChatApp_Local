import React,{ createContext} from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword,updateProfile} from 'firebase/auth';
import { auth, database } from "../config/firebase";
import { collection,addDoc,onSnapshot,doc,setDoc } from "@firebase/firestore";

const AuthContext = createContext();
const authU = auth;

const userTemplate = (nombre, email, password,telefono, imagen) => {
    return {
      nombre,
      email,
      password,
      telefono,
      imagen,
      providerRegistered: 'false', //no se pa que nos puedan servir
      recruiterRegistered: 'false',
    };
  };

const handlefirestoredUser = async(navigation, user) =>{
    navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });

      await setDoc(doc(database,"users",user.email),user)
      //metemos el user a la coleccion 
      //await addDoc(collection(database,"users"), user)
      .then(()=>{
        console.log("user ha sido ingresado a la bdd");
        console.log(user.nombre);
        updateProfile(auth.currentUser, {
            displayName: user.nombre,
          })
          .then(()=>{
              console.log("nombre guardado");
              console.log(auth.currentUser);
              
          })
          .catch((e)=> console.log("error: ",e));
      })
      .catch((e)=> console.log("error al meter el user a la bdd: ",e));
}

const signup = (navigation,nombre, telefono,email, pass, imagen)=> {
    const user = userTemplate(nombre,email,pass,telefono,imagen);
    try{
        createUserWithEmailAndPassword(authU,email,pass)
        .then(()=>handlefirestoredUser(navigation,user))
        .catch(error => {
            console.log("Error al crear la sesion: ",error);
        })
    }catch(e){
        console.log(e);
    }
}

const login = (navigation,email, password) => {
    signInWithEmailAndPassword(auth,email,password)
    .then((resp) => {
        console.log("login success: ", resp.user);
        navigation.reset({
            index: 0,
            routes: [{name: 'Home'}],
          });
    })
    .catch((e) => console.log("Error: ",e));

}

export const AuthContextProvider = ({children}) =>{
    return(
        <AuthContext.Provider value={{
            signup,
            login
        }}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthContext;

