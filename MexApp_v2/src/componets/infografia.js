import { useRoute } from '@react-navigation/core';
import React ,{useState}from 'react';
import { View,Pressable,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function Event (props){
  const navigation = useNavigation();
    var image0=props.image.replace(/'/,"")//
    var image=image0.replace(' h','h')

    const open=()=>{
      navigation.navigate('imagescreen',{images:image})
  }

  

    return(
        
        <Pressable style={{justifyContent: 'center',
        alignItems: 'center',}}
        onPress={open}>
          <Image 
          style={{  width: 110,height: 160,resizeMode:'contain', borderWidth:2.5,borderColor: "#000",  borderRadius: 30 / 2, margin:5}}
          source={{uri: image}} />
               
        </Pressable>

    )

};
export default Event;