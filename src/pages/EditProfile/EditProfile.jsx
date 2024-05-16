import { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import { ToastContainer, toast } from 'react-toastify';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import { useDispatch, useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { fetchEditRegister } from "../../redux/slices/auth";
import axios from '../../axios';

import styles from './EditProfile.module.scss'

export const EditProfile = () => {
    const { fullName, email, avatarUrl } = useSelector((state) => state.auth.data);
    const [avatarImg, setAvatarImg] = useState(avatarUrl);
    const [isLoading, setIsLoading] = useState('')
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
            alert("Error when uploading a file")
        }
    };

    const onSubmit = async (values) => {
        const data = await dispatch(fetchEditRegister({ ...values, avatarImg }));
        setIsLoading(true)
        if (!data.payload) {
            return toast.error('Failed to change the user', {
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
        return navigate('/profile');
    }

    if (isLoading) {
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        )
    }

    return (
        <Paper classes={{ root: styles.root }}>
            <Typography classes={{ root: styles.title }} variant="h5">
                Edit user
            </Typography>
            {
                avatarImg.length === 0 ?
                    <div className={styles.avatar}>
                        <img className={styles.image} src={avatarUrl ? `${process.env.REACT_APP_API}${avatarUrl}` : '/noavatar.png'} alt="Uploaded" />
                    </div> :
                    <img className={styles.image} src={`${process.env.REACT_APP_API}${avatarImg}`} alt="Uploaded" />
            }
            <form onSubmit={handleSubmit(onSubmit)}>

                <Button className={styles.fileBtn} onChange={handleChangeFile} variant="contained" component="label">
                    Upload photo
                    <input hidden accept="image/*" multiple type="file" />
                </Button>

                <TextField className={styles.field} label="name"
                    error={Boolean(errors.fullName?.message)}
                    helperText={errors.fullName?.message}
                    {...register('fullName', { required: 'Enter a name' })}
                    fullWidth />
                <TextField className={styles.field} label="E-Mail"
                    type="email"
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    {...register('email', { required: 'Enter a email' })}
                    fullWidth />

                <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
                    Save
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
        </Paper >
    );
};