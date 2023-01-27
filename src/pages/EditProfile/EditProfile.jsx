
import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Grommet, FileInput } from 'grommet';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';


import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { fetchEditRegister } from "../../redux/slices/auth";
import axios from '../../axios';

import styles from './EditProfile.module.scss'

export const EditProfile = () => {

    const { fullName, email, avatarUrl } = useSelector((state) => state.auth.data);
    const [avatarImg, setAvatarImg] = React.useState(avatarUrl);
    const navigate = useNavigate();
    const dispatch = useDispatch();



    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm({
        defaultValues: {
            fullName: !isEmpty(fullName) ? fullName : '',
            email: !isEmpty(email) ? email : '',
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


        const data = await dispatch(fetchEditRegister({ ...values, avatarImg }));


        if (!data.payload) {
            return alert('Не удалось за регистрироваться!');
        }

        navigate('/');


    }



    return (

        <Paper classes={{ root: styles.root }}>

            <Typography classes={{ root: styles.title }} variant="h5">
                Изменение аккаунта
            </Typography>
            {

                avatarImg.length === 0 ?

                    <div className={styles.avatar}>
                        <img className={styles.image} src={avatarUrl ? `${process.env.REACT_APP_API}${avatarUrl}` : '/noavatar.png'} alt="Uploaded" />

                    </div> :

                    <img className={styles.image} src={`${process.env.REACT_APP_API}${avatarImg}`} alt="Uploaded" />

            }
            <Grommet>
                <form >

                    <FileInput
                        name="file"
                        onChange={handleChangeFile}
                    />


                    <TextField className={styles.field} label="Полное имя"
                        error={Boolean(errors.fullName?.message)}
                        helperText={errors.fullName?.message}
                        {...register('fullName', { required: 'Укажите имя' })}
                        fullWidth />
                    <TextField className={styles.field} label="E-Mail"
                        type="email"
                        error={Boolean(errors.email?.message)}
                        helperText={errors.email?.message}
                        {...register('email', { required: 'Укажите почту' })}
                        fullWidth />
                   

                    <Button disabled={!isValid} onClick={handleSubmit(onSubmit)} type="submit" size="large" variant="contained" fullWidth>
                        Сохранить
                    </Button>
                </form>
            </Grommet>

        </Paper>
    );
};