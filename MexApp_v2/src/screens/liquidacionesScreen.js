import React, { useEffect,useState } from 'react'
import LiquidacionesLit from '../containers/liquidacioneslist';
import Api from'../api/intranet'




function LiquidacionesScreen (){
    const [items, setItems] = useState([]);


    useEffect(() => {
        gettravel()
       
    }, [])

    async function gettravel(){
        id_operador =global.id_operador
        try {

            const liquidaciones=await Api.getliquidaciones(id_operador)
            var convert=JSON.parse(liquidaciones)
            setItems(convert)
 
        } catch (error) {
            console.log(error)
        }
      

    }

    
   
    return(
     <LiquidacionesLit liquidaciones={items}/>
    )
};
export default LiquidacionesScreen;