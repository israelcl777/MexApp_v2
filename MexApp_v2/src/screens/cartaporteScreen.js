import React, { useEffect, useState }from 'react';
import { WebView } from 'react-native-webview';

function Cartaporte (props){
 
  //const url='
  console.log(url)
  const [url,seturl]= useState('')


  useEffect(() => {
    const id= props.route.params.id
    seturl('https://drive.google.com/viewerng/viewer?embedded=true&url=http://buzon.mensajeriafiscal.com/api/issued/invoice/'+id+'/pdf?')
    console.log(url)

  },[])

   
    return(


             <WebView 
             nestedScrollEnabled
             refreshControl
             source={{ uri: url }} 
             javaScriptEnabled={true}
             />

    )

};
export default Cartaporte;