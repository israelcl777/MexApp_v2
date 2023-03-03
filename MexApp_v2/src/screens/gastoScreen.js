import React, { useEffect,useState } from 'react'
import { View,Text,Button,Alert} from 'react-native';
import GastosList from '../containers/gastoslist';
import Api from'../api/tms'
import { useNavigation } from '@react-navigation/native';




function DepositosScreen (){
    const [items, setItems] = useState([]);


    useEffect(() => {
        getGastos()
       
    }, [])

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
           // console.log(getdepositos)
          let convert=getdepositos.filter(getdepositos=> getdepositos.is_consolidated_row==false )
          function cambiarValor(valorABuscar, valorViejo, valorNuevo) {
            convert.forEach(function (elemento) { // recorremos el array
            
               //asignamos el valor del elemento dependiendo del valor a buscar, validamos que el valor sea el mismo y se reemplaza con el nuevo. 
              elemento[valorABuscar] = elemento[valorABuscar] == valorViejo ? valorNuevo : elemento[valorABuscar]
            })
          }
          cambiarValor("status_id", 3, -3)

    
          let a= convert.sort(GetSortOrder("status_id"));
          
          console.log(a)
     
          
           setItems(a)
 
        } catch (error) {
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
     <GastosList  depositos={items}/>
    )
};
export default DepositosScreen;