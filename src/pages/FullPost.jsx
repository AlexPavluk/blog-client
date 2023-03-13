import React from "react";
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { fetchComment } from "../redux/slices/comment";
import ReactMarkdown from "react-markdown";
import axios from "../axios";

import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export const FullPost = () => {
  const { id } = useParams();
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
      }).catch((err) => {
        console.warn(err);
        toast.error('Ошибка при получении статьи', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
  }, [id, dispatch]);

  if (isLoading) {
    return < Post isLoading={isLoading} isFullPost />
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
        <ReactMarkdown children={data.text} />
      </Post>

      <CommentsBlock
        items={commentList}
        isLoading={isLoading}
      >
        <Index postId={id} />
      </CommentsBlock>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};
