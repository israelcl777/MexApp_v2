import React from 'react';
import {
    View,
    Text,
    StyleSheet,
   
}from 'react-native';

function Liquidacion (props){
    return(
<View style={styles.container}>
<Text style={styles.text}>hola</Text>
</View>
    )

}
const styles=StyleSheet.create({
  container:{
padding:10,
  }  ,
  text:{
fontSize:16,
  },
})
export default Liquidacion