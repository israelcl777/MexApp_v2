import React, { useEffect, useState } from 'react';
import { View,Text,Button,StyleSheet,Image,Pressable,Linking} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ContactList from '../containers/contactslist';



function Contact(){
  const [data,setData]=useState([])
  const [lidef,setLiderf]=useState([])
  const [lidef2,setLiderf2]=useState([])
  const [lidef3,setLiderf3]=useState([])
  const [lidea,setLidera]=useState([])
  const [contacts,setcontacts]=useState([])


    useEffect(() => {
        getData()
     
       
    }, [])

  
    const getData = async () => {
        try {
        
          const jsonValue = await AsyncStorage.getItem('@user_storage')
          if(jsonValue != null){
            var list=[];           
            var convert=JSON.parse(jsonValue)
            var contactoslist=convert.cell_data
            for(var i=0;i<contactoslist.length;i++){
              var contacto={
                'id':i,
                'cell__name':contactoslist[i].cell__name,
                'kind__name':contactoslist[i].kind__name,
                'name':contactoslist[i].name,
                'phone':contactoslist[i].phone,
                'whatsapp':contactoslist[i].whatsapp,

              }
              list.push(contacto)
            }
            setcontacts(list)            

          }else{
            console.log("no hay usuario guardardo")
           
          }
        } catch(e) {
         console.log(e)
        }
      }
      const whatsapp=(number)=>{
        console.log('holas ')
        Linking.openURL('whatsapp://send?text=hola&phone=+52'+number)



      }


    return(

        <ContactList contacts={contacts}/>

    )



}
const style= StyleSheet.create({
  content:{
    margin:5

  },
  imagen:{
    marginTop:20,
    margin:5,
    width:35,
    height:35,
    borderRadius: 360,
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center'
    
  },
  logo:{
    margin:2,
    width:20,
    height:20,
  },

   
  horizontal:{
    flexDirection:'row',
    backgroundColor:'#ffffffcc',
    borderRadius: 4,
        elevation: 3,
  
},
horizontalcall:{
  flexDirection:'row',
  margin:2,

},
horizontaltitle:{
  flexDirection:'row',
  margin:2,
  marginTop:15 ,

},

})

export default Contact