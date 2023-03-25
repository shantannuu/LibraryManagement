import { createSlice } from '@reduxjs/toolkit'

export const loaderSlice = createSlice({
    name: 'loaders',
    initialState: {
        loading: false,
    },
    reducers: {
        showLoading: (state) => {
            state.loading = true;
        },
        HideLoading: (state) => {
            state.loading = false;
        }
    }
});

export const { showLoading, HideLoading } = loaderSlice.actions;