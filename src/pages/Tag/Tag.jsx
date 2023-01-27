import React from 'react'
import { uniqueId } from 'lodash';
import Grid from '@mui/material/Grid';
import { Post } from '../../components/Post';

import { fetchPosts, fetchTags } from '../../redux/slices/posts';
import { useDispatch, useSelector, } from 'react-redux';
import { fetchComment } from '../../redux/slices/comment';
import { useParams } from 'react-router-dom'
// import { useSearchParams } from "react-router-dom"


export const Tags = () => {
  const { tag } = useParams();
  const dispatch = useDispatch();
  const postsList = useSelector((state) => state.posts.posts.items.filter(post => post.tags.some(postTag => postTag === tag)));
  const commentList = useSelector((state) => state.comment.items);
  const userData = useSelector((state) => state.auth.data);


  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
    dispatch(fetchComment());
  }, [dispatch])




  return (

    <Grid container spacing={4}>
      <Grid xs={8} item>

        <h1>
          #{tag}
        </h1>

        {postsList.map((post) => {
  

          return (
            <div
              key={uniqueId(post._id)}
            >
              <Post
                id={post._id}
                title={post.title}
                imageUrl={post.imageUrl ? `${process.env.REACT_APP_API}${post.imageUrl}` : ''}
                user={post.user}
                createdAt={post.createdAt}
                viewsCount={post.viewsCount}
                commentsCount={commentList.length}
                tags={post.tags}
                isEditable={userData?._id === post.user._id}
              />
            </div>
          )

        })}
      </Grid>
    </Grid>
  )
}

