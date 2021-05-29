import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Ionicons from "react-native-vector-icons/Ionicons";
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import { MysoundsTab } from '../../tabs/sounds/MysoundsTab.js'
import { FreesoundsTab } from '../../tabs/sounds/FreesoundsTab.js'
import { DefaultsoundsTab } from '../../tabs/sounds/DefaultsoundsTab.js'

const Tab = createBottomTabNavigator();

export function LibraryScreen() {

    const customTabBarStyle = {
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
        style: {backgroundColor: 'white', paddingBottom: 20, paddingTop:20, height: 65},
    }

    return (
        <Tab.Navigator
            tabBarOptions={customTabBarStyle}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                switch (route.name) {
                    case "MySounds":
                    iconName = focused ? "list-circle" : "list-circle-outline";
                    break;
                    case "FreeSounds":
                    iconName = focused ? "list-circle" : "list-circle-outline";
                    break;
                    case "DefaultSounds":
                    iconName = focused ? "list-circle" : "list-circle-outline";
                    break;
                    default:
                    iconName = "ban";
                    break;
                }

                return <Ionicons name={iconName} size={size} color={color}/>;
                },
            })}
            >
            <Tab.Screen name="MySounds" component={MysoundsTab} options={{tabBarLabel: 'My sounds'}}/>
            <Tab.Screen name="FreeSounds" component={FreesoundsTab} options={{tabBarLabel: 'FreeSounds'}}/>
            <Tab.Screen name="DefaultSounds" component={DefaultsoundsTab} options={{tabBarLabel: 'Default'}}/>
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
