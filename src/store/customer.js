import {
    createSlice
} from "@reduxjs/toolkit";

const initalCustomerState = {
    loggedIn: false,
    customerData: {},
};

const authCustomerSlice = createSlice({

    name: "customer",
    initialState: initalCustomerState,
    reducers: {
        login(state) {
            state.loggedIn = true;
        },
        logout(state) {
            state.loggedIn = false;
            state.userData = {}
        },
        updateCustomerData(state, action) {
            state.customerData = action.payload;
        },
    },
});

export const customerActions = authCustomerSlice.actions;

export default authCustomerSlice.reducer;