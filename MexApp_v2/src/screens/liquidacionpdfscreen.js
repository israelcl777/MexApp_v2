import React, { useEffect, useState,useRef } from 'react';
import { View,Image,ScrollView,Text,RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../api/intranet'
import { WebView } from 'react-native-webview';



function LiquidacionPdf (props){
   

    return(
        <WebView 
      
        nestedScrollEnabled
        refreshControl
        source={{ uri: 'https://drive.google.com/viewerng/viewer?embedded=true&url='+'file:///storage/emulated/0/Android/data/com.mexapp_v2/files/Documents/69473.pdf'}} 
        javaScriptEnabled={true}
        />

    )
}


export default LiquidacionPdf