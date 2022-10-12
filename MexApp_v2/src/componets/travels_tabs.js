import * as React from 'react';
import { Text, View ,Image} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Curren_TravelScreen from '../screens/current_travelScreen'
import TravelsScreen from '../screens/travelsScreen'


function TravelsTabs(){

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
        name="Actual" 
        component={Curren_TravelScreen} 
        options={{
          headerShown: false,
          tabBarIcon:({ tintColor,focused }) => {
            let iconName;
            iconName = focused
            //<img src="https://img.icons8.com/glyph-neue/64/undefined/present.png"/>
            ? 'https://img.icons8.com/ios-filled/50/CB333B/present.png'
            : 'https://img.icons8.com/glyph-neue/64/9b9b9b/present.png';  
            
            return <Image
            
            source={{uri:iconName}}
            resizeMode="contain"
            style={{ width: 30, height: 30, tintColor: tintColor }}
          /> 
  
          },

          }}
          />
        <Tab.Screen name="Finalizados" component={TravelsScreen} 
           options={{
            tabBarIcon:({ tintColor,focused }) => {
              let iconName;
              iconName = focused
              //<img src="https://img.icons8.com/ios/50/undefined/ingredients-list.png"/>
              //<img src="https://img.icons8.com/ios-filled/50/undefined/ingredients-list.png"/>
              ? 'https://img.icons8.com/ios-filled/50/CB333B/ingredients-list.png'
              : 'https://img.icons8.com/ios/50/9b9b9b/ingredients-list.png';  
              
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
export default TravelsTabs;