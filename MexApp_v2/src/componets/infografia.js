import { useRoute } from '@react-navigation/core';
import React ,{useState}from 'react';
import { View,Text,Image } from 'react-native';


function Event (props){
    const [images, setImages]= useState([])
    var s=props.document_url
    var s1=s.replace("[","").replace("]","").replace("'","")
    console.log(s1)
    //   var arrayDeCadenas = cadenaADividir.split(separador);


   
  

    return(
        
        <View >
            <Text>{props.document_url} </Text>
            <Image style={{  width: 100,
          height: 150,        resizeMode:'contain',
        }}
          source={{
            uri: s1,
          }}
     
      />
           
      
        </View>

    )

};
export default Event;