import React, { useState } from "react";
import { View ,Text,TouchableOpacity} from "react-native";
import Styles from '../styles/styles'



function Reporter(props){


    const local=(fecha)=> {
        if (fecha==null){
          return ''
    
        }else{
          try {
            var date= new Date(fecha)
            var year=date.getFullYear()
            var month=date.getMonth()+1
            var day=date.getDate()
            var  hora=date.getHours()
            var minute=date.getMinutes()
            var f= day+'-'+month+'-'+year+' '+hora+':'+minute
     
            return f
         
            
          } catch (error) {
            console.log(error)
            return ''
            
          }
    
        }
    
       }

    return(
        <TouchableOpacity style={Styles.contencard}>
             <Text style={{color:props.row_color, textAlign:'right',marginTop:10}}>{props.status} </Text>
            <View  style={Styles.horizontal}>
                <Text style={Styles.titletext}>FOLIO: {props.id}</Text>
                <Text style={Styles.titletext}>Creado el: </Text>
                <Text style={Styles.simpletext}>{local(props.created_on)} </Text>
            </View>
            <View  style={Styles.horizontal}>
            <Text style={Styles.titletext}>Solicitud:</Text>
            <Text style={Styles.simpletext}>{props.number}:</Text>
            <Text style={Styles.titletext}>Unidad:</Text>
            <Text style={Styles.simpletext}>{props.vehicle}:</Text>


            </View>
          
           
        </TouchableOpacity>
    )



}

export default Reporter;
