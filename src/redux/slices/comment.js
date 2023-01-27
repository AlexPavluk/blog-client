import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios.js'

export const fetchComment = createAsyncThunk('comment/fetchComment', async () => {
    const response = await axios.get('/posts/comments');
    return response;
});

const initialState = {
        items:[],
        status: 'loading'
};

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
       
    },
    extraReducers: {
        //Geting comment
        [fetchComment.pending]: (state) => {
            state.status = 'Loading';
        },
        [fetchComment.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.items = action.payload.data;
        },
        [fetchComment.rejected]: (state) => {
            state.items = [];
            state.status = 'error';
        },
    }
});

export const { filterId } = commentSlice.actions;
export const commentReducer = commentSlice.reducer;