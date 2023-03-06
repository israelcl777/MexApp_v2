import React, { useEffect,useState } from 'react'
import { View,Text,Button,Alert, ScrollView,RefreshControl} from 'react-native';
import GastosList from '../containers/gastoslist';
import Api from'../api/tms'
import { useNavigation } from '@react-navigation/native';
import storageData from '../utils/storageData';




function DepositosScreen (){
    const [items, setItems] = useState([]);
    const [refreshing, setRefreshing] = React.useState(false);


    useEffect(() => {
        getGastos()
       
    }, [])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
      getGastos()
        wait(2000).then(() => setRefreshing(false));
      }, []);

      const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
      }

    async function getGastos(){
        id_operador =global.id_operador
        const fecha = new Date();
        let dia= ('0'+ fecha.getUTCDate()).slice(-2)
        let mesAn= ('0'+fecha.getUTCMonth()).slice(-2)
        let mes= ('0'+(fecha.getUTCMonth()+1)).slice(-2)
        let year= fecha.getUTCFullYear()
        let hour=  ('0'+ fecha.getUTCHours()).slice(-2)
        var fromtime=year+'-'+(mesAn)+'-'+dia+'T'+hour+':00:00.000Z'
        var totime=year+'-'+(mes)+'-'+dia+'T'+hour+':00:00.000Z'
        try {

            const getdepositos=await Api.getgasto(id_operador,fromtime,totime)
            console.log(getdepositos)
         
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
        <ScrollView 
        
        style={{flex:1, width:'100%',height:'100%'}}
        refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
            <GastosList  depositos={items}/>
     </ScrollView>
    )
};
export default DepositosScreen;