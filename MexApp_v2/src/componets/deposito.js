import React,{ useEffect, useState} from 'react';
import {
    View,
    Text,
   
}from 'react-native';
import Styles from '../styles'

function Empty (props){


  const[fecha,setfecha]=useState('')
  const[fechainit,setfechainit]=useState('')
  const[fechafin,setfechafin]=useState('')
  const [aplica,setaplica]=useState('')
  const [autoriza,setautoriza]=useState('')
  const [color,setcolor]=useState('#000000')
  const [status,setstatus]=useState('')



  useEffect(() => {

    var f=local(props.fecha)
    var f2=local(props.fecha_aplica)
    var f3=local(props.fecha_autoriza)
    setfecha(f) 
    setfechainit(f2) 
    setfechafin(f3) 
    try {
      var ap =nombre(props.aplica.nombre,props.aplica.apaterno,props.aplica.amaterno)
      setaplica(ap)
      console.log(aplica)
    } catch (error) {
    }
    try {
      var at =nombre(props.autoriza.nombre,props.autoriza.apaterno,props.autoriza.amaterno)
      setautoriza(at)
      console.log(aplica)
    } catch (error) {
    }
    var statuss=props.id_estatus
  

    switch (statuss){
      case 34:
          setstatus('PENDIENTE')
          setcolor('#FFDF00')
          break;
      case 35:
        setstatus('AUTORIZADO')
        setcolor('#006400')
          break;
      case 36:
          setstatus('DEPOSITADO')
          setcolor('#3AE1E1')
          break;
      case 37:
          setstatus('LIQUIDADO')
          setcolor('#A19DA8')
          break;
      case 38:
          setstatus('RECHAZADO')
          setcolor('#D23411')
          break;
          default:
            setstatus('sin status')

  }
  console.log(status)

  
 
   
   
}, [])

   const local=(fecha)=> {
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
   const nombre=(name,app,apm)=>{
     var nombre=name.trim()
     var apps=app.trim()
     var apms=apm.trim()
     var completo=nombre+' '+apps+' '+apms
    
     return  completo


   }


    return(
<View style={Styles.contencard}>
  <Text style={{color:color, textAlign:'right',marginTop:10}}>{status} </Text>
  <View style={Styles.horizontal}>
    <Text style={Styles.titletext}>Importe.</Text>
    <Text style={Styles.simpletext}>{props.importe} $</Text>
    <Text style={Styles.titletext}>Fecha:</Text>
    <Text style={Styles.simpletext}>{fecha}</Text>
  </View>
  <View style={Styles.horizontal}>
    <Text style={Styles.titletext}>Comentario</Text>
    <Text style={Styles.simpletext}>{props.comentario}</Text>
  </View>
  <View style={Styles.horizontal}>
    <Text style={Styles.titletext}>Autorizado</Text>
    <Text style={Styles.simpletext}>{fechainit}</Text>
  </View>
  <Text style={Styles.simpletextm}>{autoriza}</Text>
  <View style={Styles.horizontal}>
    <Text style={Styles.titletext}>Aplicado</Text>
    <Text style={Styles.simpletext}>{fechainit}</Text>
  </View>
  <Text style={[Styles.simpletextm,{marginBottom:10,}]}>{aplica}</Text>

</View>
    )

}

export default Empty