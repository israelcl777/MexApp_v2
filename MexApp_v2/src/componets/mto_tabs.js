import React from 'react';
import { Text, View ,Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Mto_remolques from '../screens/mot_remolqueScreen'
import Mto_unidad from '../screens/mot_unidadScreen'



function MtoTabs(){

    const Tab = createBottomTabNavigator();

    return(
      <Tab.Navigator
      screenOptions={{
        
        tabBarActiveTintColor: '#CB333B',
        tabBarInactiveTintColor: 'gray',
        headerTintColor:'#000',
        tabBarInactiveBackgroundColor:'#ffffffcc',
        tabBarActiveBackgroundColor:'#ffffff',
       
       
      }}
      >
        <Tab.Screen 
        name="Mto Unidad" 
        component={Mto_unidad} 
        options={{
                    headerShown: false,

          tabBarIcon:({ tintColor,focused }) => {
            let iconName;
            iconName = focused
            //<img src="https://img.icons8.com/glyph-neue/64/undefined/present.png"/>
            ? 'https://img.icons8.com/ios-filled/50/CB333B//checked-truck.png'
            : 'https://img.icons8.com/glyph-neue/64/9b9b9b/checked-truck.png';  
            
            return <Image
            
            source={{uri:iconName}}
            resizeMode="contain"
          
            style={{ width: 30, height: 30, tintColor: tintColor }}
          /> 
  
          },

          }}
          />
        <Tab.Screen name="Mto Remolque" component={Mto_remolques} 
           options={{
            headerShown: false,
            tabBarIcon:({ tintColor,focused }) => {
              let iconName;
              iconName = focused
              //<img src="https://img.icons8.com/ios/50/undefined/ingredients-list.png"/>
              //<img src="https://img.icons8.com/ios-filled/50/undefined/ingredients-list.png"/>
              ? 'https://img.icons8.com/ios-filled/50/CB333B/trailer.png'
              : 'https://img.icons8.com/ios/50/9b9b9b/trailer.png';  
              
              return <Image
              
              source={{uri:iconName}}
              resizeMode="contain"
              style={{ width: 30, height: 30, tintColor: tintColor }}
            /> 
    
            },
  
            }}/>
      </Tab.Navigator>

    )
}
export default MtoTabs;