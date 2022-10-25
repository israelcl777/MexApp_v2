import React,{ useState,useEffect} from 'react';
import { View,Text,StyleSheet,Image, Pressable} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import Api from '../api/intranet'


function CPicked (props){
    const [reporter,setReporter]=useState(false)
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [toggleCheckBox1, setToggleCheckBox1] = useState(false)
    const [toggleCheckBox2, setToggleCheckBox2] = useState(false)
    const [value,setValue]= useState('')
    
    const context=props

    useEffect(() => {
        if(toggleCheckBox==true){
            setToggleCheckBox1(false)
            setToggleCheckBox2(false)
            setValue('Shipment')

        }
        else if(toggleCheckBox1==true){
            setToggleCheckBox(false)
            setToggleCheckBox2(false)
            setValue('Destino')

        }
        else if(toggleCheckBox2==true){
            setToggleCheckBox1(false)
            setToggleCheckBox(false)
            setValue('Cita de descarga')

        }
    })
    const send=()=>{
        context.setModalVisible(false)
     }
     async function Confirmar(){
        const fecha = new Date();
        var datetime=fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear()+' '+fecha.getHours()+':'+fecha.getMinutes()

        try {
            const confirmated=await Api.confirmar(context.solicitud,2,"",datetime)
            console.log(confirmated)
            send()
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
    const confirmationStore = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@confirmarcarga', jsonValue)
        } catch (e) {
          // saving error
        }
      }

    async function noConfirmar(){
        const fecha = new Date();
        var datetime=fecha.getDate()+'-'+(fecha.getMonth()+1)+'-'+fecha.getFullYear()+' '+fecha.getHours()+':'+fecha.getMinutes()
         
        try {
            const confirmated=await Api.confirmar(context.solicitud,-1, value,datetime)
            console.log(confirmated)
            send()
        } catch (error) {
            var confirmation={
                id:-1,
                solicitud:context.solicitud,
                observation:value,
                datetime:datetime
            }
            confirmationStore(confirmation)
            console.log(error)
            send()
            
        }
    }
    

     if(reporter==false){
        return(
            <View style={style.content}>
                  <View style={style.modal} >
                    <Text style={style.title}>MexApp</Text>
                    <Text style={style.title}>¿Coinciden documentos con solicitud asignada? </Text>
        
                    <View style={style.horizontal}>
                    <Pressable 
                    onPress={Confirmar}
                    style={style.button}>
                        <Text style={style.textbutton}>si</Text>
                    </Pressable>
                    <Pressable 
                    onPress={() => setReporter(true)}
                    style={style.button1}>
                        <Text style={style.textbutton}>no</Text>
                    </Pressable>
                    </View>
        
                    </View>
                  </View>

        )

     }
     else{
           return(
            <View style={style.content}>
            <View style={style.modal} >
              <Text style={style.title}>Reportar un problema</Text>
              <View style={style.check_s}>
                    <View  style={style.checkbox}>
                        <CheckBox
                         disabled={false}
                        value={toggleCheckBox}
                        onValueChange={(newValue) => setToggleCheckBox(newValue)}
                        />
                       <Text>Shipment</Text>
    
                    </View>
                    <View  style={style.checkbox}>
                        <CheckBox
                         disabled={false}
                        value={toggleCheckBox1}
                        onValueChange={(newValue) => setToggleCheckBox1(newValue)}
                        />
                       <Text>Destino</Text>
    
                    </View>
                    <View  style={style.checkbox}>
                        <CheckBox
                         disabled={false}
                        value={toggleCheckBox2}
                        onValueChange={(newValue) => setToggleCheckBox2(newValue)}
                        />
                       <Text>Cita de descarga</Text>
    
                    </View>
                    </View>
            
    
              <View style={style.horizontal}>
              <Pressable 
              onPress={noConfirmar}
              style={style.button}>
                  <Text style={style.textbutton}>Enviar</Text>
              </Pressable>
              <Pressable 
              onPress={send}
              style={style.button1}>
                  <Text style={style.textbutton}>Cancelar</Text>
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
export default CPicked;