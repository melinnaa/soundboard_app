import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, Touchable, TouchableOpacity, View, Button } from 'react-native';
import { Audio } from "expo-av";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { addSound } from '../../../../slices/SoundsSlice';

export function RecordScreen({navigation}) {

  const [recording, setRecording] = useState();
  const dispatch = useDispatch();
/*const { ios, android } = Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
await recorder.prepareToRecordAsync( {
	android: android,
	ios: {
		...ios,
		extension: '.mp4',
		outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC
	}

} )*/
  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 

      console.log('Starting recording..');
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync(); 
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI(); 
    const formatedSound = formatSound(recording.getURI);
    dispatch(addSound(formatedSound));

    console.log('Recording stopped and stored at', uri);
  }

  function formatSound(soundURI){
    return {
      id: 1,
      name: soundURI,
      download: soundURI,
      type: "mysound"
    }
  }

  return (
    <View style={styles.container}>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
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
