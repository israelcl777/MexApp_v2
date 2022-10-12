import { useRoute } from '@react-navigation/core';
import React,{ useEffect, useState} from 'react';
import { View,Text,Button,StyleSheet } from 'react-native';
import EventList from '../containers/eventlist';


function Nom78Detail (props){
  const [items, setItems] = useState([])
  console.log(props.route.params.listDreams)
  useEffect(() => {
    setItems(props.route.params.listDreams)

   
  },[])

    return(
      <View style={{width:'100%',height:'100%'}}>
        <View style={style.encabezado}>
        <Text style={{width:'18%',margin:5,color:'#fff'}}>Estatus</Text>
         
         <Text style={{width:'40%',margin:5,color:'#fff'}}>Fecha inicio</Text>
     
         <Text style={{width:'40%', margin:5,color:'#fff'}}>Fecha fin</Text>

        </View>
         <EventList events={items} />

      </View>
        
           
      
 

    )
 


};

const style=StyleSheet.create({
  encabezado:{
    flexDirection:'row',
    backgroundColor:'#CBA052',

    color: '#ffffff',

},



})
export default Nom78Detail;