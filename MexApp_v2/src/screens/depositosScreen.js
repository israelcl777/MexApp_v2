import React, { useEffect,useState } from 'react'
import { View,Text,Button,Alert} from 'react-native';
import Depositoslist from '../containers/depositoslist';
import Api from'../api/tms'




function DepositosScreen (){
    const [items, setItems] = useState([]);


    useEffect(() => {
        gettravel()
       
    }, [])

    async function gettravel(){
        id_operador =global.id_operador
        fromtime='2023-02-01T06:00:00.000Z'
        totime='2023-02-17T05:59:00.000Z'
        try {

            const getdepositos=await Api.getdepositos(2,fromtime,totime)
          let convert=getdepositos.filter(getdepositos=> getdepositos.is_consolidated_row==false )

           
            console.log(convert)
          
           setItems(convert)
 
        } catch (error) {
            console.log(error)
        }
      

    }

    
   
    return(
     <Depositoslist depositos={items}/>
    )
};
export default DepositosScreen;