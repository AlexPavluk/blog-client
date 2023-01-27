import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

import axios from '../../axios';
import { fetchComment } from "../../redux/slices/comment";
import { useDispatch, useSelector } from 'react-redux';

export const Index = (props) => {

  const [comment, setComment] = React.useState('');
  const userData = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();
  const post = props.postId;

  const onSubmit = async () => {
    try {

      const payload = {
        comment,
        post
      }

      setComment('');
      const  data  = await axios.post('/posts/comments', payload);
      dispatch(fetchComment());
      return data

    } catch (err) {
      console.warn(err)
      alert("Ошибка при создании комментария")
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
    </>
  );
};
