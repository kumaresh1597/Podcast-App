import { createSlice } from "@reduxjs/toolkit";

const intialState = {
    podcast : null
}

const podcastSlice = createSlice({
    name : "podcast",
    initialState : intialState,
    reducers : {
        setPodcast : (state, action) => {
            state.podcast = action.payload
        },
        clearPodcast : (state) => {
            state.podcast = null
        }    
    }
});


export const { setPodcast,clearPodcast } = podcastSlice.actions;
export default podcastSlice.reducer;