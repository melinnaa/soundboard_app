import { createSlice } from "@reduxjs/toolkit";

export const SoundsSlice = createSlice({
    name: "sounds",
    initialState: [
        {
            id: 0,
            name: "Cymbal",
            download: require("../../assets/defaultSounds/cymbal.wav"),
            type: "default"
        },
        {
            id: 1,
            name: "Daibyoshi",
            download: require("../../assets/defaultSounds/daibyoshi.wav"),
            type: "default"
        },
        {
            id: 2,
            name: "Med Taiko",
            download: require("../../assets/defaultSounds/med_taiko.wav"),
            type: "default"
        },
        {
            id: 3,
            name: "Miyadaiko",
            download: require("../../assets/defaultSounds/miyadaiko.wav"),
            type: "default"
        },
        {
            id: 4,
            name: "Tsuzumi",
            download: require("../../assets/defaultSounds/tsuzumi.wav"),
            type: "default"
        },
        {
            id: 5,
            name: "Taiko",
            download: require("../../assets/defaultSounds/taiko.wav"),
            type: "default"
        }
    ],

    reducers: {
        addSound (state, action) {
            state.push(action.payload)
        },
        updateSound (state,action) {
            state.sounds = state.sounds.map((sound) => sound.id === action.payload.id ? sound = action.payload : true);
        },
        deleteSound (state, action) {
            state.sounds = state.sounds.filter((sound) => sound.id !== action.payload.id);
        }
    },
});
  
export const { addSound, updateSound, deleteSound } = SoundsSlice.actions;
export default SoundsSlice.reducer;
export const soundsSelector = (state) => state.sounds;
export const freeSoundsSelector = (state) => state.sounds.filter((sound) => sound.type === "freesound");
export const mySoundsSelector = (state) => state.sounds.filter((sound) => sound.type === "mysound");
export const defaultSelector = (state) => state.sounds.filter((sound) => sound.type === "default");