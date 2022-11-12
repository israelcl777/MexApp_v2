import React,{ useEffect, useState} from 'react';
import {
    View,
    Text,
    Pressable
}from 'react-native';
import Styles from '../styles'
import { useNavigation } from '@react-navigation/native';


function Liquidacion (props){
  const navigation = useNavigation();
  const[fecha,setfecha]=useState('')
  const[fechainit,setfechainit]=useState('')
  const[fechafin,setfechafin]=useState('')

  useEffect(() => {

    var f=unixtolocal(props.fecha)
    var f2=unixtolocal(props.fechaInicio)
    var f3=unixtolocal(props.fechaiFin)
    
    setfecha(f) 
    setfechainit(f2) 
    setfechafin(f3) 
 
   
   
}, [])


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
  const opendetail=()=>{
    navigation.navigate('liqdetail',{ items:props})
 }


    return(
<Pressable style={Styles.contencard} onPress={opendetail}>
  <View style={Styles.horizontal}>
    <Text style={Styles.titletext}>NO liquidación.</Text>
    <Text style={Styles.simpletext}>{props.id_liquidacion}</Text>
    <Text style={Styles.titletext}>Importe.</Text>
    <Text style={Styles.simpletext}>{props.importe} $</Text>
    
  </View>
  <View style={Styles.horizontal}>
  <Text style={Styles.titletext}>Fecha:</Text>
  <Text style={Styles.simpletext}>{fecha}</Text>
  </View>
  <View style={Styles.horizontal}>
  <Text style={Styles.titletext}>No Preliq.</Text>
    <Text style={Styles.simpletext}>{props.folio_pre}</Text>
    <Text style={Styles.titletext}>Unidad</Text>
    <Text style={Styles.simpletext}>{props.Unidad}</Text>
  </View>
  <View style={Styles.horizontal}>
    
    <Text style={Styles.titletext}>Del </Text>
    <Text style={Styles.simpletext}>{fechainit}</Text>
    <Text style={Styles.titletext}>Al:</Text>
    <Text style={Styles.simpletext}>{fechafin}</Text>
  </View>


</Pressable>
    )

}

export default Liquidacion