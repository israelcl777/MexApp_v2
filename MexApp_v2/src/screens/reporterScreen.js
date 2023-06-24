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
    const testdata=[
      {
        "status_id": 1,
        "status": "REPORTADO",
        "report_type_id": 1,
        "report_type": "CABINA E INTERIORES",
        "number": null,
        "driver_id": 10,
        "driver": "HUMBERTO RODRIGUEZ MARTINEZ",
        "vehicle_id": 44,
        "vehicle": "MA0709",
        "cell_id": null,
        "user_id": 1491,
        "user": "IT-ATU-Axell Solis",
        "time": "2023-06-01T23:15:23Z",
        "created_on": "2023-06-15T19:30:55.61Z",
        "updated_on": null,
        "created_by_id": 1491,
        "created_by": "asolis",
        "updated_by_id": null,
        "updated_by": null,
        "latitude": 19.60749,
        "longitude": -99.23696,
        "evidences": null,
        "observations": null,
        "geofence_id": null,
        "geofence": null,
        "address": "",
        "location": null,
        "assigned_by_id": null,
        "assigned_by": null,
        "assigned_on": null,
        "attended_by_id": null,
        "attended_by": null,
        "attended_on": null,
        "validated_by_id": null,
        "validated_by": null,
        "validated_on": null,
        "ot": null,
        "validated_success": null,
        "shippment_id": null,
        "id": 56,
        "is_consolidated_row": false,
        "total_rows": 0,
        "row_color": "transparent"
      },
      {
        "status_id": 1,
        "status": "REPORTADO",
        "report_type_id": 1,
        "report_type": "CABINA E INTERIORES",
        "number": null,
        "driver_id": 10,
        "driver": "HUMBERTO RODRIGUEZ MARTINEZ",
        "vehicle_id": 44,
        "vehicle": "MA0709",
        "cell_id": null,
        "user_id": 1491,
        "user": "IT-ATU-Axell Solis",
        "time": "2023-06-01T23:15:23Z",
        "created_on": "2023-06-15T19:31:04.973Z",
        "updated_on": null,
        "created_by_id": 1491,
        "created_by": "asolis",
        "updated_by_id": null,
        "updated_by": null,
        "latitude": 19.60749,
        "longitude": -99.23696,
        "evidences": null,
        "observations": null,
        "geofence_id": null,
        "geofence": null,
        "address": "",
        "location": null,
        "assigned_by_id": null,
        "assigned_by": null,
        "assigned_on": null,
        "attended_by_id": null,
        "attended_by": null,
        "attended_on": null,
        "validated_by_id": null,
        "validated_by": null,
        "validated_on": null,
        "ot": null,
        "validated_success": null,
        "shippment_id": null,
        "id": 57,
        "is_consolidated_row": false,
        "total_rows": 0,
        "row_color": "transparent"
      },
      {
        "status_id": 1,
        "status": "REPORTADO",
        "report_type_id": 1,
        "report_type": "CABINA E INTERIORES",
        "number": null,
        "driver_id": 10,
        "driver": "HUMBERTO RODRIGUEZ MARTINEZ",
        "vehicle_id": 44,
        "vehicle": "MA0709",
        "cell_id": null,
        "user_id": 1491,
        "user": "IT-ATU-Axell Solis",
        "time": "2023-06-03T23:15:23Z",
        "created_on": "2023-06-15T19:31:09.067Z",
        "updated_on": null,
        "created_by_id": 1491,
        "created_by": "asolis",
        "updated_by_id": null,
        "updated_by": null,
        "latitude": 19.60749,
        "longitude": -99.23696,
        "evidences": null,
        "observations": null,
        "geofence_id": null,
        "geofence": null,
        "address": "",
        "location": null,
        "assigned_by_id": null,
        "assigned_by": null,
        "assigned_on": null,
        "attended_by_id": null,
        "attended_by": null,
        "attended_on": null,
        "validated_by_id": null,
        "validated_by": null,
        "validated_on": null,
        "ot": null,
        "validated_success": null,
        "shippment_id": null,
        "id": 58,
        "is_consolidated_row": false,
        "total_rows": 0,
        "row_color": "transparent"
      },
      {
        "status_id": 1,
        "status": "REPORTADO",
        "report_type_id": 1,
        "report_type": "CABINA E INTERIORES",
        "number": null,
        "driver_id": 10,
        "driver": "HUMBERTO RODRIGUEZ MARTINEZ",
        "vehicle_id": 44,
        "vehicle": "MA0709",
        "cell_id": null,
        "user_id": 1491,
        "user": "IT-ATU-Axell Solis",
        "time": "2023-06-03T23:15:23Z",
        "created_on": "2023-06-15T19:31:13.773Z",
        "updated_on": null,
        "created_by_id": 1491,
        "created_by": "asolis",
        "updated_by_id": null,
        "updated_by": null,
        "latitude": 19.60749,
        "longitude": -99.23696,
        "evidences": null,
        "observations": null,
        "geofence_id": null,
        "geofence": null,
        "address": "",
        "location": null,
        "assigned_by_id": null,
        "assigned_by": null,
        "assigned_on": null,
        "attended_by_id": null,
        "attended_by": null,
        "attended_on": null,
        "validated_by_id": null,
        "validated_by": null,
        "validated_on": null,
        "ot": null,
        "validated_success": null,
        "shippment_id": null,
        "id": 59,
        "is_consolidated_row": false,
        "total_rows": 0,
        "row_color": "transparent"
      },
      {
        "status_id": 1,
        "status": "REPORTADO",
        "report_type_id": 1,
        "report_type": "CABINA E INTERIORES",
        "number": null,
        "driver_id": 10,
        "driver": "HUMBERTO RODRIGUEZ MARTINEZ",
        "vehicle_id": 44,
        "vehicle": "MA0709",
        "cell_id": null,
        "user_id": 1491,
        "user": "IT-ATU-Axell Solis",
        "time": "2023-06-06T23:15:23Z",
        "created_on": "2023-06-15T19:31:20.247Z",
        "updated_on": null,
        "created_by_id": 1491,
        "created_by": "asolis",
        "updated_by_id": null,
        "updated_by": null,
        "latitude": 19.60749,
        "longitude": -99.23696,
        "evidences": null,
        "observations": null,
        "geofence_id": null,
        "geofence": null,
        "address": "",
        "location": null,
        "assigned_by_id": null,
        "assigned_by": null,
        "assigned_on": null,
        "attended_by_id": null,
        "attended_by": null,
        "attended_on": null,
        "validated_by_id": null,
        "validated_by": null,
        "validated_on": null,
        "ot": null,
        "validated_success": null,
        "shippment_id": null,
        "id": 60,
        "is_consolidated_row": false,
        "total_rows": 0,
        "row_color": "transparent"
      },
      {
        "status_id": 1,
        "status": "REPORTADO",
        "report_type_id": 1,
        "report_type": "CABINA E INTERIORES",
        "number": null,
        "driver_id": 10,
        "driver": "HUMBERTO RODRIGUEZ MARTINEZ",
        "vehicle_id": 44,
        "vehicle": "MA0709",
        "cell_id": null,
        "user_id": 1491,
        "user": "IT-ATU-Axell Solis",
        "time": "2023-06-08T23:15:23Z",
        "created_on": "2023-06-15T19:31:25.7Z",
        "updated_on": null,
        "created_by_id": 1491,
        "created_by": "asolis",
        "updated_by_id": null,
        "updated_by": null,
        "latitude": 19.60749,
        "longitude": -99.23696,
        "evidences": null,
        "observations": null,
        "geofence_id": null,
        "geofence": null,
        "address": "",
        "location": null,
        "assigned_by_id": null,
        "assigned_by": null,
        "assigned_on": null,
        "attended_by_id": null,
        "attended_by": null,
        "attended_on": null,
        "validated_by_id": null,
        "validated_by": null,
        "validated_on": null,
        "ot": null,
        "validated_success": null,
        "shippment_id": null,
        "id": 61,
        "is_consolidated_row": false,
        "total_rows": 0,
        "row_color": "transparent"
      },
      {
        "status_id": 1,
        "status": "REPORTADO",
        "report_type_id": 1,
        "report_type": "CABINA E INTERIORES",
        "number": null,
        "driver_id": 10,
        "driver": "HUMBERTO RODRIGUEZ MARTINEZ",
        "vehicle_id": 44,
        "vehicle": "MA0709",
        "cell_id": null,
        "user_id": 1491,
        "user": "IT-ATU-Axell Solis",
        "time": "2023-06-08T23:15:23Z",
        "created_on": "2023-06-19T16:00:13.267Z",
        "updated_on": null,
        "created_by_id": 1491,
        "created_by": "asolis",
        "updated_by_id": null,
        "updated_by": null,
        "latitude": 19.60749,
        "longitude": -99.23696,
        "evidences": null,
        "observations": null,
        "geofence_id": null,
        "geofence": null,
        "address": "",
        "location": null,
        "assigned_by_id": null,
        "assigned_by": null,
        "assigned_on": null,
        "attended_by_id": null,
        "attended_by": null,
        "attended_on": null,
        "validated_by_id": null,
        "validated_by": null,
        "validated_on": null,
        "ot": null,
        "validated_success": null,
        "shippment_id": null,
        "id": 94,
        "is_consolidated_row": false,
        "total_rows": 0,
        "row_color": "transparent"
      },
      {
        "status_id": 1,
        "status": "REPORTADO",
        "report_type_id": 1,
        "report_type": "CABINA E INTERIORES",
        "number": null,
        "driver_id": 10,
        "driver": "HUMBERTO RODRIGUEZ MARTINEZ",
        "vehicle_id": 44,
        "vehicle": "MA0709",
        "cell_id": null,
        "user_id": 1491,
        "user": "IT-ATU-Axell Solis",
        "time": "2023-06-08T23:15:23Z",
        "created_on": "2023-06-19T16:02:02.81Z",
        "updated_on": null,
        "created_by_id": 1491,
        "created_by": "asolis",
        "updated_by_id": null,
        "updated_by": null,
        "latitude": 19.60749,
        "longitude": -99.23696,
        "evidences": null,
        "observations": null,
        "geofence_id": null,
        "geofence": null,
        "address": "",
        "location": null,
        "assigned_by_id": null,
        "assigned_by": null,
        "assigned_on": null,
        "attended_by_id": null,
        "attended_by": null,
        "attended_on": null,
        "validated_by_id": null,
        "validated_by": null,
        "validated_on": null,
        "ot": null,
        "validated_success": null,
        "shippment_id": null,
        "id": 95,
        "is_consolidated_row": false,
        "total_rows": 0,
        "row_color": "transparent"
      },
      {
        "status_id": 1,
        "status": "REPORTADO",
        "report_type_id": 1,
        "report_type": "CABINA E INTERIORES",
        "number": null,
        "driver_id": 10,
        "driver": "HUMBERTO RODRIGUEZ MARTINEZ",
        "vehicle_id": 44,
        "vehicle": "MA0709",
        "cell_id": null,
        "user_id": 1491,
        "user": "IT-ATU-Axell Solis",
        "time": "2023-06-08T23:15:23Z",
        "created_on": "2023-06-19T16:05:30.657Z",
        "updated_on": null,
        "created_by_id": 1491,
        "created_by": "asolis",
        "updated_by_id": null,
        "updated_by": null,
        "latitude": 19.60749,
        "longitude": -99.23696,
        "evidences": null,
        "observations": null,
        "geofence_id": null,
        "geofence": null,
        "address": "",
        "location": null,
        "assigned_by_id": null,
        "assigned_by": null,
        "assigned_on": null,
        "attended_by_id": null,
        "attended_by": null,
        "attended_on": null,
        "validated_by_id": null,
        "validated_by": null,
        "validated_on": null,
        "ot": null,
        "validated_success": null,
        "shippment_id": null,
        "id": 96,
        "is_consolidated_row": false,
        "total_rows": 0,
        "row_color": "green"
      },
      {
        "status_id": 1,
        "status": "REPORTADO",
        "report_type_id": 1,
        "report_type": "CABINA E INTERIORES",
        "number": null,
        "driver_id": 10,
        "driver": "HUMBERTO RODRIGUEZ MARTINEZ",
        "vehicle_id": 44,
        "vehicle": "MA0709",
        "cell_id": null,
        "user_id": 1491,
        "user": "IT-ATU-Axell Solis",
        "time": "2023-06-08T23:15:23Z",
        "created_on": "2023-06-19T16:05:54.54Z",
        "updated_on": null,
        "created_by_id": 1491,
        "created_by": "asolis",
        "updated_by_id": null,
        "updated_by": null,
        "latitude": 19.60749,
        "longitude": -99.23696,
        "evidences": null,
        "observations": null,
        "geofence_id": null,
        "geofence": null,
        "address": "",
        "location": null,
        "assigned_by_id": null,
        "assigned_by": null,
        "assigned_on": null,
        "attended_by_id": null,
        "attended_by": null,
        "attended_on": null,
        "validated_by_id": null,
        "validated_by": null,
        "validated_on": null,
        "ot": null,
        "validated_success": null,
        "shippment_id": null,
        "id": 97,
        "is_consolidated_row": false,
        "total_rows": 0,
        "row_color": "transparent"
      }]



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
            <Modal
                animationType="slide"
                transparent={true}
                visible={helpmodal1}>
                <Maintenance setHelpmodal1={setHelpmodal1}/>
            </Modal>
        <ReporterList data={testdata}/>
        <View style={style.horizontal} >
            <Pressable onPress={openmodal}>
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
      top: '90%'//for align to right
     
   

  },

})
export default ReporterScreen;