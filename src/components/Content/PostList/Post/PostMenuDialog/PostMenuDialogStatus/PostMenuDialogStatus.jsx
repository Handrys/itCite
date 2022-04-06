import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {NavLink} from "react-router-dom";

export default function PostMenuDialogStatus(props) {
    console.log(props.pages)
    return (
        <div>
            {props.dialogType ?
                <>
                    <DialogTitle id="alert-dialog-title" sx={{ backgroundColor: '#1069a5', color: '#ffff', padding: '10px', fontSize: '16px' }}>
                        {"Статус"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" sx={{ paddingTop: '25px' }}>
                            Пост успешно удален!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
                        {/*           <Button onClick={handleDialogClose}>Disagree</Button> */}

                        <Button onClick={props.onClose} autoFocus>
                            ОК
                        </Button>

                    </DialogActions>
                </>
                :
                <>
                    <DialogTitle id="alert-dialog-title" sx={{ backgroundColor: 'red', color: '#ffff', padding: '10px', fontSize: '16px' }}>
                        {"Статус"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" sx={{ paddingTop: '25px' }}>
                            При удалении поста произошла ошибка! <br/> Проверьте свое подключение к интернету.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions sx={{ display: 'flex', justifyContent: 'center' }}>
                        {/*           <Button onClick={handleDialogClose}>Disagree</Button> */}
                            <Button onClick={props.onClose} autoFocus>
                                ОК
                            </Button>
                    </DialogActions>
                </>}
        </div>
    );
}