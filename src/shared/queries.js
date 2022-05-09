import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useQuery, useQueryClient, useMutation } from "react-query";
import axios from "axios";
import { Context } from '../state';
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const postsUrl = 'https://61fe8fc6a58a4e00173c98db.mockapi.io/posts'


export const useGetPosts = (blogPage) => {
    const { state, dispatch } = useContext(Context)
    return useQuery('postsArr', () => {
        return axios.get(`${postsUrl}_${blogPage}`)
            .then((res) => {
                dispatch({
                    type: 'addPost',
                    payload: res.data,
                })
            })
            .catch(err => {
                throw new Error(err)
            })

    }, {
        refetchOnWindowFocus: false,
    })
}



export const useGetSinglePost = (blogPage, postId) => {

    return useQuery('post', () => {
        return axios.get(`${postsUrl}_${blogPage}/${postId}`)
            .then((res) => {
                return res.data
            })
            .catch(err => {
                throw new Error(err)
            })

    }, {
        refetchOnWindowFocus: false,
    })
}



export const useDeletePost = (blogPage, isFullpost) => {
    const queryClient = useQueryClient();
    const history = useNavigate()
    return useMutation(
        ({ blogPage, blogPost }) => {
            return axios.delete(`${postsUrl}_${blogPage}/${blogPost.id}`)
                .then(res => res.data)
                .catch(err => {
                    throw new Error(err)
                })
        }, {
        onSuccess: (data) => {
            if (isFullpost) history(`/${blogPage}`)
            queryClient.invalidateQueries('posts');
        },
        onError: (error) => {
            console.log(error)
        },
    }
    )
}


export const useAddPost = () => {
    const queryClient = useQueryClient();

    return useMutation(
        ({ postCategory, blogPost }) => {
            return axios.post(`${postsUrl}_${postCategory}`, blogPost)
                .then(res => res.data)
                .catch(err => {
                    throw new Error(err)
                })
        }, {
        onSuccess: (data) => {
            console.log('success', data);
            queryClient.invalidateQueries('posts');
        },
        onError: (error) => {
            console.log(error)
        },
    }
    )
}

export const useEditPost = (blogPage) => {
    const queryClient = useQueryClient();
    const history = useNavigate()
    return useMutation(
        ({blogPage, blogPost}) => {
            return axios.put(`${postsUrl}_${blogPage}/${blogPost.id}`, blogPost)
                .then(res => res.data)
                .catch(err => {
                    throw new Error(err)
                })
        }, {
        onSuccess: (updatedPost) => {
            /* history(`/${blogPage}`) */
        },
        onError: (error) => {
            console.log(error)
        },
    }
    )
}


