import { createSlice } from "@reduxjs/toolkit";

export const routerSlice = createSlice({
    name: 'routes',
    initialState: {
        value: 'home'
    },
    reducers: {
        navigateTo : (state, action) => {
            state.value = action.payload;
        }
    }
})

export const { navigateTo } = routerSlice.actions;

export default routerSlice.reducer;