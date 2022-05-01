import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Context } from '../../../../../state/context';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';

export default function PostMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const { state, dispatch } = useContext(Context)
    const { dialog } = state;
    const { isOpen, variant } = dialog;



    return (
        <div>
            <div
                id="demo-positioned-button"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                ...
            </div>
            <Menu
                id="demo-positioned-menu"
                aria-labelledby="demo-positioned-button"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <MenuItem onClick={() => {
                    handleClose()
                    console.log(props.blogPost)
                }}>Редактировать</MenuItem>
                <MenuItem onClick={() => {
                    handleClose()
                    dispatch({
                        type: 'isOpenDialog',
                        payload: {
                            isOpen: true,
                            variant: 'deletePostDialog',
                            propsDialog: {
                                blogPost: props.blogPost,
                                blogPage: props.blogPage
                            }
                        }
                    })
                }}>Удалить</MenuItem>
            </Menu>
        </div>
    );
}

