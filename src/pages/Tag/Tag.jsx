import React from 'react'
import { uniqueId } from 'lodash';
import Grid from '@mui/material/Grid';
import { Post } from '../../components/Post';


import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

export const Tags = () => {
  const { tag } = useParams();
  const postsList = useSelector((state) => state.posts.posts.items.filter(post => post.tags.some(postTag => postTag === tag)));
  const commentList = useSelector((state) => state.comment.items);
  const userData = useSelector((state) => state.auth.data);

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={8} md={8}>
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

