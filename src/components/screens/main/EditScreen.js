import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from "react-redux";
import { toggleEdit } from '../../../slices/EditSlice';
import { setBtnId } from '../../../slices/EditSlice';

export function EditScreen({navigation, route}) {
    const dispatch = useDispatch();
    
    return (
        <View style={styles.container}>
            <Text> Edit the sound: {route.params.btn.sound.download} </Text>
            <TouchableOpacity onPress={() => handleChangeSound()}>
                <Text>Change sound</Text>
            </TouchableOpacity>
        </View>
    );

    function handleChangeSound(){
        dispatch(toggleEdit(true));
        const id = route.params.btn.btn_id;
        dispatch(setBtnId(id));
        navigation.navigate("Library");
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
