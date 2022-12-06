import React , { useEffect, useState }from 'react';
import { Text,ScrollView, View} from 'react-native';
import tms from '../api/tms';
import InstrucctionList from '../containers/instructionList';


function Instrucction (props){
  const context=props.route.params
  console.log(context.id)
  const [items, setItems] = useState([])

  useEffect(() => {
    getInst()


  },[])

  const getInst = async () => {
    const instrucctions= await tms.getInst(context.id)

    var validate =  instrucctions.status
    if (validate==200|| validate==202){
      const data = await instrucctions.json();
      setItems(data.instructions)
      console.log(items)

    }else{
      console.log('no hay conexion'+ validate)

    }
  

  }
 
  return(
  <InstrucctionList data={items}/>

   )

};

 

export default Instrucction;