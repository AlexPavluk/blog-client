import Menu from './Menu/Menu'
import { selectIsAuth } from "../../redux/slices/auth";
import { fetchAuthMe } from "../../redux/slices/auth";
import styles from './Header.module.scss';

import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';


export const Header = () => {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchAuthMe())
  }, [dispatch])

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.link} to="/">
            <div className={styles.logo}>PAVLUK BLOG</div>
          </Link>
          <div className={styles.buttons}>

            {isAuth ? <Menu /> : (
              <>
                <Link to="/login">
                  <div className={styles.log}>
                    <Button className={styles.log} variant="contained">Войти</Button>
                  </div>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
