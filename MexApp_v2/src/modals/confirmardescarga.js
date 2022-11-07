import React, { useState,useEffect } from 'react';
import { View,Text,StyleSheet,Image,Pressable, Alert,TextInput} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Api from '../api/intranet'
import AsyncStorage from '@react-native-async-storage/async-storage';



function Cdelivery (props){
    const context=props
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [toggleCheckBox1, setToggleCheckBox1] = useState(false)
    const [toggleCheckBox2, setToggleCheckBox2] = useState(false)
    const [toggleCheckBox3, setToggleCheckBox3] = useState(false)
    const [toggleCheckBox4, setToggleCheckBox4] = useState(false)
    const [text, setText] = useState('');
    const [observacion,setObservacion]= useState('')
    const [id_causa,setCausa]= useState(0)
    const [isload,serLoad]= useState(false);


  
    useEffect(() => {
        if(toggleCheckBox==true){
            setToggleCheckBox1(false)
            setToggleCheckBox2(false)
            setToggleCheckBox3(false)
            setToggleCheckBox4(false)
            setObservacion('Sin problemas')
            setCausa(0)

        }
        else if(toggleCheckBox1==true){
            setToggleCheckBox(false)
            setToggleCheckBox2(false)
            setToggleCheckBox3(false)
            setToggleCheckBox4(false)
            setObservacion('Documentación incompleta')
            setCausa(1)

        }
        else if(toggleCheckBox2==true){
            setToggleCheckBox1(false)
            setToggleCheckBox(false)
            setToggleCheckBox4(false)
            setToggleCheckBox3(false)
            setObservacion('Devolucion y rechazos')
            setCausa(2)

        }
        else if(toggleCheckBox3==true){
            setToggleCheckBox1(false)
            setToggleCheckBox(false)
            setToggleCheckBox4(false)
            setToggleCheckBox2(false)
            setObservacion('Faltantes')
            setCausa(3)

        }
        else if(toggleCheckBox4==true){
            setToggleCheckBox1(false)
            setToggleCheckBox(false)
            setToggleCheckBox2(false)
            setToggleCheckBox3(false)
            setObservacion('Sin recivo de maniobra')
            setCausa(4)

        }
    })
    async function Confirmar(){
        serLoad(true)

        try {
            const confirmated=await Api.confirmar(context.solicitud,3,observacion)
            console.log(confirmated)
            if(id_causa!=0){
                setReporter()
            }
            send()()
          
        } catch (error) {
            var confirmation={
                id:2,
                solicitud:context.solicitud,
                observation:'',
                datetime:datetime
            }
            confirmationStore(confirmation)

            console.log(error)
            send()
            
        }
    }
    async function setReporter(){

        try {
            const reporter=await Api.setReport(context.solicitud,3,observacion)
            console.log(reporter)
            send()
        } catch (error) {
            console.log(error)
            send()
            
        }
    }
    const confirmationStore = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@confirmardescarga', jsonValue)
          Alert.alert(
            "No se pudo enviar",
            "confirmación de descarga guardada. se enviara cuando tengas conexión a internet",
            [
           
              { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
          );


        } catch (e) {
          // saving error
        }
    }
   
    const send=()=>{
        console.log(id_causa)
        context.setModalVisible(false)
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
                <Text style={style.title}>Confirmo que finalizo descarga y recibí todos los documentos necesarios para el cobro del viaje</Text>
                <Text style={style.title}>Me encuentro:</Text>
                <View style={style.check_s}>
                <View  style={style.checkbox}>
                    <CheckBox
                     disabled={false}
                    value={toggleCheckBox}
                    onValueChange={(newValue) => setToggleCheckBox(newValue)}
                    />
                   <Text>Sin problemas</Text>

                </View>
                <View  style={style.checkbox}>
                    <CheckBox
                     disabled={false}
                    value={toggleCheckBox1}
                    onValueChange={(newValue) => setToggleCheckBox1(newValue)}
                    />
                   <Text>Documentación incompleta</Text>

                </View>
                <View  style={style.checkbox}>
                    <CheckBox
                     disabled={false}
                    value={toggleCheckBox2}
                    onValueChange={(newValue) => setToggleCheckBox2(newValue)}
                    />
                   <Text>Devolucion y rechazos</Text>

                </View>
                <View  style={style.checkbox}>
                    <CheckBox
                     disabled={false}
                    value={toggleCheckBox3}
                    onValueChange={(newValue) => setToggleCheckBox3(newValue)}
                    />
                   <Text>Faltantes</Text>

                </View>
                <View  style={style.checkbox}>
                    <CheckBox
                     disabled={false}
                    value={toggleCheckBox4}
                    onValueChange={(newValue) => setToggleCheckBox4(newValue)}
                    />
                   <Text>Sin recivo de maniobra</Text>

                </View>
                </View>
                <TextInput
                disabled={true}
                style={style.input}
                label="text"
                value={text}
                onChangeText={text => setText(text)}
                />
    
                <View style={style.horizontal}>
                <Pressable 
                onPress={Confirmar}
                style={style.button}>
                    <Text style={style.textbutton}>si</Text>
                </Pressable>
                <Pressable 
                onPress={send}
                style={style.button1}>
                    <Text style={style.textbutton}>no</Text>
                </Pressable>
                </View>
    
                </View>
              </View>

    )
};
}

const style=StyleSheet.create({
    content:{
       
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
   
        backgroundColor:'#eaeaeacc',
     

    },
    input: {
        width:250,
        height: 40,
        margin: 12,
        borderWidth: 0.5,
        padding: 10,
      },
    image:{
        width:200,
        height:200,
    },
    check_s:{
        marginTop:10,

    },

    modal:{
      width:300,
      height:400,
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
  checkbox:{
      flexDirection:'row',

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
export default Cdelivery;