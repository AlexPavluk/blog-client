import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Grommet, FileInput } from 'grommet';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
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
    mode: 'onChange'
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
      alert("Ошибка при загрузке файла")
    }
  };

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister({ ...values, avatarImg }));

    if (!data.payload) {
      return alert('Не удалось за регистрироваться!');
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
        Создание аккаунта
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
      <Grommet>
        <form onSubmit={handleSubmit(onSubmit)}>

          <FileInput
            name="file"
            onChange={handleChangeFile}
          />

          <TextField className={styles.field} label="Полное имя"
            error={Boolean(errors.fullName?.message)}
            helperText={errors.fullName?.message}
            {...register('fullName', { required: 'Укажите почту' })}
            fullWidth />
          <TextField className={styles.field} label="E-Mail"
            type="email"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            {...register('email', { required: 'Укажите почту' })}
            fullWidth />
          <TextField className={styles.field} label="Пароль"
            type="password"
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            {...register('password', { required: 'Укажите пароль' })}
            fullWidth />
          <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
            Зарегистрироваться
          </Button>
        </form>
      </Grommet>

    </Paper>
  );
};
