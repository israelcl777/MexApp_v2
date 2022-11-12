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
      var con=   fecha.replace('/Date(','').replace(')/','')
      var timestamp = parseInt(con) //1607110465663
      var date = new Date(timestamp);
      var year=date.getFullYear()
      var month=date.getMonth()+1
      var day=date.getDate()
      var hora=date.getHours()
      var minute=date.getMinutes()
      var f= day+'-'+month+'-'+year+' '+hora+':'+minute
    
      return f;
      
    } catch (error) {
      return ''
      
    }
  }

    return(
<View style={Styles.contencard}>
  <View style={Styles.horizontal}>
    <Text style={Styles.titletext}>Importe:</Text>
    <Text style={Styles.simpletext}>{props.importe}</Text>
    <Text style={Styles.titletext}>Fecha:</Text>
    <Text style={Styles.simpletext}>{unixtolocal(props.fecha)}</Text>
  </View>
  <View style={Styles.horizontal}>
    <Text style={Styles.titletext}>registro:</Text>
    <Text style={Styles.simpletext}>{props.id_registro}</Text>
    <Text style={Styles.titletext}>Solicitud:</Text>
    <Text style={Styles.simpletext}>{props.Solicitud}</Text>
  </View>
  <View style={Styles.horizontal}>
    <Text style={Styles.titletext}>Tipo:</Text>
    <Text style={Styles.simpletext}>{props.Tipo}</Text>
   
  </View>
  <View style={Styles.horizontal}>
    <Text style={Styles.titletext}>Subtipoipo:</Text>
    <Text style={Styles.simpletext}>{props.SubTipo}</Text>
   
  </View>
  <View style={Styles.horizontal}>
    <Text style={Styles.titletext}>Comentario:</Text>
    <Text style={Styles.simpletext}>{props.comentario}</Text>
   
  </View>


</View>
    )

}

export default Empty