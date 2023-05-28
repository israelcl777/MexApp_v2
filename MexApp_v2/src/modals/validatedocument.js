import React,{useEffect, useState} from "react";
import { View,Pressable,Text } from "react-native";
import ModalStyle from '../styles/modalsstyle'
import tms from '../api/tms';
import InstrucctionList from "../containers/instructionList";
import { convert } from "react-native-html-to-pdf";

function ValidateDocument(props){
    const [data,setData]=useState([])
    const [docs,setDocuments]=useState('')
    useEffect(() => {
        getInst()

    },[])
    const close= () =>{
 
        props.setModalVisible1(false)

        
    }
    const getInst = async () => {
        console.log(props)
        const instrucctions= await tms.getInst(props.solicitud)

        var validate =  instrucctions.status
        if (validate==200|| validate==202){
          const data = await instrucctions.json();
          const inst=data.instructions
         
 
          //let convert=data.filter(data=> data.is_consolidated_row==false )
         let convert=inst.filter(inst=> inst.type.alias=='EVIDENCIA' )
         let documentos=convert[0].description.toString()
         var textoConSaltosDeLinea = documentos.replace(/,/g, '\n\n');
         setDocuments(textoConSaltosDeLinea)
        
         
   
       console.log(docs)
    
        }else{
          console.log('no hay conexion'+ validate)
    
        }

    }

    return(
        <View  style={ModalStyle.content}>
            <View style={ModalStyle.modal}>

                <Text style={ModalStyle.title}>Evidencias</Text>
                <Text style={ModalStyle.texto}>{docs}</Text>

                <View style={ModalStyle.horizontal}>
                <Pressable 
                onPress={close}
                style={ModalStyle.button}>
                    <Text style={ModalStyle.textbutton}>OK</Text>
                </Pressable>
           
                </View>

            </View>

        </View>
    )


}
export default ValidateDocument