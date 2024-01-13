import { createSlice } from "@reduxjs/toolkit";

const intialState = {
    user : null
}

const userSlice = createSlice({
    name : "user",
    initialState : intialState,
    reducers : {
        setUser : (state, action) => {
            state.user = action.payload
        },
        clearUser : (state) => {
            state.user = null
        }    
    }
})

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;