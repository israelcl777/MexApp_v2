import React, { useEffect,useState } from 'react'
import { View,Text,Button,Alert} from 'react-native';
import Liqdetlist from '../containers/liqdetlist';
import Api from'../api/tms'
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

            const conceptos=await Api.getliqdet(context.id)
        
            let d=conceptos.deposits
            let g=conceptos.outgoings
            let cd=conceptos.charges_deductions
            let p= conceptos.perceptions
             setDepositos(d)
             setPercepciones(p)
             setdeducciones(cd)     
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