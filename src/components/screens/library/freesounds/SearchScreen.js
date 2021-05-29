import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Button, FlatList, ScrollView, Image, TextInput } from 'react-native';
import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { addSound } from '../../../../slices/SoundsSlice';
import { Audio } from "expo-av";
import * as FS from "expo-file-system";

export function SearchScreen({navigation}) {
    const [sounds, setListSounds] = useState();
    const [soundInput, setSoundInput] = useState("");
    const [progress, setProgress] = useState({downloadProgress: ""});
    const dispatch = useDispatch();

    const playSound = async(selectedSound) => {
        console.log(selectedSound);
        const { sound } = await Audio.Sound.createAsync({uri: selectedSound});
        console.log("cc?");
        await sound.playAsync();
    };

    const callback = downloadProgress => {
        const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
        setProgress({downloadProgress: progress})
    };
    
    return (
        <ScrollView contentContainerStyle={styles.container}>

            <View style={styles.searchBlock}>
                <TextInput placeholder="Search sound" placeholderTextColor="gray" value={soundInput} onChangeText={setSoundInput} style={[styles.textInput]}></TextInput>
                <Button onPress={() => findSound(soundInput)} title={"Search"} color="#C4449F"></Button>
            </View>

            <FlatList
            data={sounds}
            renderItem={({item}) => 
                <View style={styles.searchLine}>
                    <Text value={item.name} style={styles.text}>{item.name}</Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handleSoundSelected(item)}>
                            <Text>Add</Text>
                    </TouchableOpacity>  
                    <TouchableOpacity
                        style={[styles.button, styles.searchLine]}
                        onPress={() => playSound(item.previews["preview-hq-mp3"])}>
                            <Text>Play</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.searchLine]}
                        onPress={() => stopSound(item.previews["preview-hq-mp3"])}>
                            <Text>Stop</Text>
                    </TouchableOpacity>
                </View>}
            keyExtractor={item => item.id}
            />

        </ScrollView>
    );
    
    async function handleSoundSelected(item){
        let sound = formatSound(item);

        const downloadResumable = FS.createDownloadResumable(
            sound.download,
            FS.documentDirectory + item.id,
            {},
            callback
        );

        console.log(downloadResumable);
        console.log(FS.documentDirectory+item.id);
        
        try {
            const { uri } = await downloadResumable.downloadAsync();
            console.log('Finished downloading to ', uri);
        } catch (e) {
            console.error(e);
        }

        /*const { uri: localUri } = await FS.downloadAsync(sound.download, FS.documentDirectory + 'name.ext');
        console.log(localUri);*/
        dispatch(addSound(sound));
        alert('Sound added in your library')
     }

    function formatSound(item){
        return {
            id: item.id,
            name: item.name,
            download: item.download,
            type: 'freesound'
        }
    }

    function findSound(input){
        const sounds = findSoundsByInput(input);
        Promise.resolve(sounds).then((response) => {
            setListSounds(response);
        });         
    }

    async function findSoundsByInput(input){
    try {
        const resp = await axios.get("http://freesound.org/apiv2/search/text/?query="+input+"&fields=id,name,previews,download&token=jY8inepynCSYGuKiXXmcWfVk53iW8ww9SUDRSJ5V")
        console.log(resp.data);
        return resp.data.results
    } catch (err) {
        console.error(err);
    }
    }     
 }
 
 const styles = StyleSheet.create({
     container: {
         width: '100%',
         height: '100%'
     },
 
     textInput: {
         fontSize: 18,
         padding: 8
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
         padding: 4
     },
 
     searchLine: {
         flexDirection: 'row',
         justifyContent: 'space-between',
         flexWrap: "wrap"
     } 
 });