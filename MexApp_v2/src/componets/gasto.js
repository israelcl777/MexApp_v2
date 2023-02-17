import React,{ useEffect, useState} from 'react';
import {
    View,
    Text,
   
}from 'react-native';
import Styles from '../styles'

function Gasto (props){


  const[fecha,setfecha]=useState('')
  const[fechainit,setfechainit]=useState('')
  const[fechafin,setfechafin]=useState('')
 
  const [color,setcolor]=useState('#000000')
  const [status,setstatus]=useState('')



  useEffect(() => {

    var f=local(props.requested_on)
    var f2=local(props.required_on)
    var f3=local(props.requested_on)
    setfecha(f) 
    setfechainit(f2) 
    setfechafin(f3) 
    var statuss=props.status_id
  

    switch (statuss){
      case 1:
          setstatus('SOLICITADO')
          setcolor('#FFDF00')
          break;
      case 2:
        setstatus('AUTORIZADO')
        setcolor('#006400')
          break;
      case 3:
          setstatus('DEPOSITADO')
          setcolor('#3AE1E1')
          break;
      case 4:
          setstatus('LIQUIDADO')
          setcolor('#A19DA8')
          break;
      case 5:
          setstatus('RECHAZADO')
          setcolor('#D23411')
          break;
          default:
            setstatus('sin status')

  }
  console.log(status)
  
   
}, [])

   const local=(fecha)=> {
    if (fecha==null){
      return ''

    }else{
      try {
        var date= new Date(fecha)
        var year=date.getFullYear()
        var month=date.getMonth()+1
        var day=date.getDate()
        var  hora=date.getHours()
        var minute=date.getMinutes()
        var f= day+'-'+month+'-'+year+' '+hora+':'+minute
 
        return f
     
        
      } catch (error) {
        console.log(error)
        return ''
        
      }

    }

   }
   const nombre=(name,app,apm)=>{
     var nombre=name.trim()
     var apps=app.trim()
     var apms=apm.trim()
     var completo=nombre+' '+apps+' '+apms
    
     return  completo


   }


    return(
<View style={Styles.contencard}>
  <Text style={{color:color, textAlign:'right',marginTop:10}}>{props.status} </Text>
  <View style={Styles.horizontal}>
  <Text style={Styles.titletext}>NO Gasto:</Text>
    <Text style={Styles.simpletext}>{props.id}</Text>
    <Text style={Styles.titletext}>Importe.</Text>
    <Text style={Styles.simpletext}>{props.amount} $</Text>
   
  </View>

  <View style={Styles.horizontal}>
    <Text style={Styles.titletext}>Solicitado el: </Text>
    <Text style={Styles.simpletext}>{fechainit}</Text>
  </View>

  <View style={Styles.horizontal}>
    <Text style={Styles.titletext}>Aplicado el: </Text>
    <Text style={Styles.simpletext}>{fechafin}</Text>
  </View>
  <View style={Styles.horizontal}>
    <Text style={Styles.titletext}>Departament: </Text>
    <Text style={Styles.simpletext}>{props.responsible_department}</Text>
  </View>
  <View style={Styles.horizontal}>
    <Text style={Styles.titletext}>Comentario</Text>
    <Text style={Styles.simpletext}>{props.comment}</Text>
  </View>
  <View style={Styles.horizontal}>
    <Text style={Styles.titletext}>Solicitud</Text>
    <Text style={Styles.simpletext}>{props.shipment_id}</Text>
    <Text style={Styles.titletext}>Tipo</Text>
    <Text style={Styles.simpletext}>{props.type}</Text>
  </View>
  

</View>
    )

}

export default Gasto