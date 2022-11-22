import React from 'react';
import {RNCamera} from 'react-native-camera';

function Camera(props){

    return(
        <RNCamera 
      ref={(ref) => camera.current = ref}
      captureAudio={false}
      style={{flex: 1}}
      type={RNCamera.Constants.Type.back}
      androidCameraPermissionOptions={{
        title: 'Permission to use camera',
        message: 'We need your permission to use your camera',
        buttonPositive: 'Ok',
        buttonNegative: 'Cancel',
      }} />


    )


}
export default Camera