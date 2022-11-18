import {
    configureStore
} from "@reduxjs/toolkit";

import customrReducer from "./customer"
import adminReducer from "./admin"

const store = configureStore({
    reducer: {
        customer: customrReducer,
        auth: adminReducer
    },
});

export default store;