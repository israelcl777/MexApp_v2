import React ,{ useEffect, useState }from 'react';
import { View,Text,Image, PermissionsAndroid,Pressable,StyleSheet ,Alert,TextInput,Modal} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import Api from'../api/tms'
import AsyncStorage from '@react-native-async-storage/async-storage';
import storageData from '../utils/storageData';
import Reload from '../modals/reload';


function CametaScreen (props){
  
    const [image,setImage]= useState('https://png.pngtree.com/png-clipart/20190611/original/pngtree-vector-camera-logo-png-image_2000391.jpg')
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const [comment,SetComment]=useState('')


    useEffect(() => {

        if (Platform.OS === 'android') {
            permissioncamera();
          } else {
           takephoto()
           console.log('permission ios')
          }

    }, [])

    async function sendevidence(){
      setModalVisible(true)
      try {
      var id=props.route.params.id
      console.log(id)
       const data = {uri:image, type:"image/jpeg", name:'profile.jpg', filename:'afiletest'};
       const formData = new FormData()
       formData.append('file', data)
       var save={
        'id':id,
        'url':image,
        'comment':comment
      }
       const setevidence = await Api.setevidencegasto(formData,id)
       res_status=setevidence.status 
       console.log(res_status)
       if(res_status==200||res_status==202){

       }else{
//Alert.alert("Se enviara cuando tengas conexión")
const insert = await storageData.insertData('@evidenciagasto',save)  

       }
       const setcoment = await Api.setObsgasto(comment,id)
      // console.log(setcoment)
        props.navigation.goBack()
        setModalVisible(false)
        
      } catch (error) {
        setModalVisible(false)
        var id=props.route.params.id
        Alert.alert("Se enviara cuando tengas conexión")
        var save={
          'id':id,
          'url':image,
          'comment':comment
        }
        const insert = await storageData.insertData('@evidenciagasto',save)
        console.log(insert)
        props.navigation.goBack()
        console.log(error)
        
      }

    }


    const takephoto=()=>{
        const options={
            title: 'tomar foto',
            storageOption:{
                skipBackup: true,
                path:'images'
            },
            includeBase64:true
        }

      
            launchCamera(options, response=>{
                if(response.didCancel){
                    navigation.goBack()
                    console.log('cancelar')
                    

                }
                else if(response.errorCode){
                    console.log(response.errorMessage)

                }
                else if(response.assets){
                    const uri= response.assets[0].uri
                    var b64= response.assets[0].base64
           
                    setImage(uri)
                
                }
            })
    }
    const storeData = async (value) => {
      try {
        const jsonValue = JSON.stringify(value)
        await AsyncStorage.setItem('@evidenciagasto', jsonValue)
        console.log("funcione")
      } catch (e) {
        console.log(e)
      }
    }
      
    async function permissioncamera() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'CameraExample App External Storage Write Permission',
              message:
                'CameraExample App needs access to Storage data in your SD Card ',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              
            takephoto()
         //  console.log('permission android')
          } else {
            alert('WRITE_EXTERNAL_STORAGE permission denied');
          }
        } catch (err) {
          console.log(err);
        }
      }
   
    return(
        <View style={{flex:1,width:'100%',height:'100%',backgroundColor:'#000000' }}>
          <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}>
                <Reload/>
                </Modal>

            <Image
            style={{  width:'100%',height: '100%',resizeMode:'contain',alignSelf:'center'}}
            source={{ uri: image}}
            />
              <TextInput
                disabled={true}
                style={style.input}
                label="Comentario"
                placeholder="Comentario"
                value={comment}
                onChangeText={text => SetComment(text)}
                />
               <View style={style.horizontal} >
            <Pressable 
            onPress={takephoto}
            style={style.button}>
                <Text style={style.textbutton}>Reintentar</Text>
            </Pressable>
            <Pressable 
            onPress={sendevidence}
            style={style.button1}>
                <Text style={style.textbutton}>Enviar</Text>
            </Pressable>

            </View>
            
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
      height:30,
      alignContent:'center',
      alignContent:'center',
      justifyContent: 'center',
      backgroundColor:'green',
      margin:5,
      borderRadius:60,marginTop:10,elevation: 5
      

  },
  textbutton:{
        color:'#ffffff',
        textAlign: 'center'
    },
    input: {
      width:300,
      height: 40,
      margin: 12,
      borderWidth: 0.5,
      padding: 10,
      backgroundColor:'#ffffff',
      color:'#000000',
      position: 'absolute',//use absolute position to show button on top of the map
      alignSelf: 'center' ,
      top: '70%'
    },
    horizontal:{
     
        flexDirection:'row',
        alignContent:'center',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',//use absolute position to show button on top of the map
        alignSelf: 'center' ,
        top: '85%'//for align to right
       
     
  
    },
  
  })
export default CametaScreen;