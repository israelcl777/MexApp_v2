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
import {Image,Text,StyleSheet, useAnimatedValue}from 'react-native'
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
import LiquidacionesScreen from './src/screens/liquidacionesScreen'
import DepositosScreen from './src/screens/depositosScreen';
import GatosScreen from './src/screens/gastoScreen'
import Liqdetail from './src/screens/liquidetailScreen'
import CameraScreen from './src/screens/cameraScreen'
import CameraDiesel from './src/screens/cameradieselScreen'
import CameraGasto from './src/screens/cameraGasto'
import EvidenciasScreen from './src/screens/evidenciasScreen'
import ObsScreen from './src/screens/obsScreen'
import PdfWeb from './src/componets/pdfweb'
import Instrucction from './src/screens/InstructionScreen';
import FuelScreen from './src/screens/fuelScreen'
import Cartaporte from './src/screens/cartaporteScreen'
import Api from'./src/api/tms'
import storageData from './src/utils/storageData';



/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const Stack = createNativeStackNavigator();

const App  =()=> {
  const[is_logged, setLogget]=useState(0)
  const[is_conected,setConected]=useState(require('./src/drawables/online.png'))


  useEffect(() => {
     requestUserPermission()
    global.version = '1.0.0'//DeviceInfo.getVersion();
    checkToken();
   getData()
   getevidence()
   
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
const getevidence= async () => {
  const evidence= await storageData.consultData('@evidenciagasto')
  if(evidence!= null){

    console.log('evidence')
    var convert=JSON.parse(evidence)
    var id=convert.id
    console.log('id:'+id)
    var coment=convert.comment
    const data = {uri:convert.url, type:"image/jpeg", name:'profile.jpg', filename:'afiletest'};
    const formData = new FormData()
    formData.append('file', data)
    try {
      const setevidence = await Api.setevidencegasto(formData,id)
      console.log(setevidence)
      const setcoment = await Api.setObsgasto(coment,id)
      console.log(setcoment)
      const delete_= await storageData.deleteData('@evidenciagasto')
      
    } catch (error) {
      
    }

  }

}
const getData = async () => {
  try {
    const user=await storageData.consultData('@user_storage')
    if(user!= null)
    var convert=JSON.parse(user)
    global.id_operador=convert.id
    global.nombre = convert.nombre;
    global.alias= convert.unidad;
    console.log(global.id_operador)
    messaging()
    .subscribeToTopic(convert.id+"")
    .then(() => console.log('Subscribed to topic!'));  
    setLogget(1)
  } catch (error) {
    console.log("no hay usuario guardardo")
      setLogget(0)
    
  }


}
const checkToken = async () => {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
  console.log(fcmToken);
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
          source={require('./src/drawables/mexapp.png')}/>
        ),
        headerRight :() => (
          <Image
          style={style.logo2}
          source={is_conected}/>
        ),
        title: '' }}>
     {props => <TopMenu {...props} setLogget={setLogget} setConected={setConected}/>}
     </Stack.Screen>

     <Stack.Screen 
      name="operador" 
      component={Operador}  
      options={{
        unmountOnBlur: true,
        headerRight :() => (
          <Image
          style={style.logo}
          source={require('./src/drawables/mexapp.png')}/>
        ),
        gesturesEnabled: false,  
        title:"Datos"}}/>

<Stack.Screen 
       options={{
        unmountOnBlur: true,
        headerRight :() => (
          <Image
          style={style.logo}
          source={require('./src/drawables/mexapp.png')}/>
        ),
        gesturesEnabled: false,  
        title:global.alias}}
      name="unidad" 
      component={Unidad} />

       <Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/mexapp.png')}/>
          ),
          gesturesEnabled: false,  
          title:"Contactos"}}
      name="contactos" 
      component={Contacs} />

       <Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/mexapp.png')}/>
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
            source={require('./src/drawables/mexapp.png')}/>
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
            source={require('./src/drawables/mexapp.png')}/>
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
            source={require('./src/drawables/mexapp.png')}/>
          ),
          gesturesEnabled: false,  
          title:""}}
      name="imagescreen" 
      component={ImageScreen} />

       <Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/mexapp.png')}/>
          ),
          gesturesEnabled: false,  
          title:"Liquidaciones"}}
      name="liquidaciones" 
      component={LiquidacionesScreen} />

<Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/mexapp.png')}/>
          ),
          gesturesEnabled: false,  
          title:"Detalle"}}
      name='liqdetail'
      component={Liqdetail} />

        <Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/mexapp.png')}/>
          ),
          gesturesEnabled: false,  
          title:"Depositos"}}
      name='depositos'
      component={DepositosScreen} />

      
<Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/mexapp.png')}/>
          ),
          gesturesEnabled: false,  
          title:"Gastos"}}
      name='gastos'
      component={GatosScreen} />

       <Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/mexapp.png')}/>
          ),
          gesturesEnabled: false,  
          title:""}}
      name='camera'
      component={CameraScreen} />

<Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/mexapp.png')}/>
          ),
          gesturesEnabled: false,  
          title:""}}
      name='cameragasto'
      component={CameraGasto} />


      <Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/mexapp.png')}/>
          ),
          gesturesEnabled: false,  
          title:""}}
      name='cameradiesel'
      component={CameraDiesel} />
      

<Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/logo.png')}/>
          ),
          gesturesEnabled: false,  
          title:"Evidencias"}}
      name='evidencias'
      component={EvidenciasScreen} />

<Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/logo.png')}/>
          ),
          gesturesEnabled: false,  
          title:"Observaciones"}}
      name='observaciones'
      component={ObsScreen} />

<Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerShown: false,

          gesturesEnabled: false,  
          title:""}}
      name='pdfweb'
      component={PdfWeb} />

<Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerShown: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/logo.png')}/>
          ),
          gesturesEnabled: false,  
          title:"Instrucciones"}}
      name='instrucciones'
      component={Instrucction} />
      <Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerShown: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/logo.png')}/>
          ),
          gesturesEnabled: false,  
          title:"Asig. de Combustible"}}
      name='fuels'
      component={FuelScreen} />
          <Stack.Screen 
        options={{
          unmountOnBlur: true,
          headerShown: true,
          headerRight :() => (
            <Image
            style={style.logo}
            source={require('./src/drawables/logo.png')}/>
          ),
          gesturesEnabled: false,  
          title:"Carta porte"}}
      name='cartaporte'
      component={Cartaporte} />
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
  logo2:{
    width:35,
    height:35,
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
