import React from 'react';
import {View,Image} from 'react-native'


function ImageScreen (props){


    return(
        <View>
            
            <Image 
          style={{  width: '100%',height: '100%',resizeMode:'contain',margin:5}}
          source={require('../drawables/logo.png')}/>
        </View>

    )


}


export default ImageScreen