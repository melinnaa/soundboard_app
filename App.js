import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator }  from '@react-navigation/stack'; 

import { HomeScreen } from './src/components/screens/main/HomeScreen.js'
import { SamplerScreen } from './src/components/screens/main/SamplerScreen'
import { EditScreen } from './src/components/screens/main/EditScreen'
import { LibraryScreen } from './src/components/screens/main/LibraryScreen'
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './src/store/store'

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }}/>
                <Stack.Screen name="Sampler" component={SamplerScreen} options={{ title: 'Sampler' }}/>
                <Stack.Screen name="Edit" component={EditScreen} options={{ title: 'Edit' }}/>
                <Stack.Screen name="Library" component={LibraryScreen} options={{ title: 'Library' }}/>
            </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
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
