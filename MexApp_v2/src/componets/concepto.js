import React from 'react';
import {
    View,
    Text,
    StyleSheet,
   
}from 'react-native';
import Styles from '../styles'

function Empty (props){


  const unixtolocal =(fecha)=> {
    try {
      if(fecha==null){
        return ''
      }else{
        var date = new Date(fecha);
      var year=date.getFullYear()
      var month=date.getMonth()+1
      var day=date.getDate()
      var hora=date.getHours()
      var minute=date.getMinutes()
      var f= day+'-'+month+'-'+year+' '+hora+':'+minute
    
      return f;

      }
     
    } catch (error) {
      return ''
      
    }

  }

    return(
<View style={Styles.contencard}>
  <View style={Styles.horizontal}>
    <Text style={Styles.titletext}>Importe:</Text>
    <Text style={Styles.simpletext}>{props.amount}</Text>
    <Text style={Styles.titletext}>Fecha:</Text>
    <Text style={Styles.simpletext}>{unixtolocal(props.liquidated_on)}</Text>
  </View>
  <View style={Styles.horizontal}>
    <Text style={Styles.titletext}>registro:</Text>
    <Text style={Styles.simpletext}>{props.id}</Text>
    <Text style={Styles.titletext}>Solicitud:</Text>
    <Text style={Styles.simpletext}>{props.shipment_id}</Text>
  </View>
  <View style={Styles.horizontal}>
    <Text style={Styles.titletext}>Tipo:</Text>
    <Text style={Styles.simpletext}>{props.type}</Text>
   
  </View>
  <View style={Styles.horizontal}>
    <Text style={Styles.titletext}>Subtipoipo:</Text>
    <Text style={Styles.simpletext}>{props.subtype}</Text>
   
  </View>
  <View style={Styles.horizontal}>
    <Text style={Styles.titletext}>Comentario:</Text>
    <Text style={Styles.simpletext}>{props.comment}</Text>
   
   
  </View>


</View>
    )

}

export default Empty