import React, { useEffect,useState } from 'react'
import { View,Image,Pressable,Modal, ScrollView,RefreshControl,StyleSheet} from 'react-native';
import ReporterList from '../containers/rerporterList';
import Api from'../api/tms'
import moment from 'moment/moment';
import { useNavigation } from '@react-navigation/native';
import storageData from '../utils/storageData';
import Maintenance from '../modals/maintenance';




function ReporterScreen (){
    const [items, setItems] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);
    const [helpmodal1,setHelpmodal1]=useState(false)



    useEffect(() => {
      //getData()
       
    }, [])

    const openmodal=()=>{
      setHelpmodal1(true)
    }
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
      getGastos()
        wait(2000).then(() => setRefreshing(false));
      }, []);

      const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }

    async function getData(){
      var inicio=moment().add(6,'h').format('YYYY-MM-DDTHH:MM')
      var fin=moment().subtract(100, 'd').format('YYYY-MM-DDTHH:MM')
      var fromtime=fin+':00.000Z'
      var totime=inicio+':00.000Z'
        try {

            const getdepositos=await Api.getgasto(id_operador,fromtime,totime)
          //  console.log(getdepositos)
         
          let convert=getdepositos.filter(getdepositos=> getdepositos.is_consolidated_row==false )
          function cambiarValor(valorABuscar, valorViejo, valorNuevo) {
            convert.forEach(function (elemento) { // recorremos el array     
               //asignamos el valor del elemento dependiendo del valor a buscar, validamos que el valor sea el mismo y se reemplaza con el nuevo. 
              elemento[valorABuscar] = elemento[valorABuscar] == valorViejo ? valorNuevo : elemento[valorABuscar]
            })
          }
          cambiarValor("status_id", 3, -3)
          let a= convert.sort(GetSortOrder("status_id"));
          setItems(a)
           const save = await storageData.insertData('@gasto',a)
        
 
        } catch (error) {
           const save = await storageData.consultData('@gasto')
           if(save != null){
            var convert=JSON.parse(save)
            setItems(convert)

           }
            console.log(error)
        }
    
    }
  

    function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}  
   
    return(
      <View style={{width:'100%',height:'100%' }}>
        <ReporterList items={items}/>
        <View style={style.horizontal} >
            <Pressable onPress={opencamera}>
                <Image style={{width:50,height:50,margin:10}} source={require('../drawables/camera.png')}/>
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
      top: '70%'//for align to right
     
   

  },

})
export default ReporterScreen;