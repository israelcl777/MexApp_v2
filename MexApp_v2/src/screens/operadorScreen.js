import React, { useEffect, useState } from 'react';
import { View,Text,Button,StyleSheet,Image,Pressable} from 'react-native';
import TMS from '../api/tms'
import { set } from 'react-native-reanimated';

function Operador(){
    const [items, setItems] = useState([]);
    const [operator, setOperator] = useState([]);


    useEffect(() => {
        getOperador(global.id_operador)

       
    }, [])
  
    const getOperador=async(id_operador)=>{
        try{

            const operador=await TMS.getOperador( id_operador)

            setOperator(operador)
            var imagenp=''+operador.image;
            console.log(imagenp)




        }catch(ex){
            console.log(ex)

        }


    }
    const convert=(day)=>{
        try{
            let arr = day.split('T');
     
    return arr[0]


        }catch(ex){
            return day

        }
           
    }

    return(

        <View>
            <View style={style.centerimage}>
            <Image  source={{uri: `data:image/jpeg;base64,${operator.image}`}}  style={style.logo}/> 

            </View>
                
           <View style={style.horizontal}>
               <Text style={style.textbutton}>Nombre: </Text>
               <Text>{operator.name}</Text>

           </View>
           <View style={style.horizontal}>
               <Text style={style.textbutton}>Tipo: </Text>
               <Text style={style.text}>{operator.type}</Text>

           </View>
           <View style={style.horizontal}>
               <Text style={style.textbutton}>Fecha de nacimiento: </Text>
               <Text style={style.text}>{convert( operator.fecha_nacimiento)}</Text>

           </View>
           <View style={style.horizontal}>
               <Text style={style.textbutton} >Fecha de Ingreso: </Text>
               <Text style={style.text}>{convert(operator.fecha_ingreso)}</Text>

           </View>
           <View style={style.horizontal}>
               <Text style={style.textbutton}>Unidad: </Text>
               <Text style={style.text}>{operator.vehicle_own}</Text>

           </View>
           <View style={style.horizontal}>
               <Text style={style.textbutton}>RFC: </Text>
               <Text style={style.text}>{operator.key}</Text>
        

           </View>
           <View style={style.horizontal}>
               <Text style={style.textbutton}>R control: </Text>
               <Text style={style.text}>{operator.rcontrol_link}</Text>
          </View>
           <View style={style.horizontal}>
               <Text style={style.textbutton}>NO IMSS: </Text>
               <Text style={style.text}>{operator.n_imss}</Text>

           </View>
       
           <View style={style.horizontal}>
               <Text style={style.textbutton}>NO LIncencia: </Text>
               <Text style={style.text}>{operator.license}</Text>

           </View>
           <View style={style.horizontal}>
               <Text style={style.textbutton}>Fecha de Expedicion (licencia): </Text>
               <Text style={style.text}>{convert(operator.license_seniority)}</Text>

           </View>
           <View style={style.horizontal}>
               <Text style={style.textbutton}>Fecha de Vencimiento (licencia): </Text>
               <Text style={style.text}>{convert(operator.license_expiration)}</Text>

           </View>
        

        </View>

    )



}
const style=StyleSheet.create({
    logo:{
        width:95,
        height:95,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode:'contain',
    },
    centerimage:{
        justifyContent: 'center',
    alignItems: 'center',

    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
      
    
      },
      name:{
          marginLeft:10,

      },
      menutext:{
          marginLeft:10,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop:10,

      },
      textbutton:{
        fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: '#000000',

    },
    menuicon:{
        width:40,
        height:40,
        margin: 5,
        resizeMode:'contain',
    },
   text:{
       
    fontSize: 14,
    lineHeight: 21,
    letterSpacing: 0.25,

   },
  
    horizontal:{
      
        backgroundColor:'#ffffffcc',
        flexDirection:'row',
        paddingVertical: 10,
        paddingHorizontal: 39,
        borderRadius: 4,
        elevation: 3,
     

    },
    menuitems:{
       
        backgroundColor:'#ffffffcc',
        flexDirection:'row',
        margin:5,
    },
    vertical:{
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,

    }
  
  })

export default Operador