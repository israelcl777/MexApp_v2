import { set } from 'immer/dist/internal';
import React, { useState,useEffect } from 'react';
import { View,Text,Pressable,StyleSheet,Image,Modal,Alert} from 'react-native';
import Api from '../api/intranet'
import NewDream from '../modals/newdream';
import SetDreams from '../modals/setDream'
import DinamicImage from '../componets/dinamicImage';
import AsyncStorage from '@react-native-async-storage/async-storage';

function DreamsScreen (){
    const [bandera,setBandera]=useState('#ffffff')
    const [banderadreams, setBanderadrems]=useState(0)
    const [banderabutton, setBanderabutton]=useState('#008f39')
    const [stateDream, setStateDream]=useState('iniciar sueño')
    const [data,setData]=useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible1, setModalVisible1] = useState(false);
    const [isOffline, setIsoffline]=useState('')
    const [savestart, setSavestart]=useState('')
    const [save_end,setSave_end]=useState('')
    const [savebandera,setSavebandera]=useState('')

    useEffect(() => {
      
        const interval = setInterval(() => {
          getDreams()
        validate()
        }, 2000);
        return () =>{
          clearInterval(interval);
        } 
        
       

    })
    const validate=async()=>{
      var semaphore=data.semaphore_24
      var activity_id=data.activity_id
      if(semaphore==3){
          setBandera('#e62e1b')

      }else if(semaphore==2){
          setBandera('#fce903')

      }else if(semaphore==1){
          setBandera('#008f39')
          
      }
  var recovery = await getsaveDreamas()
  if(recovery!= null){

    if(recovery.end==''&&recovery.start!=''){
      setStateDream('Terminar Sueño')
      setBanderabutton('#e62e1b')
      setBanderadrems(0)
     
      

    }else{
      setStateDream('Iniciar Sueño 7')
      setBanderabutton('#008f39')
      setBanderadrems(1)
    

      if(recovery.startStatus==false&&recovery.endStatus==false){ 
        try {
          console.log("se agregara al servicio posterior")

          const dreams=await Api.New_Dream(recovery.start,recovery.end)
          console.log(dreams)
          Alert.alert("se agrego unsueño sin conexion")
          await AsyncStorage.removeItem("@dreams_current");     
          
        } catch (error) {
          console.log(error)
        }
     
      }else if(recovery.startStatus=true&& recovery.endStatus==false){
        try {
          console.log("se agregara al servicio normal")
          const stardream=await Api. setDream("",recovery.snd,"0","finalizar MexApp2",false)
          console.log(stardream)
          Alert.alert("se agrego unsueño sin conexion")
          await AsyncStorage.removeItem("@dreams_current");
          
        } catch (error) {
          console.log(error)
          
        }
      }
    }

  }else{

    if(activity_id==1){
      setStateDream('Terminar Sueño')
      setBanderabutton('#e62e1b')
      setBanderadrems(0)

  }else if(activity_id==2){
      setStateDream('Iniciar Sueño')
      setBanderabutton('#008f39')
      setBanderadrems(1)


  }else if(activity_id==3){
      setStateDream('Iniciar Sueño')
      setBanderabutton('#008f39')
      setBanderadrems(1)


  }else if(activity_id==4){
      setStateDream('Iniciar Sueño')
      setBanderabutton('#008f39')
      setBanderadrems(1)

  }
   
    
     /*/    if(save.start==""||save.terminated==true){/*/

     
      


      }

   /*/  }else{
      setStateDream('Terminar Sueño')
      setBanderabutton('#e62e1b')
      setBanderadrems(0)
      setSavestart(save.start)
     

     }/*/
     
     
      
      


  }



    async function getDreams(){
        id_operador =global.id_operador

        try {

            const dreams=await Api.get_current_dream(id_operador)
            setData(dreams)
            storeData(dreams)
            setIsoffline('')
            validate()
           
            
        } catch (error) {
            dataOffline()
        }

    }
    const storeData = async (value) => {
        try {
           
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@dreams_storage', jsonValue)
        } catch (e) {
          console.log(e)
        }
      }
      const dataOffline = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@dreams_storage')
          var convert=JSON.parse(jsonValue)
          setData(convert)
          setIsoffline('no hay conexion a internet')
      
        } catch(e) {
            
           
         console.log(e)
        }
      }
      const getsaveDreamas = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@dreams_current')
          var convert=JSON.parse(jsonValue)
          return convert
          
        } catch(e) {

       return ""
         
        }
      }



    return(
        
        
        <View>
            <Text>{isOffline}</Text>
            <View style={style.horizontal}>
            <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
     <NewDream modalVisible={modalVisible} setModalVisible={setModalVisible}/>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          setModalVisible(!modalVisible1);
        }}>

          <SetDreams 
          modalVisible1={modalVisible1} 
          bandera={banderadreams}  
          setModalVisible1={setModalVisible1} 
          savestart={savestart}
          save_end={save_end}
          savebandera={savebandera}
          banderadreams={banderadreams}/>


      </Modal>

         
            <DinamicImage bandera={data.activity_id} banderadreams={banderadreams} />


            </View>
            <View style={{backgroundColor:bandera,marginTop:18,margin:10}}>
                <Text style={[{backgroundColor:bandera},style.textbutton]}>Tienes que dormir antes del {data.dream_24}</Text>
            </View>

            <Pressable style={{backgroundColor:banderabutton,marginLeft:100,marginRight:100,borderRadius:60,marginTop:10,elevation: 5,}}
            onPress={() => setModalVisible1(true)}>
                <Text style={{color:'#ffffff',textAlign: 'center',margin:10, letterSpacing: 0.25,}}>{stateDream}</Text>
            </Pressable>
            <Pressable style={{backgroundColor:'blue',marginLeft:100,marginRight:100,borderRadius:60,marginTop:10,elevation: 5}}
              onPress={() => setModalVisible(true)}>
                <Text style={{color:'#ffffff',textAlign: 'center',margin:10}}a>Agregar sueño</Text>
            </Pressable>
           
        </View>

    )

};
const style=StyleSheet.create({
    logo:{
        width:150,
        height:150,
        borderRadius: 360,
        marginTop:10,
    },

  
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
      
    
      },
      titulo:{
        flex:1,
        fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: 0.25,
    color: '#ffffff',

      },
      
      menutext:{
          marginLeft:10,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop:10,

      },
      textbutton:{
        textAlign: 'center',
        color: '#ffffff',
        margin:5,
        fontSize:15

    },
    menuicon:{
        width:'100%',
        height:'100%',
        margin: 5,
        resizeMode:'contain',
    },
   
  
    horizontal:{
     
        flexDirection:'row',
        alignContent:'center',
        justifyContent: 'center',
        alignItems: 'center',
       
     

    },
    horizontal1:{
      
        flexDirection:'row',
        alignContent:'center',
        justifyContent: 'center',
    alignItems: 'center',
       
     

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
export default DreamsScreen;