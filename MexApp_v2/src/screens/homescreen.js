import React, { useEffect, useState } from 'react';
import { View,Image,ScrollView,Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { set } from 'immer/dist/internal';
import Api from '../api/intranet'
import { WebView } from 'react-native-webview';
//import InphograpicsList from '../containers/inphograpicsList'




function HomeScreen (){
  const [items, setItems] = useState([]);
  const [inphograpics,setInphograpics]= useState([])


    useEffect(() => {
     
        const interval = setInterval(() => {
          getData()
          getInfographics()

        }, 1000);
        return () =>{
          clearInterval(interval);
        
        } 
     
      
    }, [])
 
    const getInfographics= async()=> {
      try {       
          const infographics= await Api.getInfographics(global.solicitud)
          setInphograpics(infographics)

      } catch (error) {
       // console.log(error)        
      }

    }
  

    const getData = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@user_storage')
          var convert=JSON.parse(jsonValue)
          var contactoslist=convert.cell_data
          var celula=contactoslist[0].cell__name
          global.celula=celula
          let lideresdeflota=contactoslist.filter(contactoslist=>contactoslist.kind_id==1)
          let phone=lideresdeflota[0].phone
          global.phone=phone
          setItems(convert)
        } catch(e) {
         console.log(e)
         return ""
        }
      }
      
   
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
export default HomeScreen;