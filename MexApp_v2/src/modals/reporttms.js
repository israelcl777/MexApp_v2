import React ,{ useState }from "react";
import { View,Text,Pressable,TextInput ,Image} from "react-native";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import storageData from '../utils/storageData';
import ModalStyle from '../styles/modalsstyle'
import TMS from '../api/tms'



var images=[]
var arraynames=[]
var arrayurls=[]
function TmsReports(props){

    const [urls,setUrl]=useState()
    const [names,setNames]=useState('No hay imagenes agregadas')
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');

    const close= () =>{
 
        props.setModalVisible(false)

        
    }
    const send_Report= async()=>{
        const formData = new FormData()
        formData.append('notification_type_id',63)
        formData.append('vehicle_id',global.vehicle_id)
        formData.append('driver_id',global.id_operador)
        formData.append('comment',text)
        //formData.append(shipment_id,solicitud)
        formData.append('shipment_id',solicitud)
        if(arrayurls.length>0){
            console.log('agregando imagenes')
            console.log(arrayurls.length)
            for (var i = 0; i < arrayurls.length; i++) {
                var imagen=arrayurls[0]
                const data = {uri:imagen, type:"image/jpeg", name:'profile.jpg', filename:'afiletest'};
                formData.append('', data)
               
             }
        

        }
        console.log(formData)
        console.log(text)
       
        const setNotifications= await TMS.setLogisticsNotifications(formData)
        var res_status=setNotifications.status 
        console.log(res_status)


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
                setCount(count + 1);
                if(response.didCancel){
                   
                    console.log('cancelar')
                    

                }
                else if(response.errorCode){
                    console.log(response.errorMessage)

                }
                else if(response.assets){
                  
                    const uri= response.assets[0].uri  
                    const name=response.assets[0].fileName
                    const id = response.assets[0].id
                  
                    var jsonimage={
                        id:count,
                        url:uri,
                        name:name
                    }
                    images.push(jsonimage)
                    arraynames.push(name)
                    arrayurls.push(uri)
                   
                    setUrl(images)
                    var cadenaConSaltos = arraynames.join('\n');
                    setNames(cadenaConSaltos)

                    // Imprimir el resultado
                    console.log(arrayurls);

                 
                  
                   
                
                }
            })
    }

    return(
        <View  style={ModalStyle.content}>
        <View style={ModalStyle.modal}>

            <Text style={ModalStyle.title}>Reporte</Text>
            <Pressable
            onPress={takephoto} 
            style={ModalStyle.horizontal}>
                <Text style={ModalStyle.title}>Agregar imagen </Text>
                <Image
                 style={ModalStyle.icon}
                 source={require('../drawables/attach.png')}
                  />


            </Pressable>
            <Text style={ModalStyle.texto}>{names} </Text>
            <TextInput
                disabled={true}
                style={ModalStyle.input}
                label="text"
                value={text}
                placeholder="Comentario"
                onChangeText={text => setText(text)}
                />
            <View style={ModalStyle.horizontal}>
            <Pressable 
            onPress={close}
            style={ModalStyle.button1}>
                <Text style={ModalStyle.textbutton}>Cerrar</Text>
            </Pressable>
            <Pressable 
            onPress={send_Report}
            style={ModalStyle.button}>
                <Text style={ModalStyle.textbutton}>Enviar</Text>
            </Pressable>
       
            </View>

        </View>

    </View>
     
    );


}
export default TmsReports;