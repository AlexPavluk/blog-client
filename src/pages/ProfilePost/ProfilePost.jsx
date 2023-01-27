import Grid from '@mui/material/Grid'
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from "../../axios";
import { useParams } from "react-router-dom";
import { uniqueId } from 'lodash';
import { Post } from '../../components/Post';
import { fetchPosts } from '../../redux/slices/posts';

export const ProfilePost = () => {
    const { id } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const postsList = useSelector((state) => state.posts.posts.items.slice(0, 2).filter(post => post.user._id === data._id));
  const commentList = useSelector((state) => state.comment.items);


    useEffect(() => {
        axios
      .get(`/user/${id}`)
      .then((res) => {
          setData(res.data);
          dispatch(fetchPosts())
      })
      .catch((err) => {
          console.warn(err);
          alert("Ошибка при получении статьи");
      });
        }, [id, dispatch]);


  return (
    <>
    <h2>Посты пользователя: {data?.fullName}</h2>
      <Grid container spacing={4}>
        <Grid xs={8} item>
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
                  isEditable={data?._id === post.user._id}
                />
              </div>
            )
            })}
        </Grid>
      </Grid>
    </>
  )
}

