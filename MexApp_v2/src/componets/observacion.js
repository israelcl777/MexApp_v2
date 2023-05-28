import React from 'react';
import { Text,Pressable, View, StyleSheet,Linking} from 'react-native';
import Styles from '../styles/styles'


function Evidencia (props){

 
 


  return(
    <Pressable
    onPress={() => Linking.openURL('https://intranet.mexamerik.com/media/evidences/49_20220913170128.pdf')}
    style={Styles.contencard}>
      

        <View style={Styles.horizontal}>
            <Text style={Styles.titletext}>Insertada: </Text>
            <Text style={Styles.simpletext}>{props.insert}</Text>
        </View>

        <View style={Styles.horizontal}>
            <Text style={Styles.titletext}>Decripcíon: </Text>
            <Text style={Styles.simpletext}>{props.description}</Text>
        </View>
        <View style={Styles.horizontal} >
        <Text style={Styles.titletext}>Usuario: </Text>
            <Text style={Styles.simpletext}>{props.user__username}</Text>
      
       
    
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