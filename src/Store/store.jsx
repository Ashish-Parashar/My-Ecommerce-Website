import { configureStore } from "@reduxjs/toolkit";
import addtocartReducer from '../Feature/addtocart'
export const Store = configureStore ({
    reducer : {
        addtocart:addtocartReducer
    },
}) 