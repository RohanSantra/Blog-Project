import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice'
import loaderReducer from './loaderSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        loader: loaderReducer
    }
});

export default store;