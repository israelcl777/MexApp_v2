/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Image,Alert,StyleSheet}from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import TravelDetails from './src/screens/travelDetails';
import LoginScreen from './src/screens/loginscreen';
import TopMenu from './src/componets/topmenu'
import Operador from './src/screens/operadorScreen';
import Unidad from './src/screens/unidadScreen';
import Contacs from './src/screens/contactScreen'
import Nom87 from './src/screens/nom87Screen';
import Nom87dDetail from './src/screens/nom87detail';
import OpenPdf from './src/componets/openPdf';
import ImageScreen from './src/screens/imageScreen';


/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const Stack = createNativeStackNavigator();

const App  =()=> {
  const[is_logged, setLogget]=useState(0)


  useEffect(() => {
     requestUserPermission()
    global.version = '1.0.0'//DeviceInfo.getVersion();
    checkToken();
   getData()
   
}, [])

async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    //console.log(' yes Authorization status:', authStatus);
  }else{
    //console.log(' no Authorization status:', authStatus);

  }
}

const getData = async () => {
  try {

    const jsonValue = await AsyncStorage.getItem('@user_storage')
    if(jsonValue != null){
     
      var convert=JSON.parse(jsonValue)
      global.id_operador=convert.id
      global.nombre = convert.nombre;
      global.alias= convert.unidad;
      //console.log(global.id_operador)
      messaging()
      .subscribeToTopic(convert.id+"")
      .then(() => console.log('Subscribed to topic!'));
      
      setLogget(1)


    }else{
      console.log("no hay usuario guardardo")
      setLogget(0)

    }
  } catch(e) {
   console.log(e)
  }
}
const checkToken = async () => {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
//console.log(fcmToken);
  } 
 }


 

  return (
    <NavigationContainer>
     <Stack.Navigator
     screenOptions={{
      headerStyle: {
        backgroundColor: '#ffffff',
      },
      }}>
          {is_logged == 0 ? (
 <>
    <Stack.Screen 
     name="Login"
     options={{
        unmountOnBlur: true,
        headerLeft: null,
        headerShown: false,
        gesturesEnabled: false,
       
        title: 'Iniciar sesion' }}>
     {props => <LoginScreen {...props} setLogget={setLogget}/>}
     </Stack.Screen>
       </>
       ) : (
         // User is signed in
         <>
        
          <Stack.Screen 
     name="menu"
     options={{
        unmountOnBlur: true,
        headerLeft: null,
        gesturesEnabled: false,
        headerLeft :() => (
          <Image
          style={style.logo}
          source={require('./src/drawables/logo.png')}/>
        ),
        title: '' }}>
     {props => <TopMenu {...props} setLogget={setLogget}/>}
     </Stack.Screen>

     <Stack.Screen 
      name="operador" 
      component={Operador}  
      options={{
        unmountOnBlur: true,
        headerRight :() => (
          <Image
          style={style.logo}
          source={require('./src/drawables/logo.png')}/>
        ),
        gesturesEnabled: false,  
        title:""}}/>

<Stack.Screen 
       options={{
        unmountOnBlur: true,
        headerRight :() => (
          <Image
          style={style.logo}
          source={require('./src/drawables/logo.png')}/>
        ),
        gesturesEnabled: false,  
        title:""}}
      name="unidad" 
      component={Unidad} />

       <Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/logo.png')}/>
          ),
          gesturesEnabled: false,  
          title:""}}
      name="contactos" 
      component={Contacs} />

       <Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/logo.png')}/>
          ),
          gesturesEnabled: false,  
          title:"Norma 87"}}
      name="nom87" 
      component={Nom87} />
         <Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/logo.png')}/>
          ),
          gesturesEnabled: false,  
          title:"Bitacora"}}
      name="nom87detail" 
      component={Nom87dDetail} />
       
       
       <Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/logo.png')}/>
          ),
          gesturesEnabled: false,  
          title:""}}
      name="travelsdetails" 
      component={TravelDetails} />


<Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/logo.png')}/>
          ),
          gesturesEnabled: false,  
          title:""}}
      name="pdf" 
      component={OpenPdf} />
      <Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/logo.png')}/>
          ),
          gesturesEnabled: false,  
          title:""}}
      name="imagescreen" 
      component={ImageScreen} />

        </>
    )}

    </Stack.Navigator>
  </NavigationContainer>

 


  );
};

const style=StyleSheet.create({
  logo:{
      width:95,
      height:45,
      resizeMode:'contain',
  },
  menuicon:{
      width:26,
      height:26,
      resizeMode:'contain',
  },
 
  menu:{
      width:10,
      height:26,
      flex:1,
      flexDirection:"row",
      justifyContent:'flex-end'
  }

})



export default App;
