import React, { useEffect, useState,useRef } from 'react';
import { View,Image,ScrollView,Text,RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../api/intranet'
import { WebView } from 'react-native-webview';



function PdfWeb (props){
    const url=props.route.params.url
    console.log('https://intranet.mexamerik.com'+url)


    return(
        <WebView 
      
        nestedScrollEnabled
        refreshControl
        source={{ uri: 'https://drive.google.com/viewerng/viewer?embedded=true&url=https://intranet.mexamerik.com'+url}} 
        javaScriptEnabled={true}
        />

    )


}


export default PdfWeb