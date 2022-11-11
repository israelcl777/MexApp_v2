import React, { useEffect,useState } from 'react'
import { View,Text,Button,Alert} from 'react-native';
import Depositoslist from '../containers/depositoslist';
import Api from'../api/intranet'




function DepositosScreen (){
    const [items, setItems] = useState([]);


    useEffect(() => {
        gettravel()
       
    }, [])

    async function gettravel(){
        id_operador =global.id_operador
        try {

            const gettravel=await Api.gettravels(id_operador)
            var currenttravel=gettravel
            setItems(currenttravel)
 
        } catch (error) {
            console.log(error)
        }
      

    }

    
   
    return(
     <Depositoslist depositos={items}/>
    )
};
export default DepositosScreen;