import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import axios from '../../axios';
import { selectIsAuth } from "../../redux/slices/auth";
import { fetchComment } from "../../redux/slices/comment";
import { useDispatch, useSelector } from 'react-redux';

export const Index = (props) => {

  const [comment, setComment] = React.useState('');
  const isAuth = useSelector(selectIsAuth);
  const userData = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const post = props.postId;
  const commentError = () => {
    toast.error('Ошибка создания комментария', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
  })
  }
  const authAlert = () => {
    toast.info('Зарегестируйтесь или Войдите, чтобы коментировать посты', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
  }

  const onSubmit = async () => {

    try {
      const payload = {
        comment,
        post
      }

      setComment('');
      const data = await axios.post('/posts/comments', payload);
      dispatch(fetchComment());
      return data

    } catch (err) {
      if(!isAuth) {
        authAlert();
      } else {
        commentError()
      }

      console.warn(err);

    }

  }

  return (
    <>

      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={userData.avatarUrl ? `${process.env.REACT_APP_API}${userData.avatarUrl}` : '/noavatar.png'}
        />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />



          <Button type="submit" onClick={onSubmit} variant="contained">Отправить</Button>
        </div>
      </div>
      <ToastContainer
      position="bottom-right"
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
