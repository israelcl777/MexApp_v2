import React from "react";
import{Image, View} from 'react-native'

function confirmatedImage(propa){

    var bandera = propa.confirmated

    if(bandera){
        return (


        <View style={{ alignItems: 'center',
        textAlign: 'center',}} >
            <Image style={{ width:25,height:25,margin:5,}} source={require('../drawables/downgreen.png')}  />

        </View>
    )



    }
    else{
        return (

            <View style={{ alignItems: 'center',
            textAlign: 'center',}}>
                <Image style={{ width:25,height:25,margin:5}}  source={require('../drawables/downred.png')} />
    
            </View>
        )

    }


}

export default confirmatedImage