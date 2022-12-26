import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { NavLink } from "react-router-dom";

export default function EditPostStatusDialog(props) {
    console.log(props.dialogType)

    
    return (
        <div>
            <Dialog open={props.open}>
                <DialogTitle id="alert-dialog-title" sx={{ backgroundColor: '#1069a5', color: '#ffff', padding: '10px', fontSize: '16px' }}>
                    {"Аккаунт"}
                </DialogTitle>
                <DialogContent>
                    {props.dialogType === 'reg' &&
                        <DialogContentText id="alert-dialog-description" sx={{ paddingTop: '25px' }}>
                            Ваш аккаунт успешно зарегестрирован!
                        </DialogContentText>
                    }
                    {props.dialogType === 'login' &&
                        <DialogContentText id="alert-dialog-description" sx={{ paddingTop: '25px' }}>
                            Вы успешно вошли в аккаунт!
                        </DialogContentText>
                    }

                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
                    {/*           <Button onClick={handleDialogClose}>Disagree</Button> */}

                    <Button onClick={props.onClose} autoFocus>
                        ОК
                    </Button>

                </DialogActions>
            </Dialog>
        </div>
    );
}