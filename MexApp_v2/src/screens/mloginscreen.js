import React from 'react';
import { Text,ScrollView, View} from 'react-native';
import { WebView } from 'react-native-webview';



function MLoginScreen (){
 


  return(
    <ScrollView contentContainerStyle={{ flexGrow: 1,width:'100%',height:'100%' }}>
   
  
 
  
           <WebView 
           nestedScrollEnabled
        source={{ uri: 'https://sites.google.com/logsys.com.mx/mexapp-avisos/p%C3%A1gina-principal' }} 
        javaScriptEnabled={true}
      />
    

    </ScrollView>

     
          
   

  )
     

};


export default MLoginScreen;