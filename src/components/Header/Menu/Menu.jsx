import useOutsideAlert from "../useOutsiteAlerter";
import styles from "./Menu.module.scss";

import {  useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Divider from "@mui/material/Divider";
import { Paper } from '@mui/material';
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PostAddIcon from '@mui/icons-material/PostAdd';


const Menu = () => {
  const { ref, isShow, setIsShow } = useOutsideAlert(false);
  const userData = useSelector((state) => state.auth.data);

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
                <Paper sx={{ width: "100%", maxWidth: "100%"}}>
                  <MenuList>
                    <MenuItem>
                      <ListItemIcon>
                        <AccountCircleIcon fontSize="small" />
                      </ListItemIcon>
                      <Link to="/profile">
                        <ListItemText onClick={() => setIsShow(false)}>Profile</ListItemText>
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <ListItemIcon>
                        <PostAddIcon fontSize="small" />
                      </ListItemIcon>
                      <Link to="/add-post">
                        <ListItemText onClick={() => setIsShow(false)}>Create post</ListItemText>
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
