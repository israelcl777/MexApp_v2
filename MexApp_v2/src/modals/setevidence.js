import React, { useState,useEffect } from 'react';
import { View,Text,StyleSheet, Pressable ,Image, TextInput} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNFetchBlob from 'rn-fetch-blob';
import { SelectList } from 'react-native-dropdown-select-list'
import Geolocation from 'react-native-geolocation-service';
import Api from '../api/intranet';
import AsyncStorage from '@react-native-async-storage/async-storage';


function SetDreams (props){
    const context=props
    const [isload,setLoad]= useState(false);
    const [string64,setString64]= useState('')
    const [selected, setSelected] = useState("");
    const [milatitusd,setMilatitud]=useState(0.0)
    const [milongitud,setMilongitud]=useState(0.0)
    const [data,setData]=useState([])
    const [comentario,setcomentario]= useState('')

  

    useEffect(() => {
        //
        getTypes()
        geolocation()
        base64(props.url)
     
       
    }, [])
    const send=()=>{
        context.setModalVisible1(false)
        props.navigation.goBack()
     }
    const base64=(filePath)=>{
        RNFetchBlob.fs
  .readFile(filePath, 'base64')
  .then((data) => {
    setString64(data)

  })
  .catch((err) => {});

    }
    const geolocation=()=>{
        //console.log("actualizando localozacion")
            Geolocation.getCurrentPosition(
                (position) => {
                  var Region ={
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    latitudeDelta: 2,
                    longitudeDelta: 2,
                  }
               
                  setMilatitud(position.coords.latitude)
                  setMilongitud(position.coords.longitude)
        
                },
                (error) => {
                  // See error code charts below.
                  console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        }
    const sendevidencia = async ()=>{
        setLoad(true)
        let d= data.filter(d=> d.value==selected)
        var idtype=d[0].id
        console.log(idtype)
       
        try {
            base64(props.url)
            geolocation()
            const fecha = new Date();
            var month = ("0" + (fecha.getMonth() + 1)).slice(-2);
            var date = ("0" + fecha.getDate()).slice(-2);
            var datehora=fecha.getFullYear()+'/'+month+'/'+date+' '+fecha.getHours()+':'+fecha.getMinutes()+':00'

         const sendevidencia = await Api.setevidence(global.id_operador,milatitusd,milongitud,string64,datehora,comentario,idtype)
          console.log(sendevidencia)
          context.setModalVisible1(false)
          props.navigation.goBack()

            
        } catch (error) {
            console.log(error)
            context.setModalVisible1(false)
            props.navigation.goBack()
            
        }

    }
    const getTypes= async()=> {
        var tipos=[]
        try {
            const gettypes= await Api.getType()
            for(var i=0;i<gettypes.length;i++){
                var ob= 
                {
                    id:gettypes[i].id,
                    value:gettypes[i].description
                }
                    tipos.push(ob)
                  
            }
           setData(tipos) 
        } catch (error) {
            
        }
    }

    if(isload==true){

        return(
            <View style={style.content}>
            <Image  style={style.image} source={require('../drawables/loading.gif')}/>
        </View>
        )
    }else{
        return(
            <View style={style.content}>
              <View style={style.modal} >
                <Text style={style.title}>Tipo de  evidencia</Text>
                <SelectList 
                style={{color:'#000000',width:260}}
                setSelected={setSelected}
                data={data}
                dropdownTextStyles	={{color:'#000000'} }
                inputStyles={{color:'#000000'} }
                save="value"/>
               <Text style={style.title}>comentario</Text>

<TextInput
        style={style.input}
        onChangeText={setcomentario}
        value={comentario}
      />
    
                <View style={style.horizontal}>
              
                <Pressable 
              onPress={sendevidencia}
                style={style.button}>
                    <Text style={style.textbutton}>Enviar</Text>
                </Pressable>
                <Pressable 
                onPress={send}
                style={style.button1}>
                    <Text style={style.textbutton}>cancelar</Text>
                </Pressable>
                </View>
    
                </View>
              </View>

        )

    }
};

const style=StyleSheet.create({
    content:{
        marginTop:10,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'#eaeaeacc',
     

    },
    image:{
        width:200,
        height:200,
    },

    modal:{
      width:300,
    
      alignContent:'center',
      alignContent:'center',
      justifyContent: 'center',
      alignItems: "center",
      backgroundColor: '#ffffffd9',
      elevation: 5


    },

    input: {
        width:270,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color:'#000000'
      },

    horizontal:{
     
      flexDirection:'row',
      alignContent:'center',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:10
     
   

  },

    button:{
        width:100,
        height:30,
        alignContent:'center',
        alignContent:'center',
        justifyContent: 'center',
        backgroundColor:'green',
        margin:5,
        borderRadius:60,marginTop:10,elevation: 5
        

    },
    button1:{
      width:100,
      height:30,
      alignContent:'center',
      alignContent:'center',
      justifyContent: 'center',
      backgroundColor:'red',
      margin:5,
      borderRadius:60,marginTop:10,elevation: 5
      

  },
    textbutton:{
        textAlign: 'center',
        color: '#ffffff',

     
        

    },
    title:{
      
        textAlign: 'center',
        fontSize:16,
        fontWeight: "bold",
        color:'#393d42',

       
    },
    datePicker: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 320,
        height: 260,
        display: 'flex',
      },


})
export default SetDreams;
