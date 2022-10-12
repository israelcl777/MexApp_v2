import React from 'react';
import { Image,Text,Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Reducers from '../reducers';
import HomeScreen from '../screens/homescreen'
import Detailscreen from '../screens/detailscreen';
import Cerrar from './cerrar'
import TravelsTabs from './travels_tabs';


const Drawer = createDrawerNavigator();


function Drawermenu (props){

  const Salir=()=>{

    return(
     
      <Cerrar
      context={props}
      tex=''/>
    )
  
  }
    
   
    return(
      
      <Provider store={createStore(Reducers)}>
      <Drawer.Navigator 
      initialRouteName="Home"
      screenOptions={{
        drawerStyle: {
          backgroundColor: '#eaeaead9',
          width: 240,
        },
        drawerInactiveTintColor:'#000000',
        drawerActiveTintColor:'#BB9A56',
        headerTintColor:'#BB9A56',
        
     
        
      }} 
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Viajes" component={TravelsTabs} />
        <Drawer.Screen name="salir" component={Salir}/>
      </Drawer.Navigator>
      </Provider>
  

    )

};
export default Drawermenu;