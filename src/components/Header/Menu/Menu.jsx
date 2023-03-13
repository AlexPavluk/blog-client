// import { logout } from "../../../redux/slices/auth";
import useOutsideAlert from "../useOutsiteAlerter";
import styles from "./Menu.module.scss";

import {  useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
// import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PostAddIcon from '@mui/icons-material/PostAdd';
// import { GoOutConfirmAlert } from "../../ConfirmAlert/GoOutConfirmAlert";

const Menu = () => {
  const { ref, isShow, setIsShow } = useOutsideAlert(false);
  // const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);

  // const onClickLogout = () => {
  //   if (window.confirm("Вы действительно хотите выйти?")) {
  //     dispatch(logout());
  //     window.localStorage.removeItem("token");
  //   }
  // };

  return (
      <div>
        <img
          className={styles.avatar}
          onClick={() => setIsShow(true)}
          src={userData.avatarUrl
            ? `${process.env.REACT_APP_API}${userData.avatarUrl}`
            : "/noavatar.png"}
          alt={userData.avatarUrl} />
        {isShow && (
          <>
            <div className={styles.container}>
              <div ref={ref} className={styles.modal}>
                <Paper sx={{ width: '100%', maxWidth: '100%' }}>
                  <MenuList>
                    <MenuItem>
                      <ListItemIcon>
                        <AccountCircleIcon fontSize="small" />
                      </ListItemIcon>
                      <Link to="/profile">
                        <ListItemText onClick={() => setIsShow(false)}>Профиль</ListItemText>
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <PostAddIcon fontSize="small" />
                      </ListItemIcon>
                      <Link to="/add-post">
                        <ListItemText onClick={() => setIsShow(false)}>Написать статью</ListItemText>
                      </Link>
                    </MenuItem>

                    <Divider />
                  </MenuList>
                </Paper>
              </div>
            </div>
          </>
        )}
      </div>
  );
};

export default Menu
