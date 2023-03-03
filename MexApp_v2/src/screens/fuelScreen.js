import React , { useEffect, useState }from 'react';
import { Text,ScrollView, View} from 'react-native';
import tms from '../api/tms';
import FuelList from '../containers/fuelsList'

function FuelScreen (props){
 
  const [items, setItems] = useState([])

  useEffect(() => {
    getfuels()


  },[])

  const getfuels = async () => {
    const fuels= await tms.getfuel(global.id_operador)
    var validate =  fuels.status
    if (validate==200|| validate==20|| validate==206){
      const data = await fuels.json();
      let convert=data.filter(data=> data.is_consolidated_row==false )
      setItems(convert)
    }else{
      console.log('no hay conexion'+ validate)
    }
  }
 
  return(
  <FuelList items={items}/>

   )

};

 

export default FuelScreen;