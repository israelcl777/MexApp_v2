import React, { useEffect } from 'react'
import { View, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


function Cerrar(props) {
    
    useEffect(() => {
      borrar_datos()
 
    }, [])
    const borrar_datos=()=>{
      props.context.setLogget(0)
       global.token=false
       global.id_operador = "";
       global.nombre = ""; 
       global.alias="";
       global.id_unidad = "";
       global.currentnumber="";
       global.celular= "";
       

    }
    const removedata = async (key) => {
      try {
          await AsyncStorage.removeItem(key);
          return true;
      }
      catch(exception) {
          return false;
      }
  }


    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>espere un momento..{props.is_logged}</Text>
        
        </View>
      );

}
export default Cerrar