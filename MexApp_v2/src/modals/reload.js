import React from 'react';
import { View,Text,StyleSheet,Image } from 'react-native';


function Reload (props){
  

    return(
        <View style={style.content}>
            <Image  style={style.image} source={require('../drawables/loading.gif')}/>
            
        </View>


    )
};
const style=StyleSheet.create({
    content:{
       
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'#eaeaeacc',
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
    image:{
        width:200,
        height:200,
    }
   


})
export default Reload;