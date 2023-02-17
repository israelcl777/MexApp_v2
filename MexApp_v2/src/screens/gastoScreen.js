import React, { useEffect,useState } from 'react'
import { View,Text,Button,Alert} from 'react-native';
import GastosList from '../containers/gastoslist';
import Api from'../api/tms'




function DepositosScreen (){
    const [items, setItems] = useState([]);


    useEffect(() => {
        getGastos()
       
    }, [])

    async function getGastos(){
        id_operador =global.id_operador
        fromtime='2023-02-01T06:00:00.000Z'
        totime='2023-02-17T05:59:00.000Z'
        try {

            const getdepositos=await Api.getgasto(2,fromtime,totime)
          let convert=getdepositos.filter(getdepositos=> getdepositos.is_consolidated_row==false )

           
            console.log(convert)
          
           setItems(convert)
 
        } catch (error) {
            console.log(error)
        }
      

    }

    
   
    return(
     <GastosList depositos={items}/>
    )
};
export default DepositosScreen;