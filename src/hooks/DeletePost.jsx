import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { Context } from '../state';
import { useGetPosts } from '../shared/queries';

const DeletePost = (blogPage,blogPost) => {

    const { state, dispatch } = useContext(Context)
    const { posts, islogin, dialog } = state;
    const { postsArr, isPending } = posts;
    const { isOpen, variant, succes, answer } = dialog;

    
    const { status, isLoading, data: dataArr, error, isFetching, refetch } = useGetPosts(blogPage);
    const [isFullpost, setIsFullpost] = React.useState(false)
    const deleteMutation = DeletePost(blogPage, isFullpost);


    console.log(blogPost)


    deleteMutation.mutateAsync({ blogPage, blogPost })
        .then(() => {
            refetch();
            dispatch({
                type: 'isOpenDialog',
                payload: { isOpen: true, variant: 'deletePostStatusDialog', succes: 'true' },
            })
        })
        .catch(() => {
            dispatch({
                type: 'isOpenDialog',
                payload: { isOpen: true, variant: 'deletePostStatusDialog', succes: 'false' },
            })
        })

};


export default DeletePost;