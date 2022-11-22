import React, { useEffect, useState } from 'react';
import { View,Text,Linking,StyleSheet,Image,Pressable} from 'react-native';
import Styles from'../styles'


function Contacts(props){



    return(

        <View style={style.horizontal} >
        <Image source={require('../drawables/userlogo.png')} style={style.imagen} />
        <View>
          <View style={style.horizontaltitle} >
          <Text style={Styles.titletext}>{props.kind__name}: </Text>
          <Text style={Styles.simpletext}>{props.name}</Text>
          </View>
          <View style={style.horizontalcall} >
            <Pressable 
            onPress={() => Linking.openURL('tel:+52'+props.phone)}
            style={style.horizontalcall}>
              <Image source={require('../drawables/call.png')} style={style.logo} />
              <Text style={Styles.simpletext}>{props.phone} </Text>  
            </Pressable>
            <Pressable
            onPress={() => Linking.openURL('whatsapp://send?text=hola&phone=+52'+props.whatsapp)}
            style={style.horizontalcall}>
              <Image source={require('../drawables/whats.png')} style={style.logo} />
              <Text style={Styles.simpletext}>{props.whatsapp}</Text>
            </Pressable>
    
          </View>
        
        </View>
     
      </View>

    )



}
const style= StyleSheet.create({
    content:{
      margin:5
  
    },
    imagen:{
      marginTop:20,
      margin:5,
      width:35,
      height:35,
      borderRadius: 360,
      alignContent:'center',
      alignItems:'center',
      justifyContent:'center'
      
    },
    logo:{
      margin:2,
      width:20,
      height:20,
    },
  
     
    horizontal:{
      flexDirection:'row',
      backgroundColor:'#ffffffcc',
      borderRadius: 4,
          elevation: 3,
    
  },
  horizontalcall:{
    flexDirection:'row',
    margin:2,
  
  },
  horizontaltitle:{
    flexDirection:'row',
    margin:2,
    marginTop:15 ,
  
  },
  
  })

export default Contacts