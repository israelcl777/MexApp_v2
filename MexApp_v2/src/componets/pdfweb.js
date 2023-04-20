import React, { useEffect, useState,useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../api/intranet'
import { WebView } from 'react-native-webview';



function PdfWeb (props){
    const navigator=useNavigation()
    const url=props.route.params.url
    useEffect(() => {
        setTimeout(() => {
            navigator.goBack()
         
        }, 2000);

  }, [])
   


    return(
        <WebView 
      
        nestedScrollEnabled
        refreshControl
        source={{ uri:'https://intranet.mexamerik.com'+url}} 
        javaScriptEnabled={true}
        />

    )
}


export default PdfWeb