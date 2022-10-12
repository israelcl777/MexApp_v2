/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MLoginScreen from './src/screens/mloginscreen';
import LoginScreen from './src/screens/loginscreen';

/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */

const Stack = createNativeStackNavigator();

const App  =()=> {
  const[is_logged, setLogget]=useState(0)


 

  return (
    <NavigationContainer>
     <Stack.Navigator
     screenOptions={{
      headerStyle: {
        backgroundColor: '#ffffff',
      },
      }}>
          {is_logged == 0 ? (
 <>
    <Stack.Screen 
     name="Login"
     options={{
        unmountOnBlur: true,
        headerLeft: null,
        headerShown: false,
        gesturesEnabled: false,
       
        title: 'Iniciar sesion' }}>
     {props => <LoginScreen {...props} setLogget={setLogget}/>}
     </Stack.Screen>
       </>
       ) : (
         // User is signed in
         <>
          <Stack.Screen name="Home" component={MLoginScreen} />


        </>
    )}

    </Stack.Navigator>
  </NavigationContainer>

 


  );
};



export default App;
