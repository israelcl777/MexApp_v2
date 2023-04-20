import { useNavigation } from '@react-navigation/native';
import React, {useEffect, useState } from 'react';
import { View,Image, } from 'react-native';
import { WebView } from 'react-native-webview';



function LiquidacionPdf (props){
    const id=props.route.params.id
    const navigator=useNavigation()
    useEffect(() => {
        setTimeout(() => {
            navigator.goBack()
         
        }, 2000);

  }, [])
   
    return(
  
             <WebView         
             source={{ uri: 'https://tms.logsys.com.mx/liquidations.api/api/liquidations/'+id+'/print' }} 
             javaScriptEnabled={true}
             />
        

    )
}


export default LiquidacionPdf