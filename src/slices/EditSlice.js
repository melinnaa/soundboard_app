import { createSlice } from "@reduxjs/toolkit";
import { State } from "react-native-gesture-handler";

export const EditSlice = createSlice({
    name: "edit",
    initialState: [{
        editing: true,
        btn_id: ""
    }],
    reducers: {
        toggleEdit: (state, action) => {
            console.log(action.payload);
            return state.editing != action.payload ? !state.editing : state.editing;
        },
        setBtnId: (state, action) => {
            console.log(action.payload);
            return {...state, btn_id: action.payload}
        }
    },
});
  
export const { toggleEdit, setBtnId } = EditSlice.actions;
export default EditSlice.reducer;
export const editSelector = (state) => state.edit;