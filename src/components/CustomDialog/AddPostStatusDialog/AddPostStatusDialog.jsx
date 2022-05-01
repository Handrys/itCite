import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { NavLink } from "react-router-dom";

export default function AddPostStatusDialog(props) {
    console.log(props.dialogType)
    return (
        <div>
            {props.dialogType ?
                <>
                    <Dialog open={props.open}>
                        <DialogTitle id="alert-dialog-title" sx={{ backgroundColor: '#1069a5', color: '#ffff', padding: '10px', fontSize: '16px' }}>
                            {"Создание поста"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description" sx={{ paddingTop: '25px' }}>
                                Пост успешно создан!
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
                            {/*           <Button onClick={handleDialogClose}>Disagree</Button> */}
                            <NavLink to={'/'/*  + props.pages */} >
                                <Button onClick={props.onClose} autoFocus>
                                    ОК
                                </Button>
                            </NavLink>
                        </DialogActions>
                    </Dialog>
                </>
                :
                <>
                <Dialog open={props.open}>
                    <DialogTitle id="alert-dialog-title" sx={{ backgroundColor: 'red', color: '#ffff', padding: '10px', fontSize: '16px' }}>
                        {"Создание поста"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" sx={{ paddingTop: '25px' }}>
                            Ошибка! Пост не создан.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
                        {/*           <Button onClick={handleDialogClose}>Disagree</Button> */}
                        <Button onClick={props.onClose} autoFocus>
                            ОК
                        </Button>
                    </DialogActions>
                    </Dialog>
                </>}
        </div>
    );
}