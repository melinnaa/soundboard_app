import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, Touchable, TouchableOpacity, View, ScrollView, FlatList } from 'react-native';
import { useSelector } from "react-redux";
import { mySoundsSelector } from "../../../../slices/SoundsSlice";
import { Audio } from "expo-av";

export function ListScreen({navigation}) {
    const mySounds = useSelector(mySoundsSelector);

    const playSound = async(selectedSound) => {
      console.log(selectedSound);
      const { sound } = await Audio.Sound.createAsync(selectedSound);
      await sound.playAsync();
  };

  return (
      <ScrollView>
          <FlatList
          data={mySounds}
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
              </View>
          )}
          keyExtractor={item => item.id}/>   
            <TouchableOpacity onPress={() => navigation.navigate("Record")}>
                <Text>Record a sound</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => show()}>
                      <Text>Show</Text>
                  </TouchableOpacity>
      </ScrollView>
  );

    function show(){
      console.log(mysounds)
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
