import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../axios';

import styles from './Login.module.scss';

export const Registration = () => {
  const isAuth = useSelector(selectIsAuth);
  const [avatarImg, setAvatarImg] = React.useState('');
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      avatarImg
    },
    mode: 'onBlur'
  });

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0]
      formData.append('image', file)

      const { data } = await axios.post('/upload', formData)

      setAvatarImg(data.url)
    } catch (err) {
      console.warn(err)
      toast.error('Error when uploading a file', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister({ ...values, avatarImg }));

    if (!data.payload) {

      console.log(data.payload)

      toast.error('Failed to register', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  }

  if (isAuth) {
    return < Navigate to="/" />
  };
  return (

    <Paper classes={{ root: styles.root }}>

      <Typography classes={{ root: styles.title }} variant="h5">
        Register
      </Typography>
      {

        avatarImg.length === 0 ?

          <div className={styles.avatar}>
            <Avatar
              sx={{ width: 100, height: 100 }}
            />

          </div> :

          <img className={styles.image} src={`${process.env.REACT_APP_API}${avatarImg}`} alt="Uploaded" />

      }
      <form onSubmit={handleSubmit(onSubmit)}>

        <Button className={styles.fileBtn} onChange={handleChangeFile} variant="contained" component="label">
          Upload photo
          <input hidden accept="image/*" multiple type="file" />
        </Button>

        <TextField className={styles.field} label="Full name"
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', {
            required: 'Enter the user name', minLength: {
              value: 3,
              message: 'Minimum of 3 characters'
            }
          })}
          fullWidth />
        <TextField className={styles.field} label="E-Mail"
          type="email"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Enter a email' })}
          fullWidth />
        <TextField className={styles.field} label="Password"
          type="password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', {
            required: 'Enter a passowrd',
            minLength: {
              value: 4,
              message: 'Minimum of 4 characters'
            }
          })}
          fullWidth />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Sign in
        </Button>
      </form>
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
    </Paper>
  );
};
