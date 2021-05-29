import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button, FlatList, ScrollView, Image, TextInput } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { freeSoundsSelector } from "../../../../slices/SoundsSlice";
import { editSelector } from "../../../../slices/EditSlice";
import { Audio } from "expo-av";
import * as FS from "expo-file-system";

export function ListScreen({navigation}) {
    const freeSounds = useSelector(freeSoundsSelector);
    const editing = useSelector(editSelector);
    const dispatch = useDispatch();

    const playSound = async(soundId) => {
        const file = await FS.getInfoAsync(FS.documentDirectory + soundId);

        if (file.exists){
            console.log('ok');
            console.log(file);
        }
         
        const { sound } = await Audio.Sound.createAsync(
            {uri: file.uri},
            {shouldPlay: true}
        );
        
        await sound.playAsync();
    };

    return (
        <ScrollView>
            <FlatList
            data={freeSounds}
            renderItem=
            {
                ({item}) => (   
                <View >
                    <Text value={item.name} style={styles.text}> {item.name} </Text>
                    <TouchableOpacity
                    style={[styles.button, styles.searchLine]}
                    onPress={() => playSound(item.id)}>
                        <Text>Play</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={[styles.button, styles.searchLine]}
                    onPress={() => chooseSound(item)}>
                        <Text>Choose</Text>
                    </TouchableOpacity>
                </View>
            )}
            keyExtractor={item => item.id}/>       
            <TouchableOpacity onPress={() => navigation.navigate("Search")}>
                <Text>Search a sound</Text>
            </TouchableOpacity>
        </ScrollView>
        
    );

    function chooseSound(sound){
        const index = editing.btn_id;
        dispatch(updateSound({index: index, sound: sound}));
        navigation.navigate("Edit");
    }

    function deleteSound(sound){
        FileSystem.deleteAsync(fileUri, options)
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});