import React, { useEffect,useState } from 'react'
import { View,Text,Button,Linking} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf'
import RNFetchBlob from 'rn-fetch-blob'
import Api from'../api/tms'
import { useNavigation } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LiqdeailList from '../containers/liqdetlist'

function LiqdetailsScreen (props){
  const navigation = useNavigation();

    const Tab = createMaterialTopTabNavigator();
    const context=props.route.params.items
    const [gastos,setGastos]= useState([])
    const [depositos,setDepositos]= useState([])
    const [percepciones,setPercepciones]= useState([])
    const [deducciones, setdeducciones]= useState([])
    useEffect(() => {
       getconceptos()
    }, [])

    async function createPDF(){
      const fecha = new Date();
      var depositos_cells=create_cell(depositos)
      var deducciones_cells=create_cell(deducciones)
      var gastos_cells=create_cell(gastos)
      var perceps_cells=create_cell(percepciones)
   
      var doc='<!DOCTYPE html><html><head><style>table{ border-collapse: collapse; width: 100%;  border: 2px solid black;}th, td {text-align: left;padding: 8px;  border: 1px solid black;}tr:nth-child(even) {background-color: #D6EEEE;}.headers{background-color: burlywood;color: ghostwhite;}</style></head><body> '
      var header_table=' <table class="default"><tr  class="headers"><td>No Liquidación: '+context.id+ '</td><td>Fecha: '+context.time+'</td><td>Importe: '+context.total_balance+'</td></tr><tr  class="headers"><td>Preliquidacion: '+context.preliquidation_id+ '</td><td>del: '+context.from_time+'</td><td>Al: '+context.to_time+'</td></tr></table>'
      var table_percepciones='<p>Percepciones</p> <table class="default"><tr class="headers"> <td>Fecha</td><td>Tipo </td> <td>Subtipo</td> <td>Importe </td> <td>comentario </td></tr>'+perceps_cells+'</table>'
      var table_gastos='<p>Gastos</p> <table class="default"><tr class="headers"> <td>Fecha</td><td>Tipo </td> <td>Subtipo </td> <td>Importe </td> <td>comentario </td></tr>'+gastos_cells+'</table>'
      var table_depositos='<p>Depositos</p><table class="default"> <tr class="headers"> <td>Fecha</td><td>Tipo </td> <td>Subtipo </td> <td>Importe </td> <td>comentario </td></tr>'+depositos_cells+'</table>'
      var table_cargo='<p>Cargos y deducciones</p> <table class="default"><tr class="headers"> <td>Fecha</td><td>Tipo </td> <td>Subtipo </td> <td>Importe </td> <td>comentario </td></tr>'+deducciones_cells+'</table>'
      var html=doc+'<div>'+ header_table+ table_depositos+ table_percepciones+table_gastos+table_cargo+'</div></body></html>'
   console.log(html)
   let dirs = RNFetchBlob.fs.dirs
 
      let options = {
          html: html,
          fileName: ''+context.id,
          directory: 'Documents',
        };
  
        let file = await RNHTMLtoPDF.convert(options)
        console.log(file.filePath) 
        navigation.navigate('liqpdf',{ url:file.filePath})
       // const android = RNFetchBlob.android;
      // android.actionViewIntent(file.filePath.toString(), 'application/pdf');
     
  }
  const create_cell=(array)=>{
    var cadena=[]
   
      if(array.length>=0){

        
        for(var i=0;i<=array.length;i++){
          console.log(array)
          try {
            var celda='<tr><td>'+array[i].liquidated_on+'</td>'+'<td>'+array[i].type+'</td>'+'<td>'+array[i].subtype+'</td>'+'<td>'+array[i].type+'</td>'+'<td>'+array[i].comment+'</td></tr>'
            cadena.push(celda)
            
          } catch (error) {
            cadena.push('')
            
          }
        }
       var result=cadena.toString().replace(',','')
     
       console.log(cadena)
        return result
    


      }else{
        return ''
      }
      


  }

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
            // createPDF()

         
 
        } catch (error) {
            console.log(error)
        }
      

    }

    
   
    return(
      <View style={{ flex: 1,
        width:'100%',
        height:'100%'
        }}>
          
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
      <View>
      <Button
        title="abrir pdf"
        
        onPress={createPDF}
      />
      </View>
      </View>
    )
};
export default LiqdetailsScreen;