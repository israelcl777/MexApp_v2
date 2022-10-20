import React, { useEffect,useState } from 'react'
import { Alert } from 'react-native';
import { View,Text ,StyleSheet,Image,Linking,ScrollView} from 'react-native';
import Api from'../api/intranet'
import Maps from '../componets/maps';
import ConfirmatedImage from '../componets/conformadImage';
import CPicked from '../modals/confirmarcarga';
import Cdelivery from '../modals/confirmardescarga'
import { Pressable,Modal } from 'react-native';
import Confirmated from '../modals/confirmacion';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


/*/ 
               /*/


function TravelsScreen (props){
    const navigation = useNavigation();
    const [isload,setIsload]= useState(1)
    const [travel_current,set_travel_current]=useState([])
    const [points,setpoints]=useState([])
    const [origen,setOrigen]=useState('')
    const [waypoint, setWaypoint]=useState([])
    const [destino,setdestino]=useState('')
    const [modalVpicked, setMpicked] = useState(false);
    const [modaldelivery, setMdeliveri] = useState(false);
    const [modalconfirmated, setConfimated] = useState(false);
    const [isOffline, setIsoffline]=useState('')
    const [solicitudcolor,setSolicitudcolor]= useState('#ffffffcc')
    const [cargacolor,setCargacolor]= useState('#ffffffcc')
    const [descargacolor,setDescargacolor]= useState('#ffffffcc')



    useEffect(() => {
        const interval = setInterval(() => {
            gettravel()
          }, 3000);
          return () =>{
            clearInterval(interval);
            set_travel_current([])
          } 
    }, [])

    const getCP=()=>{
        navigation.navigate('pdf',{sol:travel_current.id})
      }
 
    async function gettravel(){
        id_operador =global.id_operador
        try {

            const travel=await Api.getCurrentravel(id_operador)
            
           
            var currenttravel=travel[0]
            storeData(currenttravel)
            setIsoffline('')

            global.vehicle_id=currenttravel.vehicle_id
            global.origen=currenttravel.origin
            global.destino=currenttravel.destiny
            global.solicitud= currenttravel.id
            if(currenttravel.travel_confirmed==false){
                setConfimated(true)
            }
        
            set_travel_current(currenttravel)
            
            setOrigen(currenttravel.origin)

            if(currenttravel.travel_confirmed=true&&currenttravel.pickup_confirmed==false&&currenttravel.delivery_confirmed==false){
                setSolicitudcolor('#ffffffcc')
                setCargacolor('#9b9b9bcc')
                setDescargacolor('#9b9b9bcc')
            }else if(currenttravel.travel_confirmed=true&&currenttravel.pickup_confirmed==true&&currenttravel.delivery_confirmed==false){
                setSolicitudcolor('#ffffffcc')
                setCargacolor('#ffffffcc')
                setDescargacolor('#9b9b9bcc') 
            }else if(currenttravel.travel_confirmed=true&&currenttravel.pickup_confirmed==true&&currenttravel.delivery_confirmed==true){
                setSolicitudcolor('#ffffffcc')
                setCargacolor('#ffffffcc')
                setDescargacolor('#ffffffcc')
            }
            setIsload(0)

        } catch (error) {
            dataOffline()
        }
    }
    const storeData = async (value) => {
        try {
           
          const jsonValue = JSON.stringify(value)
          await AsyncStorage.setItem('@travelCurrent_storage', jsonValue)
          
        } catch (e) {
          console.log(e)
        }
      }
      const dataOffline = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@travelCurrent_storage')
          if(jsonValue != null){
            var convert=JSON.parse(jsonValue)
            set_travel_current(convert)
            //console.log(travel_current.id)
            setIsoffline('no hay conexion a internet')
            setIsload(0)

          }
         
         
          
        } catch(e) {
            
            setIsload(0)
         console.log(e)
        }
      }

    if(isload==1){
        return(
            <View>
                <Text>...</Text>

            </View>
        )

    }
    else{
        return(
            <View style={{flex:1}}>
                <Text>{isOffline}</Text>
                <Modal
                animationType="slide"
                transparent={true}
                visible={modalVpicked}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVpicked);
               }}>
                <CPicked solicitud= {travel_current.id} modalVisible={modalVpicked}  setModalVisible={setMpicked}/>
                </Modal>
                <Modal
                animationType="slide"
                transparent={true}
                visible={modalconfirmated}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalconfirmated);
               }}>
                <Confirmated solicitud= {travel_current.id} modalVisible={modalconfirmated} setModalVisible={setConfimated}/>
                </Modal>

                <Modal
                animationType="slide"
                transparent={true}
                visible={modaldelivery}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modaldelivery);
               }}>
                <Cdelivery solicitud= {travel_current.id} modalVisible={modaldelivery} setModalVisible={setMdeliveri}/>
                </Modal>
            
                <Maps  
                lto={travel_current.lat_origin} 
                lno={travel_current.lon_origin}
                ltd={travel_current.lat_destiny}
                lnd={travel_current.lon_destiny}
                origen={origen}
                destino={travel_current.destiny}
                solicitud={travel_current.id}
                points={travel_current.waypoints_origin}/>
               
    
                <ScrollView style={{margin:4}}>
             
                        <Text style={style.textbutton}> {travel_current.agreement}</Text>
                       
                        <View  style={[style.horizontal,{backgroundColor:solicitudcolor}]}>
                           <Text  style={style.text1}>Shipment: </Text>
                           <Text  style={style.text}>{travel_current.shipment} </Text>
                           <Text  style={style.text1}>Unidad: </Text>
                           <Text  style={style.text}>{global.alias}  </Text>
    
                        </View>
                        <View  visible={false} style={[style.horizontal,{backgroundColor:solicitudcolor}]}>
                           <Text  style={style.text1}>Carta Porte: </Text>
                           <Text  style={style.text}>{travel_current.pro_number} </Text>
                           <Text  style={style.text1}>Remolque: </Text>
                           <Text  style={style.text}>{global.alias}  </Text>
                        </View>
                        <View  style={[style.horizontal,{backgroundColor:solicitudcolor}]}>
                           <Text  style={style.text1}>Cliente: </Text>
                           <Text  style={style.text}>{travel_current.client} </Text>
                           <Text  style={style.text1}>Solicitud: </Text>
                           <Text  style={style.text}>{travel_current.id}  </Text>   
                        </View>
    
    
                        <Text style={style.textbutton}> Asignacion de solicitud</Text>
                        <Pressable  style={[style.button,{backgroundColor:solicitudcolor}]}>
                            <Text>Confirmacion de solicitud</Text>
                            <ConfirmatedImage confirmated={travel_current.travel_confirmed} />
                        </Pressable>
                        <View  style={[style.horizontal,{backgroundColor:solicitudcolor}]}>
                            <Text>Direccion origen:  </Text>
                            <Text>{travel_current.origin_address}</Text>
    
                        </View>
                        <Text style={style.textbutton}>Llegada origen: {origen}</Text>
                        <Pressable 
                        onPress={getCP}
                         style={[style.button,{backgroundColor:cargacolor}]
                    }>
                            <Text>VER Carta Porte</Text>
                            <Image source={require('../drawables/pdfattt.png')} style={style.logotel} />
                        </Pressable>
                        <Pressable 
                        onPress={() => setMpicked(true)}
                        style={[style.button,{backgroundColor:cargacolor}]}>
                            <Text>confirmar carga  </Text>
                            <ConfirmatedImage confirmated={travel_current.pickup_confirmed} />
    
    
                        </Pressable>
                        <View  style={[style.horizontal,{backgroundColor:cargacolor}]}>
                            <Text>Direccion Destino:  </Text>
                            <Text>{travel_current.destiny_address}</Text>
                        </View>
                        <Text style={style.textbutton}>Llegada Destino{travel_current.destiny} </Text>
                        <Pressable
                        onPress={() => setMdeliveri(true)}  
                        style={[style.button,{backgroundColor:cargacolor}]}>
                            <Text>confirmar Descarga  </Text>
                            <ConfirmatedImage confirmated={travel_current.delivery_confirmed} />
                        </Pressable>
                        <Text style={style.textbutton}>Salida Destino</Text>
                        <Pressable  style={[style.button,{backgroundColor:descargacolor}]}
                         onPress={() => Linking.openURL('tel:+52'+global.phone)}>
                            <Text>Llamar lider de flota  </Text>
                            <Image source={require('../drawables/call.png')} style={style.logotel} />
    
    
                        </Pressable>
                   
    
                </ScrollView>

            </View>
    
        )

    }

 
