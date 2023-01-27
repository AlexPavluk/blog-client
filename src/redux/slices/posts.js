import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../../axios'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const {data} = await axios.get('/posts')
    return data;
})

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => 
    axios.delete(`/posts/${id}`),
);

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
    const { data } = await axios.get('/tags');
    return data;
});



const initialState = {
    posts: {
        items:[],
        status: 'loading'
    },
    tags: {
        items:[],
        status: 'loading'
    },
    comment: {
        items:[],
        status: 'loading'
    }
}


const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
    },
    extraReducers: {
        //Getings posts
        [fetchPosts.pending]: (state) => {
            state.posts.status = 'Loading';
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = 'loaded';
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = 'error';
        },
        //Getings posts
        [fetchTags.pending]: (state) => {
            state.tags.status = 'Loading';
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload;
            state.tags.status = 'loaded';
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = [];
            state.tags.status = 'error';
        },
        //Delete posts
        [fetchRemovePost.pending]: (state, action) => {
            state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg)
        },
    }
})

export const postsReducer = postSlice.reducer;