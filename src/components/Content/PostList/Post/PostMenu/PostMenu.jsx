import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Context } from '../../../../../state/context';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

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
    const { posts, isLogin } = state;
    const { isOpen, variant } = dialog;
    const { authorized } = isLogin;


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
                <MenuItem 
               /*  disabled = {!authorized} */
                onClick={() => {
                    handleClose()
                    console.log(props.blogPost)
                }}>
                    <NavLink style={{color: 'black'}} key={props.blogPost.id} to={`/${props.blogPage}/post/${props.blogPost.id}/edit`}>
                        Редактировать
                    </NavLink>
                </MenuItem>
                <MenuItem 
                /* disabled = {!authorized} */
                onClick={() => {
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

