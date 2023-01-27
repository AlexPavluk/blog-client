import React from "react";
//import { uniqueId } from 'lodash';
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import  ReactMarkdown  from "react-markdown";
import axios from "../axios";
import { filterId } from '../redux/slices/comment'
import { fetchComment } from "../redux/slices/comment";

export const FullPost = () => {
  const {id} = useParams();
  const [data, setData] = React.useState();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(true);
  const commentList = useSelector((state) => state.comment.items.filter(items => items.post === id));


  




  React.useEffect(() => {
    axios
    .get(`/posts/${id}`)
    .then((res) => {
      setData(res.data);
      setIsLoading(false);
      dispatch(fetchComment());
      dispatch(filterId(id));
    }).catch((err) => {
      console.warn(err);
      alert('Ошибка при получении статьи')
    })
  }, [id, dispatch]);

  if (isLoading) {
    return < Post isLoading={isLoading} isFullPost/>
  }


  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `${process.env.REACT_APP_API}${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={commentList.length}
        tags={data.tags}
        isFullPost>
       <ReactMarkdown children={data.text}/>
      </Post>
      
      <CommentsBlock
        items={commentList}
        isLoading={isLoading}
      >
        <Index postId={id} />
      </CommentsBlock>
    </>
  );
};
