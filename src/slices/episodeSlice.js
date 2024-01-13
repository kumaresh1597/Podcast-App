import { createSlice } from "@reduxjs/toolkit";

const intialState = {
    episode : null
}

const episodeSlice = createSlice({
    name : "episode",
    initialState : intialState,
    reducers : {
        setEpisode : (state, action) => {
            state.episode = action.payload
        },
        clearEpisode : (state) => {
            state.episode = null
        }    
    }
});

export const { setEpisode,clearEpisode } = episodeSlice.actions;
export default episodeSlice.reducer;