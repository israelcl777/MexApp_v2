import React from 'react';
import{
View,
Text,
StyleSheet,
}from 'react-native';

function viajesListLayaout(props){
    return(
<View style={styles.container}>

{props.children}

</View>
    )
}
const styles=StyleSheet.create({
    container:{
   
     flex:1,
     width:'100%',
     height:'100%',
   
     
   

    },
    title:{
        color:'#ffffff',
        fontSize:20,
        marginBottom:10,
        fontWeight:'bold',
        marginTop:10,
        marginLeft:20,
    },
 
})
export default viajesListLayaout