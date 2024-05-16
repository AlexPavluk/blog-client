import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { isEmpty, uniqueId } from 'lodash';
import { Link } from 'react-router-dom';
import { Post } from '../../components/Post';
import styles from './Profile.module.scss';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid'
import { GoOutConfirmAlert } from '../../components/ConfirmAlert/GoOutConfirmAlert';

export const Profile = () => {
    const [isLoading, setIsLoading] = useState(true)
    const userData = useSelector((state) => state.auth.data);
    const postsList = useSelector((state) => state.posts.posts.items.slice(0, 2).filter(post => post.user._id === userData._id));
    const commentList = useSelector((state) => state.comment.items);
    const regDate = !isEmpty(userData?.createdAt) ? new Date(userData?.createdAt) : '';
    const formatDate = new Intl.DateTimeFormat('uk');
    const registerDate = formatDate.format(regDate);

    setTimeout(() => setIsLoading(false), 500);

    if (isLoading) {
        return (
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
        )
    }

    return (

        <div>
            <><div className={styles.wrrap}>
                <img className={styles.img} src={userData.avatarUrl ? `${process.env.REACT_APP_API}${userData.avatarUrl}` : '/noavatar.png'} alt="" />
                <h1 className={styles.name}>{userData.fullName}</h1>
                <Link to="/profile-edit">
                    <IconButton color="primary">
                        <EditIcon />
                    </IconButton>
                </Link>
                <GoOutConfirmAlert />
            </div><h2> Number of posts: {postsList.length}</h2><h2> Date of regestation: {registerDate}</h2><Grid container spacing={4}>
                    <Grid item xs={12} sm={8} md={8}>
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
                                        isEditable={userData?._id === post.user._id} />
                                </div>
                            );
                        })}
                        {postsList.length >= 2 ?
                            <>
                                <Link to="/profile-posts">
                                    <div className={styles.btn}>
                                        Show all my posts
                                    </div>
                                </Link>
                            </> : ''}
                    </Grid>
                </Grid></>
        </div >

    )
}

