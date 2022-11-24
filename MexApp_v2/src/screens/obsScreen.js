import React, { useEffect, useState }from 'react';
import { Text, View,StyleSheet,Image,Pressable} from 'react-native';
import { WebView } from 'react-native-webview';
import Api from '../api/intranet'
import Obslist from '../containers/obslist'
import { useNavigation } from '@react-navigation/native';


function ObsScreen (props){
   const id = props.route.params.id
    const [items, setItems] = useState([])
    useEffect(() => {
        getobs()
       
   }, [])

   const getobs = async() =>{

    var arr=[]
       const obs = await Api.getObservaciones(id)
       var data=obs.data
       for(i=0;i<data.length;i++){
           var ob=data[i]
           var object={
               'id':i,
               'description':ob.description,
               'insert':ob.insert,
               'user__username':ob.user__username

           }
           arr.push(object)
       }
       setItems(arr)
   }

   const opencamera=()=>{
    navigation.navigate('camera')
}

  return(
      
    <View style={{width:'100%',height:'100%' }}>
        <Obslist items={items}/>
    </View>
   )

};

const style = StyleSheet.create({
    button:{
        width:100,
        height:30,
        alignContent:'center',
        alignContent:'center',
        justifyContent: 'center',
        backgroundColor:'blue',
        margin:5,
        borderRadius:60,marginTop:10,elevation: 5
        

    },
    button1:{
      width:100,
      height:100,
      alignContent:'center',
      alignContent:'center',
      justifyContent: 'center',
      backgroundColor:'green',
      margin:5,
      borderRadius:360,marginTop:10,elevation: 5
      

  },
  textbutton:{
        color:'#ffffff',
        textAlign: 'center'
    },
    horizontal:{
     
        flexDirection:'row',
        alignContent:'center',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',//use absolute position to show button on top of the map
    
     
        alignSelf: 'flex-end' ,
        top: '90%'//for align to right
       
     
  
    },
  
  })



export default ObsScreen;