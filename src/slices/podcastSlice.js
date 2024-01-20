import { createSlice } from "@reduxjs/toolkit";

const intialState = {
    podcasts : []
}

const podcastSlice = createSlice({
    name : "podcasts",
    initialState : intialState,
    reducers : {
        setPodcasts : (state, action) => {
            state.podcasts = action.payload
        }  
    }
});


export const { setPodcasts } = podcastSlice.actions;
export default podcastSlice.reducer;