/*/ /*/

   
    

};

const style=StyleSheet.create({
    logo:{
        width:65,
        height:85,
        resizeMode:'contain',
    },
    logotel:{
        width:35,
        height:35,
        resizeMode:'contain',
    },
    title:{
        color:'center',
        alignItems: 'center',
        justifyContent: 'center',
        

    },
    button: {
        flexDirection:'row',
        alignItems: 'center',
        borderRadius: 360,
        elevation:6,
        backgroundColor:'#fff',
        justifyContent: 'center',
        margin:5,      
    
      },
      name:{
          marginLeft:10,

      },
      menutext:{
          marginLeft:10,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop:10,

      },
      
      textbutton:{
        flex:1,
        fontSize: 14,
    lineHeight: 21,
    fontWeight: 'bold',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: 0.25,
    backgroundColor:'#cca028',
    color: '#ffffff',

    },
    menuicon:{
        width:40,
        height:40,
        margin: 5,
        resizeMode:'contain',
    },
   
  
    horizontal:{
       width:'100%',
        backgroundColor:'#ffffffcc',
        flexDirection:'row',
        paddingVertical: 10,
        borderRadius: 4,
        elevation: 3,
     

    },
    menuitems:{
       
        backgroundColor:'#ffffffcc',
        flexDirection:'row',
        margin:5,
    },
    vertical:{
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,

    },
    text:{
        width:"25%"
    },
    text1:{
        width:"25%",
        fontWeight: 'bold',

    }
    
  
  })
export default TravelsScreen;