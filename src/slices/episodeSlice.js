import { createSlice } from "@reduxjs/toolkit";

const intialState = {
    episodes : []
}

const episodeSlice = createSlice({
    name : "episodes",
    initialState : intialState,
    reducers : {
        setEpisode : (state, action) => {
            state.episodes = action.payload
        },
        clearEpisode : (state) => {
            state.episodes = null
        }    
    }
});

export const { setEpisode,clearEpisode } = episodeSlice.actions;
export default episodeSlice.reducer;