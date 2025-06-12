import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import loaderReducer from './loaderSlice'
import postReducer from './postSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        loader: loaderReducer,
        posts: postReducer
    }
});

export default store;