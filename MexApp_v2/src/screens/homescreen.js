import React, { useEffect, useState,useRef } from 'react';
import { View,Image,ScrollView,Text,RefreshControl } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Api from '../api/intranet'
import { WebView } from 'react-native-webview';
import InphograpicsList from '../containers/inphograpicsList'


var arrayimage = [];

function HomeScreen (){
  
  const [items, setItems] = useState([]);
  const [Inphograpics_list,setInphograpics]= useState([])
  const webViewRef = useRef();
  const [refreshing, setRefreshing] = React.useState(false);



    useEffect(() => {
     
        const interval = setInterval(() => {
          getData()
          getInfographics()

        }, 3000);
        return () =>{
          clearInterval(interval);
        } 
    }, [])

    
 
    const getInfographics= async()=> {
      try {       
          const infographics= await Api.getInfographics(global.solicitud)
        
            console.log(infographics.status)
            var imagenes=[]
          
           var count=0;
           for(var i=0;i<infographics.length;i++){
          
            var document_url=infographics[i]['document_url']
            var longi = document_url.split(',')
            for(j=0;j<longi.length;j++){
              count++;
            
              var imagen=longi[j].replace('[','').replace(']','').replace(/'/,'')
              var json={
                'id':count,
                'image':imagen
              }
              imagenes.push(json)
            }
  
           }
           storeData(imagenes)
           setInphograpics(imagenes)
       //  console.log(Inphograpics_list)
   
      } catch (error) {
      
        getsave()
        console.log(error)        
      }

    }
    const getsave = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@infografias')
        var convert=JSON.parse(jsonValue)
      
        Inphograpics_list(convert)
       
      } catch(e) {
       console.log(e)
       return ""
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
      const storeData = async (value) => {
        try {
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@infografias', jsonValue)
        } catch (e) {
          console.log(e)
        }
      }
      
      const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        webViewRef.current.reload(); 
        wait(2000).then(() => setRefreshing(false));
      }, []);

      const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }
   
    return(
      <ScrollView 
      style={{backgroundColor:'#c0c0c0'}}
      contentContainerStyle={{ flexGrow: 1,width:'100%',height:'100%' }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      }>
        <View style={{width:'100%',height:'28%', backgroundColor:'#ffffff', marginTop:10,marginBottom:10,}}>
        <InphograpicsList infografias={Inphograpics_list}/>

        </View>
     
    
   
    
             <WebView 
             ref={(ref) => webViewRef.current = ref}
             nestedScrollEnabled
             refreshControl
             source={{ uri: 'https://sites.google.com/logsys.com.mx/mexapp-avisos/p%C3%A1gina-principal' }} 
             javaScriptEnabled={true}
             />
      

      </ScrollView>
 
       
            
     

    )

};
export default HomeScreen;