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
        const fecha = new Date();
        let dia= ('0'+ fecha.getUTCDate()).slice(-2)
        let mesAn= ('0'+fecha.getUTCMonth()).slice(-2)
        let mes= ('0'+(fecha.getUTCMonth()+1)).slice(-2)
        let year= fecha.getUTCFullYear()
        let hour=  ('0'+ fecha.getUTCHours()).slice(-2)
       
     
      
        var fromtime=year+'-'+(mesAn)+'-'+dia+'T'+hour+':00:00.000Z'
        var totime=year+'-'+(mes)+'-'+dia+'T'+hour+':00:00.000Z'
        console.log(fromtime)

        try {

            const liquidaciones=await TmsAPI.getliquidations(2,fromtime,totime)
            console.log(liquidaciones)
          
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