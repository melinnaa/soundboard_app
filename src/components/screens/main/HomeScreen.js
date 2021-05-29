import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';

export function HomeScreen({navigation}) {

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate("Sampler")}>
                <Text> Sampler </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Library")}>
                <Text> Library </Text>
            </TouchableOpacity>
        </View>
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
