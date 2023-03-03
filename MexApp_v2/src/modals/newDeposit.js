import React, { useState } from 'react';
import { View,Text,StyleSheet,Image, Pressable,TextInput} from 'react-native';
import Styles from '../styles'
import { SelectList } from 'react-native-dropdown-select-list'


function Reload (props){
    const [total,setTotal]=useState(0.0)
    const [comment,SetComment]=useState('')
    const [gasto,setgasto]=useState('')
    const [monto,setMonto]=useState('')
    const datagastos={}

    const cancel=()=>{

        props.SetVisible(false)
    }


  

    return(
        <View style={style.content}>
             <View style={Styles.horizontal}>
                <Text style={Styles.titletext}>Solicitud</Text>
                <Text style={Styles.simpletext}>{global.solicitud}</Text>
                <Text style={Styles.titletext}>Unidad</Text>
                <Text style={Styles.simpletext}>{global.alias}</Text>


             </View>
             <Text style={Styles.titletext}>Agregar Gasto</Text>
             <View style={Styles.horizontal}>

                <SelectList 
                style={{color:'#000000',width:560,}}
                setSelected={gasto}
                data={datagastos}
                placeholder="Selecciona Gasto"
                dropdownTextStyles	={{color:'#000000'} }
                inputStyles={{color:'#000000'} }
                save="value"/>
            
          
                 <TextInput
                disabled={true}
                style={style.input2}
                label="monto"
                placeholder="monto"
                value={monto}
                onChangeText={text => setMonto(text)}
                />
                <Pressable>
                    
                </Pressable>
               
             </View>
             <View style={Styles.horizontal}>
                <Text style={Styles.titletext}>Total:</Text>
                <Text style={Styles.simpletext}>{total}$</Text>
             </View>
             <TextInput
                disabled={true}
                style={style.input}
                label="Comentario"
                placeholder="Comentario"
                value={comment}
                onChangeText={text => SetComment(text)}
                />
                
            <View style={Styles.horizontal}>
            <Pressable 
              
                style={style.button}>
                    <Text style={style.textbutton}>Enviar</Text>
                </Pressable>
                <Pressable 
                onPress={cancel}
                style={style.button1}>
                    <Text style={style.textbutton}>Cancelar</Text>
                </Pressable>

            </View>
           
            
        </View>

    )
};
const style=StyleSheet.create({
    content:{
       
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:'#eaeaeacc',
    },
    input: {
        width:300,
        height: 40,
        margin: 12,
        borderWidth: 0.5,
        padding: 10,
      },
      input2: {
        width:100,
        height: 40,
        marginLeft:10,
    
        borderWidth: 0.5,
        padding: 10,
      },

    button:{
        width:100,
        height:30,
        alignContent:'center',
        alignContent:'center',
        justifyContent: 'center',
        backgroundColor:'green',
        margin:5,
        borderRadius:60,marginTop:10,elevation: 5
        

    },
    button1:{
      width:100,
      height:30,
      alignContent:'center',
      alignContent:'center',
      justifyContent: 'center',
      backgroundColor:'red',
      margin:5,
      borderRadius:60,marginTop:10,elevation: 5
      

  },
  textbutton:{
    textAlign: 'center',
    color: '#ffffff',

 
    

},

})
export default Reload;