import React from 'react';
import { Text,Pressable, View, StyleSheet,Linking} from 'react-native';
import Styles from '../styles/styles'
import { useNavigation } from '@react-navigation/native';


function Evidencia (props){
    const navigation = useNavigation();

    const openObservaciones=()=>{

        navigation.navigate('observaciones',{ id:props.id})


    }


    const openpdf=()=>{

        navigation.navigate('pdfweb',{ url:props.url})


    }


  return(
    <Pressable
    onPress={openpdf}
    style={Styles.contencard}>
        <View style={Styles.horizontal}>
            <Text style={Styles.titletext}>{props.type_id} </Text>
            <Text style={Styles.simpletext}>{props.status}</Text>
        </View>

        <View style={Styles.horizontal}>
            <Text style={Styles.titletext}>Creada: </Text>
            <Text style={Styles.simpletext}>{props.mexapp_datetime}</Text>
        </View>

        <View style={Styles.horizontal}>
            <Text style={Styles.titletext}>Decripcíon: </Text>
            <Text style={Styles.simpletext}>{props.description}</Text>
        </View>
        <View style={style.horizontal} >
        <Pressable 
            onPress={openObservaciones}
            style={style.button1}>
                <Text style={style.textbutton}> Observaciones </Text>
            </Pressable>
            </View>

        
     </Pressable>

   )

};

const style=StyleSheet.create({
    
    horizontal:{
     
      flexDirection:'row',
      alignContent:'center',
      justifyContent: 'center',
      alignItems: 'center',
     
   

  },

    button1:{
      width:100,
      height:30,
      alignContent:'center',
      alignContent:'center',
      justifyContent: 'center',
      backgroundColor:'#ffffff',
      borderBottomColor:'#cca028',
      margin:5,
      marginBottom:10,
      borderRadius:60,marginTop:10,elevation: 5
      
      

  },
    textbutton:{
        textAlign: 'center',
        color: 'blue',
     
        

    },
  


})

export default Evidencia;