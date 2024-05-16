import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import MenuItem from "@mui/material/MenuItem";
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import ListItemIcon from "@mui/material/ListItemIcon";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';

import { selectIsAuth } from "../../redux/slices/auth";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../../redux/slices/auth";
import { Navigate } from 'react-router-dom';


const PaperComponent = (props) => {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

export const GoOutConfirmAlert = () => {
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const isAuth = useSelector(selectIsAuth);

    const onClickLogout = async () => {
        dispatch(logout());
        window.localStorage.removeItem("token");
        setOpen(false);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    if (!window.localStorage.getItem('token') && !isAuth) {
        return < Navigate to="/" />
      };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <><MenuItem>
            <ListItemIcon onClick={handleClickOpen}>
                <ExitToAppIcon  />
            </ListItemIcon>
        </MenuItem><div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperComponent={PaperComponent}
                    aria-labelledby="draggable-dialog-title"
                >
                    <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                        Log out
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button onClick={onClickLogout}>Yes</Button>
                    </DialogActions>
                </Dialog>
            </div></>
    );
}