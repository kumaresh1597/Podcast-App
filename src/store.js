
import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import pocastReducer from "./slices/podcastSlice";
import episodeReducer from "./slices/episodeSlice";


export default configureStore({
    reducer : {
        user : userReducer,
        podcast : pocastReducer,
        episode : episodeReducer
    }
})