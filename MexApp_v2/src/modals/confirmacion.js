import React,{ useState,useEffect} from 'react';
import { View,Text,StyleSheet,Image, Pressable} from 'react-native';
import Api from '../api/intranet'


function Confirmated (props){
    const context=props

    async function Confirmar(){
        const fecha = new Date();
        var datetime=fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear()+' '+fecha.getHours()+':'+fecha.getMinutes()

        
        try {
            const confirmated=await Api.confirmar(context.solicitud,1,"",datetime)
            console.log(confirmated)
            send()


            
        } catch (error) {
            console.log(error)
            send()
            
        }
    }


    const send=()=>{
        console.log(props)
        context.setModalVisible(false)
     }
    return(
        <View style={style.content}>
              <View style={style.modal} >
                <Text style={style.title}>Solicitud {context.solicitud} asignada</Text>
                <Text style={style.title}>Debes confirmar para poder continuar</Text>
    
                <View style={style.horizontal}>
                
                <Pressable 
                 onPress={Confirmar}
            
                style={style.button}>
                    <Text style={style.textbutton}>Confirmar</Text>
                </Pressable>
                </View>
    
                </View>
              </View>

    )


}
const style=StyleSheet.create({
    content:{
       
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
   
        backgroundColor:'#eaeaeacc',
     

    },
    checkbox:{
        flexDirection:'row',
  
    },
    check_s:{
        marginTop:10,

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

export default Confirmated
