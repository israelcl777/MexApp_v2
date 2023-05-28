import React,{ useEffect, useState} from 'react';
import {
    View,
    Text,
    Image, 
    Pressable, Alert
}from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Styles from '../styles/styles'


function Fuel (props){
  const navigation = useNavigation();



  const utctolocal =(fecha)=> {
    try {
      var dt = new Date(fecha);
  
    
      return dt.toLocaleString();
      
    } catch (error) {
      return ''
      
    }
  }
  function confirmar(){

    if(props.vendor_type==3&&props.status){
      navigation.navigate('cameradiesel',{ id:props.assigmentnumber})


    }
   

  }
  
  
  
  const getprovedorname=(type)=>{
    switch(type){
      
      case -1:
        return ' ';
      break;
      case 1:
   
        return 'autoabasto';
        break;
      case 2:
        return 'integrado';
        break;
      case 3:
        return 'externo';
        break;
      case 4:
        return 'Confiable';
        break;
      default :
        return ' '
      
    }

    
  }
  const getcolor=(type)=>{
    switch(type){
      
      case -1:
        return ' ';
      break;
      case 1:
   
        return '#ffa111';
        break;
      case 2:
        return '#006400';
        break;
      case 3:
        return '#ffdf00';
        break;
      case 4:
        return '#d72000';
        break;
      default :
        return ' '
      
    }
  }
  const geticon=()=>{

  }

    return(
      <Pressable style={{ borderWidth: 3,
        borderColor:getcolor(props.status),margin:5
      }}
      onPress={confirmar}>
        <View style={Styles.contencard}>
  <View style={Styles.horizontal}>
    <Text style={Styles.titletext}>NO:</Text>
    <Text style={Styles.simpletext}>{props.assigmentnumber}</Text>
    <View style={{justifyContent: 'flex-end',
    alignItems: 'flex-end',flex:1}}> 
    <Image source={require('../drawables/logo.png')} style={{width: 50, height:30,resizeMode:'contain'}}/>
    </View>
  </View>
  <View style={Styles.horizontal}>
    <Text style={[Styles.titletext,{width:'50%'}]}>Proveedor {getprovedorname(props.vendor_type)}</Text>
    <Text style={[Styles.simpletext,{width:'48%'}]}>{props.vendor}</Text>
  </View>
  <View style={Styles.horizontal}>
    <Text style={Styles.titletext}>Unidad :</Text>
    <Text style={Styles.simpletext}>{props.vehicle}</Text>
  </View>
  <View style={Styles.horizontal}>
    <Text style={Styles.titletext}>Autorizados:</Text>
    <Text style={Styles.simpletext}>{props.dieselassignated} lts.</Text>
    <Text style={Styles.simpletext}>( {utctolocal(props.time)} )</Text>
  </View>
  <View style={Styles.horizontal}>
    <Text style={Styles.titletext}>Confirmados:</Text>
    <Text style={Styles.simpletext}>{props.dieselassignated} lts.</Text>
    <Text style={Styles.simpletext}>( {utctolocal(props.confirmation_date)} )</Text>
  </View>

</View>

      </Pressable>

    )

}

export default Fuel