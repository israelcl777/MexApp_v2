import React,{ useState,useEffect} from 'react';
import { View,Text,StyleSheet,Image, Pressable,Modal, Alert} from 'react-native';
import TMS from '../api/tms'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Maintenance from './maintenance';

function Confirmated (props){
    const context=props
    const [isload,serLoad]= useState(false);
    const [isModalvisible,setModalVisible]=useState(false)
    const [items,setItems]=useState([])
    const[texto,setText]=useState('')

    useEffect(() => {
      getData()
   
  }, [])

  async function getData(){
    var token=global.token//gettoken.token 
    try {
      const getreports= await TMS.getreportsdetail(token,props.ot)
      setItems(getreports)
      console.log(getreports)

      var str=''

      for (var i = 0; i < items.length; i++) {

        console.log(items[i].id)
        var id=items[i].id
        var causa=items[i].report_type
        str+=id+'        '+causa+'\n\n'
        
       
      }
      setText(str)

      console.log(str)

    } catch (error) {
      console.log(error)
      
    }

  }


    async function Confirmar(){
      try {
        const validate=await TMS.validatereports(props.data.id,true)

      } catch (error) {
        
      }
    }
    const openmodal=()=>{
      setModalVisible(true)

    }
    const Incorrecto= async ()=>{
      try {
//      setModalVisible(true)
       const validate=await TMS.validatereports(props.data.id,false)
       console.log(validate)

       Alert.alert('crear reporte',
       '¿Quires crear otro reporte para la unidad '+props.vehicle+' ?',
       [
           {
               text:'Si',
               onPress:openmodal
           },
           {
               text:'No',
               onPress:cancelar
           }
       ] )


        
      } catch (error) {
       // context.setModalVisible(false)

        
      }




    }
      
    const cancelar=()=>{
       
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
           <Modal
                animationType="slide"
                transparent={true}
                visible={isModalvisible}>
                <Maintenance setHelpmodal1={setModalVisible}/>
            </Modal>
              <View style={style.modal} >
                <Text style={style.title}>¿Deseas validar la orde de trabajo {props.data.ot} ?</Text>
                <Text style={style.title}>Los siguientes reportes seran validados: </Text>  
                <Text style={style.title}></Text>
                <Text style={style.title}>Folio         Tipo             </Text>    
    
  
                <Text style={style.title}>{texto}</Text>    
                <View style={style.horizontal}>
             

                <Pressable 
                onPress={Confirmar}
                style={style.button}>
                    <Text style={style.textbutton}>Correcto</Text>
                </Pressable>
                <Pressable 
                onPress={Incorrecto}
                style={style.button1}>
                    <Text style={style.textbutton}>Incorrecto</Text>
                </Pressable>
                <Pressable 
                onPress={cancelar}
                style={style.button2}>
                    <Text style={style.textbutton}>Cancelar</Text>
                </Pressable>
                </View>
    
                </View>
              </View>

    )
}


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
      width:340,
      height:300,
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
  button2:{
    width:100,
    height:30,
    alignContent:'center',
    alignContent:'center',
    justifyContent: 'center',
    backgroundColor:'blue',
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
        color:'#000000',

       
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
