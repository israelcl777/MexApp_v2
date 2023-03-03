import React, { useEffect,useState } from 'react'
import { View,Pressable,StyleSheet,Image,Modal} from 'react-native';
import Depositoslist from '../containers/depositoslist';
import Api from'../api/tms'
import SetDeposito from '../modals/newDeposit'




function DepositosScreen (){
    const [items, setItems] = useState([]);
    const [modalvisible, SetVisible] = useState(false);


    useEffect(() => {
        gettravel()
        
    }, [])

    async function gettravel(){
        id_operador =global.id_operador
        const fecha = new Date();
        let dia= ('0'+ fecha.getUTCDate()).slice(-2)
        let mesAn= ('0'+fecha.getUTCMonth()).slice(-2)
        let mes= ('0'+(fecha.getUTCMonth()+1)).slice(-2)
        let year= fecha.getUTCFullYear()
        let hour=  ('0'+ fecha.getUTCHours()).slice(-2)
       
     
      
        var fromtime=year+'-'+(mesAn)+'-'+dia+'T'+hour+':00:00.000Z'
        var totime=year+'-'+(mes)+'-'+dia+'T'+hour+':00:00.000Z'

        try {

            const getdepositos=await Api.getdepositos(id_operador,fromtime,totime)
          let convert=getdepositos.filter(getdepositos=> getdepositos.is_consolidated_row==false )

           
            console.log(convert)
          
           setItems(convert)
 
        } catch (error) {
            console.log(error)
        }
      

    }

    
   
    return(
        <View style={{width:'100%',height:'100%' }}>
            <Modal
            animationType="slide"
            transparent={true}
            visible={modalvisible}>
                <SetDeposito SetVisible={SetVisible}/>
                
            </Modal>
            <Depositoslist depositos={items}/>
            
          
        </View>
    )
};
/*/<View style={style.horizontal} >
            <Pressable onPress={() => SetVisible(true)}>
                <Image style={{width:50,height:50,margin:10}} source={require('../drawables/plus.png')}/>
            </Pressable>
            </View>/*/

const style = StyleSheet.create({
    horizontal:{
     
        flexDirection:'row',
        alignContent:'center',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',//use absolute position to show button on top of the map
        alignSelf: 'flex-end' ,
        top: '90%'//for align to right
       
    },
  
  })

export default DepositosScreen;