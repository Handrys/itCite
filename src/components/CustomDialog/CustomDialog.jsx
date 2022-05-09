import React, { useState, useEffect, useContext, useCallback } from 'react';
import { Context } from './../../state/context'
import Dialog from '@mui/material/Dialog';
import DeletePostDialog from './DeletePostDialog/DeletePostDialog';
import DeletePostStatusDialog from './DeletePostStatusDialog/DeletePostStatusDialog';
import { useDeletePost } from './../../shared/queries';
import { useGetPosts } from './../../shared/queries';
import AddPostStatusDialog from './AddPostStatusDialog/AddPostStatusDialog';
import EditPostStatusDialog from './EditPostStatusDialog/EditPostStatusDialog';

const CustomDialog = (props) => {

    const { state, dispatch } = useContext(Context)
    const { dialog } = state;
    const { isOpen, variant, answer, succes, propsDialog } = dialog;

    const handleAnswerTrue = () => {
        dispatch({
            type: 'changeAnswerDialog',
            payload: { answer: true },
        })
    }

    const handleAnswerFalse = () => {
        dispatch({
            type: 'changeAnswerDialog',
            payload: { answer: false },
        })
    }



    const handleDialogOpen = () => dispatch({
        type: 'isOpenDialog',
        payload: { isOpen: true },
    })

    const handleDialogClose = () => dispatch({
        type: 'isOpenDialog',
        payload: { isOpen: false, variant: null },
    })




    return (
        <>
            {variant === 'deletePostDialog' &&
                <DeletePostDialog
                    open={isOpen}
                    onClose={handleDialogClose}
                    blogPost={propsDialog.blogPost}
                    blogPage={propsDialog.blogPage}
                    deletePost={props.deletePost}
                    handleAnswerFalse = {handleAnswerFalse}
                    handleAnswerTrue = {handleAnswerTrue}
                />

            }
            {
                variant === 'deletePostStatusDialog' &&
                    <DeletePostStatusDialog
                        open={isOpen}
                        onClose={handleDialogClose}
                    />
            }
            {
                variant === 'AddPostStatusDialog' &&
                    <AddPostStatusDialog
                        open={isOpen}
                        onClose={handleDialogClose}
                        dialogType = {succes}
                    />
            }
            {
                variant === 'EditPostStatusDialog' &&
                    <EditPostStatusDialog
                        open={isOpen}
                        onClose={handleDialogClose}
                        dialogType = {succes}
                    />
            }


        </>
    );
}

export default CustomDialog;