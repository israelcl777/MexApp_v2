import React,{ useState,useEffect} from 'react';
import { View,Text,StyleSheet,TouchableOpacity,Pressable} from 'react-native';
import Voice from '@react-native-voice/voice';
import Sound from 'react-native-sound';




function Confirmated (props){
    const [voiceText, setVoiceText] = useState('');
    const [isRecording, setIsRecording] = useState(false);


    useEffect(() => {
      const sound = new Sound('../sounds/bambu_1.mp3', null, (error) => {
        if (error) {
          console.log('Error al cargar el archivo de audio', error);
          return;
        }
      
        // El archivo de audio se ha cargado correctamente
      });
      sound.play((success) => {
        if (success) {
          console.log('El archivo de audio se ha reproducido correctamente');
        } else {
          console.log('Error al reproducir el archivo de audio');
        }
      });

        Voice.onSpeechResults = (results) => {
          setVoiceText(results.value);
          console.log(results)
        };
        return () => {
          Voice.destroy().then(Voice.removeAllListeners);
        };
      }, []);


    const startRecording = async () => {
        setIsRecording(true);
        try {
          await Voice.start('es-mx');
          setTimeout(() => {
            setIsRecording(false);
            startRecording
          }, 5000);

        } catch (e) {
          console.error(e);
        }
      };
      
      const stopRecording = async () => {
        setIsRecording(false);
        try {
          const voiceResult = await Voice.stop();
          //console.log(voiceResult)
        //  setVoiceText(voiceResult.value[0]);
        } catch (e) {
          console.error(e);
        }
      };
      const close=()=>{
        props.setModalVisible(false)
      }
     
    return(
        <View style={style.content}>
        <View style={style.modal} >
        <Text>{voiceText} </Text>
        <TouchableOpacity onPressIn={startRecording} onPressOut={stopRecording}>
          <Text>{isRecording ? 'Grabando...' : 'Presione para hablar'}</Text>
        </TouchableOpacity>
        <Pressable 
                 onPress={startRecording}
            
                style={style.button}>
                    <Text style={style.textbutton}>grabar</Text>
                </Pressable>
             
        <Pressable 
                 onPress={close}
            
                style={style.button}>
                    <Text style={style.textbutton}>Confirmar</Text>
                </Pressable>
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
