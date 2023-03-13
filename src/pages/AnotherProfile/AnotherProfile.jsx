import React from "react";
import { isEmpty, uniqueId } from "lodash";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import axios from "../../axios";
import { fetchPosts } from '../../redux/slices/posts';
import { Post } from "../../components/Post/index";
import styles from "./AnotherProfile.module.scss";

export const AnotherProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [data, setData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const postsList = useSelector((state) => state.posts.posts.items.filter((post) => post.user._id === data._id));
  const commentList = useSelector((state) => state.comment.items.slice(0, 2));
  const regDate = !isEmpty(data?.createdAt) ? new Date(data?.createdAt) : "";
  const formatDate = new Intl.DateTimeFormat("uk");
  const registerDate = formatDate.format(regDate);

  React.useEffect(() => {
    axios
      .get(`/user/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
        dispatch(fetchPosts())
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении статьи");
      });
  }, [id, dispatch]);

  return (
    <div>
      <div className={styles.wrrap}>
        <img
          className={styles.img}
          src={
            data.avatarUrl
              ? `${process.env.REACT_APP_API}${data.avatarUrl}`
              : "/noavatar.png"
          }
          alt=""
        />

        <h1 className={styles.name}>{data.fullName}</h1>
      </div>
      <h2> Kоличество постов: {postsList.length}</h2>
      <h2> Дата регестации: {registerDate}</h2>

      <Grid container spacing={4}>
        <Grid item xs={12} sm={8} md={8}>
          {postsList.map((post) => {
            const commentCount = commentList.filter(
              (comment) => comment.post === post._id
            );

            if (isLoading) {
              <img src='/Circles-menu-3.gif' alt='' />
            }

            return (
              <>
                <div key={uniqueId(post._id)}>
                  <Post
                    id={post._id}
                    title={post.title}
                    imageUrl={
                      post.imageUrl
                        ? `${process.env.REACT_APP_API}${post.imageUrl}`
                        : ""
                    }
                    user={post.user}
                    createdAt={post.createdAt}
                    viewsCount={post.viewsCount}
                    commentsCount={commentCount.length}
                    tags={post.tags}

                  />
                </div>
              </>
            );
          })}
          {postsList.length >= 2 ? <>
            <Link to={`/profile/${id}/posts`}>
              <div className={styles.btn}>Показать больше</div>
            </Link>
          </> : ""
          }
        </Grid>
      </Grid>
    </div>
  );
};
