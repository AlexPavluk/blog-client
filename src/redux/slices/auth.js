import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios.js';

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (params) => {
    const { data } = await axios.post('/auth/login', params);
    return data;
})

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const { data } = await axios.post('/auth/register', params);
    return data;
})

export const fetchEditRegister = createAsyncThunk('auth/fetchRegister', async (params) => {
    const { data } = await axios.patch('/auth/me', params);
    return data;
})

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('/auth/me');
    return data;
})

const initialState = {
    data: {
        createdAt: '',
        fullname: '',
        email: ''
    },
    status: 'Loading',
}

const authSlices = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = initialState.data
        }
    },
    extraReducers: {
        // Posts auth on server
        [fetchAuth.pending]: (state) => {
            state.status = 'Loading';
            state.data = {};
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchAuth.rejected]: (state,) => {
            state.status = 'error';
            state.data = {};
        },
        [fetchAuthMe.pending]: (state) => {
            state.status = 'Loading';
            state.data = {};
        },
        //Auth me
        [fetchAuthMe.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchAuthMe.rejected]: (state,) => {
            state.status = 'error';
            state.data = {};
        },
        //Registration
        [fetchRegister.pending]: (state) => {
            state.status = 'Loading';
            state.data = {};
        },
        [fetchRegister.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;
        },
        [fetchRegister.rejected]: (state,) => {
            state.status = 'error';
            state.data = {};
        },
    }
})

export const selectIsAuth = (state) => {

    return Boolean(state.auth?.data?._id)
};

export const authReduser = authSlices.reducer;
export const { logout } = authSlices.actions