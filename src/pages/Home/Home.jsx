import React from 'react';
import { uniqueId } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import { Post } from '../../components/Post';
import { TagsBlock } from '../../components/TagsBlock';
import { CommentsBlock } from '../../components/CommentsBlock';
import { fetchPosts, fetchTags } from '../../redux/slices/posts';
import { fetchComment } from '../../redux/slices/comment';
import style from './Home.module.scss'

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector((state) => state.posts);
  const [activeTabIndex, setActiveTabIndex] = React.useState(0);
  const [postsList, setPostsList] = React.useState(posts.items);
  const userData = useSelector((state) => state.auth.data);
  const commentList = useSelector((state) => state.comment.items);

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';



  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
    dispatch(fetchComment());
  }, [dispatch]);

  React.useEffect(() => {
    if (activeTabIndex === 1) {

      const popularPosts = posts.items.slice().sort((a, b) => {
        return new Date(b.viewsCount) - new Date(a.viewsCount);
      });

      setPostsList(popularPosts);
    } else {
      const newPosts = posts.items.slice().sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });

      setPostsList(newPosts);
    }
  }, [activeTabIndex, posts]);

  if (isPostsLoading) {
    return <Post isLoading={true} />
  }

  return (
    <>
      <Tabs className={style.tabs} style={{ marginBottom: 15 }} value={activeTabIndex} aria-label="basic tabs example">
        <Tab onClick={() => setActiveTabIndex(0)} label="Новые" />
        <Tab onClick={() => setActiveTabIndex(1)} label="Популярные" />
      </Tabs>
      <Grid container spacing={4} item className={style.leftblok} >
        <Grid  item xs={12} sm={8} md={8}>
          <div >
            {postsList.map((post) => {

              const commentCount = commentList.filter(comment => comment.post === post._id);


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
                    commentsCount={commentCount.length}
                    tags={post.tags}
                    isEditable={userData?._id === post.user._id}
                  />
                </div>
              )

            })}
          </div>
        </Grid>
          <Grid xs={4} item className={style.rithblok}> 
            <TagsBlock key={uniqueId()} items={tags.items} isLoading={isTagsLoading} />
            <CommentsBlock
              items={commentList.slice(0, 5)}
              isLoading={false}
            />
          </Grid>
      </Grid>
    </>
  );
};