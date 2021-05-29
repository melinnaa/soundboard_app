import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator }  from '@react-navigation/stack'; 

import { ListScreen } from '../../screens/library/mysounds/ListScreen.js'
import { RecordScreen } from '../../screens/library/mysounds/RecordScreen.js'

const Stack = createStackNavigator();

export function MysoundsTab() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="List" component={ListScreen} options={{ title: 'My sounds' }}/>
        <Stack.Screen name="Record" component={RecordScreen} options={{ title: 'Create my sound' }}/>
    </Stack.Navigator>
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
