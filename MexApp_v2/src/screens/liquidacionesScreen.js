import React, { useEffect,useState } from 'react'
import LiquidacionesLit from '../containers/liquidacioneslist';
import Api from'../api/intranet'
import TmsAPI from '../api/tms'




function LiquidacionesScreen (){
    const [items, setItems] = useState([]);


    useEffect(() => {
        getLiq()
       
    }, [])

    async function getLiq(){
        id_operador =global.id_operador
        fromtime='2023-02-01T06:00:00.000Z'
        totime='2023-02-08T05:59:00.000Z'
        try {

            const liquidaciones=await TmsAPI.getliquidations(id_operador,fromtime,totime)
          
            setItems(liquidaciones)
 
        } catch (error) {
            console.log(error)
        }
      
    }

    
   
    return(
     <LiquidacionesLit liquidaciones={items}/>
    )
};
export default LiquidacionesScreen;