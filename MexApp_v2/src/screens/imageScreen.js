import React from 'react';
import {View,Image} from 'react-native'


function ImageScreen (props){
    console.log(props.route.params)
    var image=props.route.params.images


    return(
        <View>
            <Image 
          style={{  width: '100%',height: '100%',resizeMode:'contain',margin:5}}
          source={{uri:image}} />
        </View>

    )


}


export default ImageScreen
