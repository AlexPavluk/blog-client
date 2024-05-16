import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from './slices/posts'
import { authReduser } from './slices/auth'
import { commentReducer } from "./slices/comment";


const store = configureStore({
    reducer: {
        posts: postsReducer,
        auth: authReduser,
        comment: commentReducer,
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;