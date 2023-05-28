import React, { useEffect, useState } from 'react';
import { View,Text,Button,StyleSheet,Image,Alert} from 'react-native';
import TMS from '../api/tms'
import Styles from '../styles/styles'
import storageData from '../utils/storageData';
import RNFetchBlob from 'rn-fetch-blob'

function Operador(){
  
    const [operator, setOperator] = useState([]);
    const [isload,setIsload]= useState(1)
    const [message,setMessage]=useState('Cargando información ...')



   
    useEffect(() => {
            getOperador(global.id_operador)  
    },[])
    const getOperador=async(id_operador)=>{
        try{

            const operador=await TMS.getOperador( id_operador)
            setOperator(operador)           
            setIsload(0)
            var convert=operador
            convert.image=''    
            const save = await storageData.insertData('@info_operador',operador)
      
        }catch(ex){
            console.log(ex)
            const save = await storageData.consultData('@info_operador')
            if(save != null){
             var convert=JSON.parse(save)
             setOperator(convert)   
            }else{
                Alert.alert(ex)
                setMessage('no hay información')
            }

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
    if(isload==1){
        return(
            <View style={{flex:1,justifyContent: "center",alignItems: "center"}}> 
                <Text style={Styles.simpletext}>{message}</Text>

            </View>
        )

    }
    else{
        return(

            <View>
                <View style={style.centerimage}>
                <Image  source={{uri: `data:image/jpeg;base64,${operator.image}`}}  style={style.logo}/> 
    
                </View>
                    
               <View style={style.horizontal}>
                   <Text style={style.textbutton}>Nombre: </Text>
                   <Text style={Styles.simpletext}>{operator.name}</Text>
    
               </View>
               <View style={style.horizontal}>
                   <Text style={style.textbutton}>Tipo: </Text>
                   <Text style={Styles.simpletext}>{operator.type}</Text>
    
               </View>
               <View style={style.horizontal}>
                   <Text style={style.textbutton}>Fecha de nacimiento: </Text>
                   <Text style={Styles.simpletext}>{convert( operator.fecha_nacimiento)}</Text>
    
               </View>
               <View style={style.horizontal}>
                   <Text style={style.textbutton} >Fecha de Ingreso: </Text>
                   <Text style={Styles.simpletext}>{convert(operator.fecha_ingreso)}</Text>
    
               </View>
               <View style={style.horizontal}>
                   <Text style={style.textbutton}>Unidad: </Text>
                   <Text style={Styles.simpletext}>{operator.vehicle_own}</Text>
    
               </View>
               <View style={style.horizontal}>
                   <Text style={style.textbutton}>RFC: </Text>
                   <Text style={Styles.simpletext}>{operator.key}</Text>
            
    
               </View>
               <View style={style.horizontal}>
                   <Text style={style.textbutton}>R control: </Text>
                   <Text style={Styles.simpletext}>{operator.rcontrol_link}</Text>
              </View>
               <View style={style.horizontal}>
                   <Text style={style.textbutton}>NO IMSS: </Text>
                   <Text style={Styles.simpletext}>{operator.n_imss}</Text>
    
               </View>
           
               <View style={style.horizontal}>
                   <Text style={style.textbutton}>NO LIncencia: </Text>
                   <Text style={Styles.simpletext}>{operator.license}</Text>
    
               </View>
               <View style={style.horizontal}>
                   <Text style={style.textbutton}>Fecha de Expedicion (lic.): </Text>
                   <Text style={Styles.simpletext}>{convert(operator.license_seniority)}</Text>
    
               </View>
               <View style={style.horizontal}>
                   <Text style={style.textbutton}>Fecha de Vencimiento (lic.): </Text>
                   <Text style={Styles.simpletext}>{convert(operator.license_expiration)}</Text>
    
               </View>
            
    
            </View>
    
        )

    }

    



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