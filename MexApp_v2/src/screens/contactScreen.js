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
           
            var convert=JSON.parse(jsonValue)
            var contactoslist=convert.cell_data
            let lideresdeflota=contactoslist.filter(contactoslist=>contactoslist.kind_id==1)
            let lideralfa=contactoslist.filter(contactoslist=>contactoslist.kind_id==3)
            let aro=contactoslist.filter(contactoslist=>contactoslist.kind_id==2)


            setData(aro[0])
            setLidera(lideralfa[0])
            setLiderf(lideresdeflota[0])
            setLiderf2(lideresdeflota[1])|
            setLiderf3(lideresdeflota[2])
            setcontacts(lideresdeflota)
           

          
      
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

        <View  style={style.content} >
          <View style={style.horizontal} >
            <Image source={require('../drawables/userlogo.png')} style={style.imagen} />
            <View>
              <View style={style.horizontaltitle} >
              <Text>{data.kind__name}: </Text>
              <Text>{data.name}</Text>
              </View>
              <View style={style.horizontalcall} >
                <Pressable 
                onPress={() => Linking.openURL('tel:+52'+data.phone)}
                style={style.horizontalcall}>
                  <Image source={require('../drawables/call.png')} style={style.logo} />
                  <Text>{data.phone} </Text>  
                </Pressable>
                <Pressable
                   onPress={() => Linking.openURL('whatsapp://send?text=hola&phone=+52'+data.whatsapp)}
                   style={style.horizontalcall}>
                  <Image source={require('../drawables/whats.png')} style={style.logo} />
                  <Text>{data.whatsapp}</Text>
                </Pressable>
        
              </View>
            
            </View>
         
          </View>
      
          <View style={style.horizontal} >
            <Image source={require('../drawables/userlogo.png')} style={style.imagen} />
            <View>
              <View style={style.horizontaltitle} >
              <Text>{lidea.kind__name}: </Text>
              <Text>{lidea.name}</Text>
              </View>
              <View style={style.horizontalcall} >
                <Pressable 
                onPress={() => Linking.openURL('tel:+52'+lidea.phone)}
                style={style.horizontalcall}>
                  <Image source={require('../drawables/call.png')} style={style.logo} />
                  <Text>{lidea.phone} </Text>  
                </Pressable>
                <Pressable
                onPress={() => Linking.openURL('whatsapp://send?text=hola&phone=+52'+lidea.whatsapp)}
                style={style.horizontalcall}>
                  <Image source={require('../drawables/whats.png')} style={style.logo} />
                  <Text>{lidea.whatsapp}</Text>
                </Pressable>
        
              </View>
            
            </View>
         
          </View>
      
          <View style={style.horizontal} >
            <Image source={require('../drawables/userlogo.png')} style={style.imagen} />
            <View>
              <View style={style.horizontaltitle} >
              <Text>{lidef.kind__name}: </Text>
              <Text>{lidef.name}</Text>
              </View>
              <View style={style.horizontalcall} >
                <Pressable 
                onPress={() => Linking.openURL('tel:+52'+lidef.phone)}
                style={style.horizontalcall}>
                  <Image source={require('../drawables/call.png')} style={style.logo} />
                  <Text>{lidef.phone} </Text>  
                </Pressable>
                <Pressable 
                onPress={() => Linking.openURL('whatsapp://send?text=hola&phone=+52'+lidef.whatsapp)}
                style={style.horizontalcall}>
                  <Image source={require('../drawables/whats.png')} style={style.logo} />
                  <Text>{lidef.whatsapp}</Text>
                </Pressable>
        
              </View>
            
            </View>
         
          </View>
            <View style={style.horizontal} >
            <Image source={require('../drawables/userlogo.png')} style={style.imagen} />
            <View>
              <View style={style.horizontaltitle} >
              <Text>{lidef2.kind__name}: </Text>
              <Text>{lidef2.name}</Text>
              </View>
              <View style={style.horizontalcall} >
                <Pressable 
                onPress={() => Linking.openURL('tel:+52'+lidef2.phone)}
                style={style.horizontalcall}>
                  <Image source={require('../drawables/call.png')} style={style.logo} />
                  <Text>{lidef2.phone} </Text>  
                </Pressable>
                <Pressable 
                onPress={() => Linking.openURL('whatsapp://send?text=hola&phone=+52'+lidef2.whatsapp)}
                style={style.horizontalcall}>
                  <Image source={require('../drawables/whats.png')} style={style.logo} />
                  <Text>{lidef2.whatsapp}</Text>
                </Pressable>
        
              </View>
            
            </View>
         
          </View>
      

      
        

        </View>

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