import { configureStore } from "@reduxjs/toolkit";
import authReducer from './authSlice';
const mystore=configureStore({
    reducer:{
         auth:authReducer
    }
});

export default mystore;