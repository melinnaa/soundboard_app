import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import { useSelector } from "react-redux";
import { padSelector } from "../../../slices/PadSlice";
import { Audio } from "expo-av";

export function SamplerScreen({navigation}) {

    const pad = useSelector(padSelector);

    const playSound = async(selectedSound) => {
        const { sound } = await Audio.Sound.createAsync(selectedSound);
        await sound.playAsync();
    };

    return (
      <View style={styles.container}>
        <View style={styles.line}>
          <TouchableOpacity style={[styles.square, {backgroundColor: "#BCEE00",}]} onPress={() => play(0)} onLongPress={() => editSound(0)}></TouchableOpacity>
          <TouchableOpacity style={[styles.square, {backgroundColor: "red",}]} onPress={() => play(1)} onLongPress={() => editSound(1)}></TouchableOpacity>
          <TouchableOpacity style={[styles.square, {backgroundColor: "#FF02B6",}]} onPress={() => play(2)} onLongPress={() => editSound(2)}></TouchableOpacity>
        </View>
        <View style={styles.line}>
          <TouchableOpacity style={[styles.square, {backgroundColor: "#C300EA",}]} onPress={() => play(3)} onLongPress={() => editSound(3)}></TouchableOpacity>
          <TouchableOpacity style={[styles.square, {backgroundColor: "#5D00E4",}]} onPress={() => play(4)} onLongPress={() => editSound(4)}></TouchableOpacity>
          <TouchableOpacity style={[styles.square, {backgroundColor: "#0144F7",}]} onPress={() => play(5)} onLongPress={() => editSound(5)}></TouchableOpacity>
        </View>
        <View style={styles.line}>
          <TouchableOpacity style={[styles.square, {backgroundColor: "#01CAF7",}]} onPress={() => play(6)} onLongPress={() => editSound(6)}></TouchableOpacity>
          <TouchableOpacity style={[styles.square, {backgroundColor: "#00E5AD",}]} onPress={() => play(7)} onLongPress={() => editSound(7)}></TouchableOpacity>
          <TouchableOpacity style={[styles.square, {backgroundColor: "#07DA00",}]} onPress={() => play(8)} onLongPress={() => editSound(8)}></TouchableOpacity>
        </View>
   </View>
    );

  function play(btn_id){   
      let btnSelected = pad.filter((btn) => btn.btn_id === btn_id)[0].sound.download
      playSound(btnSelected);
  }

  function editSound(btn_id){
      navigation.navigate("Edit", {btn: pad.filter((btn) => btn.btn_id === btn_id)[0]});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  square: {
    width: 100,
    height: 100,
    margin: 7,
    borderRadius: 10
  },

  line: {
    flexDirection: "row"
  }
});
