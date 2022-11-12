import React, { useEffect,useState } from 'react'
import { View,Text,Button,Alert} from 'react-native';
import Liqdetlist from '../containers/liqdetlist';
import Api from'../api/intranet'
import NLoginScreen from '../screens/nloginscreen'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LiqdeailList from '../containers/liqdetlist'




function LiqdetailsScreen (props){
    const Tab = createMaterialTopTabNavigator();
    const context=props.route.params.items
    const [gastos,setGastos]= useState([])
    const [depositos,setDepositos]= useState([])
    const [percepciones,setPercepciones]= useState([])
    const [deducciones, setdeducciones]= useState([])


    useEffect(() => {
       getconceptos()
      
       
    }, [])

    async function getconceptos(){
        id_operador =global.id_operador
        try {

            const conceptos=await Api.getliqdet(context.id_liquidacion)
            var convert=JSON.parse(conceptos)
            let d= convert.filter(d=> d.tipo_registro=='D')
            let g= convert.filter(g=> g.tipo_registro=='G')
            let cd= convert.filter(cd=> cd.tipo_registro=='CD')
            let p= convert.filter(data=> data.tipo_registro=='P')
             setDepositos(d)
             setPercepciones(p)
             setdeducciones(d)
             setGastos(g)

         
 
        } catch (error) {
            console.log(error)
        }
      

    }

    
   
    return(
    <Tab.Navigator 
    screenOptions={{
        tabBarActiveTintColor: '#CBA052',
        tabBarIndicatorStyle:{
          backgroundColor:'#CB333B'

        },
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { 
            backgroundColor: '#ffffffcc',
            height:45, },



      }}>
   
        <Tab.Screen name="Deps." children={()=><LiqdeailList data={depositos}/>} />
        <Tab.Screen name="Percep." children={()=><LiqdeailList data={percepciones}/>} />
        <Tab.Screen name="Gastos" children={()=><LiqdeailList data={gastos}/>} />
        <Tab.Screen name="Cargos" children={()=><LiqdeailList data={deducciones}/>} />
      </Tab.Navigator>
    )
};
export default LiqdetailsScreen;