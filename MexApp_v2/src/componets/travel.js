import React from 'react';
import { View,Text,StyleSheet, Pressable, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';




function Travel (props){
    const navigation = useNavigation();
   //delivery_datetime
    return(
        <Pressable 
        style={{ 
            backgroundColor:'#ffffffcc',
            paddingVertical: 10,
            borderRadius: 4,
            elevation: 3,}}
        onPress={() => navigation.navigate('travelsdetails',{props:props})}>
            <View style={{margin:8}}>
            <Text style={{fontWeight: 'bold',}}>{props.agreement}</Text>
          
                <Text>{props.client}</Text>

      
            <View style={{flexDirection:'row'}}>
                <Text>SOLICITUD:  </Text>
                <Text>{props.id}</Text>

            </View>
            <Text>{props.delivery_datetime}</Text>
            </View>
           
        </Pressable>

    )

};


export default Travel;