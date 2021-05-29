import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button, FlatList, ScrollView, Image, TextInput } from 'react-native';
import { useSelector } from "react-redux";
import { defaultSelector } from "../../../slices/SoundsSlice";
import { editSelector } from "../../../slices/EditSlice";
import { useDispatch } from "react-redux";
import { updateSound } from '../../../slices/PadSlice';
import { Audio } from "expo-av";

export function DefaultsoundsTab({navigation}) {

    const defaultSounds = useSelector(defaultSelector);
    const editing = useSelector(editSelector);
    const dispatch = useDispatch();

    const playSound = async(selectedSound) => {
        console.log(selectedSound);
        const { sound } = await Audio.Sound.createAsync(selectedSound);
        await sound.playAsync();
    };

    return (
        <ScrollView>
            <FlatList
            data={defaultSounds}
            renderItem=
            {
                ({item}) => (   
                <View >
                    <Text value={item.name} style={styles.text}> {item.name} </Text>
                    <TouchableOpacity
                    style={[styles.button, styles.searchLine]}
                    onPress={() => playSound(item.download)}>
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
        </ScrollView>
    );

    function chooseSound(sound){
        const index = editing.btn_id;
        dispatch(updateSound({index: index, sound: sound}));
        navigation.navigate("Edit");
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%'
    },

    textInput: {
        fontSize: 18,
        padding: 8,
    },

    searchBlock: {
        margin: 0,
        shadowOffset:{  width: 0,  height: 20,  },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowRadius: 15
    },

    text: {
        fontSize: 18,
        padding: 4,
    },

    searchLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: "wrap"
    }

});