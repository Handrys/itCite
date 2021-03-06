import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { NavLink } from "react-router-dom";



export default function DeletePostDialog(props) {

    return (
        <Dialog open = {props.open}>
            <DialogTitle id="alert-dialog-title" sx={{ backgroundColor: 'red', color: '#ffff', padding: '10px', fontSize: '16px' }}>
                {"Удаление поста"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description" sx={{ paddingTop: '25px', textAlign: 'center' }}>
                    Вы действительно хотите удалить пост <br /> "{props.blogPost.title}" ?
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Button onClick={() => {
                    props.handleAnswerFalse();
                    props.onClose()
                }}>Отмена</Button>
                <Button
                    sx={{ color: 'red' }}
                    onClick={() => {
                        props.onClose();
                        props.deletePost()
                        props.handleAnswerTrue();
                    }
                    }
                    autoFocus>Удалить</Button>
            </DialogActions>

        </Dialog>
    );
}