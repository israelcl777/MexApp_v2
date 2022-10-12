import React, { useState,useEffect } from 'react';
import { View,Text,StyleSheet, Pressable ,Image, Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DTPicker from '../componets/datetimePicker'
import Api from '../api/intranet';
import AsyncStorage from '@react-native-async-storage/async-storage';




function SetDreams (props){
    const context=props
    const [datehora,setDatehora]=useState('');
    const [type,setType]= useState('');
    const [isload,serLoad]= useState(false);

    useEffect(() => {
        const fecha = new Date();
        var dt=fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear()+' '+fecha.getHours()+':'+fecha.getMinutes()
        setDatehora(dt)
        const bandera=props.bandera
      
        if(bandera==0){
            setType('El sueño se finalizara a las:'+fecha.getHours()+':'+fecha.getMinutes())
        }else{
            setType('El sueño se Iniciara a las:'+fecha.getHours()+':'+fecha.getMinutes())
        }
    })

    const send=()=>{
       context.setModalVisible1(false)
    }
    const validarDream=async()=>{
        const bandera=props.banderadreams
        const fecha = new Date();
        var datehora=fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear()+' '+fecha.getHours()+':'+fecha.getMinutes()
        const jsonValue = await AsyncStorage.getItem('@dreams_current')
        var convert=JSON.parse(jsonValue)
        if(convert!=null){
            let validateStatus=convert.startStatus
            if(validateStatus==true){
                setDream()
            }else{
                try {
    
                    const dreams=await Api.New_Dream(convert.start,datehora)
                    Alert.alert(dreams)
                    context.setModalVisible1(false)
                    
                } catch (error) {
                    if(bandera==0){
              
                        Alert.alert('se sinserto sin conexion')
                        const jsonValue = await AsyncStorage.getItem('@dreams_current')
                        var convert=JSON.parse(jsonValue)
                        var init=convert.start
                        var initbandera=convert.startStatus
                        saveStoreDream(init,initbandera,datehora,false)
                        
        
                    }else{
                        Alert.alert('Se inserto sin conexion')
                        saveStoreDream(datehora,false,'',false)
                        console.log("insertado con conexion 500")
                    }
                    console.log(error)
                    context.setModalVisible1(false)
                }
                }
        }else{
            setDream()

        }
       

        }

    async function setDream(){
        serLoad(true)
        const bandera=props.banderadreams
        const fecha = new Date();
        var datehora=fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear()+' '+fecha.getHours()+':'+fecha.getMinutes()

        try{

            if(bandera==0){
             

                const stardream=await Api. setDream("",datehora,"0","finalizar MexApp2",false)
                var status=stardream.status
                const jsonValue = await AsyncStorage.getItem('@dreams_current')
                var convert=JSON.parse(jsonValue)
                if(convert==null){

                }else{
                    var init=convert.start
                    var initbandera=convert.startStatus

                }
               
                console.log(convert)
                if(status==200){
                    var message=await stardream.text()
                    console.log(message)
                   
                    Alert.alert(message)
                    if(message!='Debe esperar aunos minutos para terminar un evento de sueño'){
                        saveStoreDream(init,initbandera,datehora,true)
                    }
                    
                    await AsyncStorage.removeItem("@dreams_current");

                }else{
                    Alert.alert('Sueño insertado sin conexión')
                    saveStoreDream(init,initbandera,datehora,false)

                }
                context.setModalVisible1(false)
            }
            else {
                const stardream=await Api.setDream(datehora,"","-1","Iniciando MexApp2",false)
                var status=stardream.status
                if(status==200){
                    var message=await stardream.text()
                   
                    Alert.alert(message)
                    saveStoreDream(datehora,true,'',false)
                    console.log("insertado con conexion ")

                }else{
                    saveStoreDream(datehora,false,'',false)
                    console.log("insertado con conexion 200")

                }
                context.setModalVisible1(false)
            }

        }catch(error){
            if(bandera==0){
              
                Alert.alert('se sinserto sin conexion')
                const jsonValue = await AsyncStorage.getItem('@dreams_current')
                var convert=JSON.parse(jsonValue)
                var init=convert.start
                var initbandera=convert.startStatus
                saveStoreDream(init,initbandera,datehora,false)
                

            }else{
                Alert.alert('Se inserto sin conexion')
                saveStoreDream(datehora,false,'',false)
                console.log("insertado con conexion 500")
            }
            console.log(error)
            context.setModalVisible1(false)
        }
    }

    const saveStoreDream = async (init,startStatus,end,endStatus) => {
        var savedream={
            start:init,
            startStatus:startStatus,
            end:end,
            endStatus:endStatus,
            
        }
        try {
           
          const jsonValue = JSON.stringify(savedream)
          await AsyncStorage.setItem('@dreams_current', jsonValue)
          
        } catch (e) {
          console.log(e)
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
                <Text style={style.title}>{type} </Text>
                <Text style={style.title}></Text>
    
                <View style={style.horizontal}>
                <Pressable 
                onPress={validarDream}
                style={style.button}>
                    <Text style={style.textbutton}>Confirmar</Text>
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
      height:200,
      alignContent:'center',
      alignContent:'center',
      justifyContent: 'center',
      alignItems: "center",
      backgroundColor: '#ffffffd9',
      elevation: 5


    },
    horizontal:{
     
      flexDirection:'row',
      alignContent:'center',
      justifyContent: 'center',
      alignItems: 'center',
     
   

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
