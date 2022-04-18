import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useQuery, useQueryClient, useMutation } from "react-query";
import axios from "axios";
import { Context } from '../state';

const postsUrl = 'https://61fe8fc6a58a4e00173c98db.mockapi.io/posts'


export const useGetPosts = (blogPage) => {
    const { postsState, dispatchPosts } = useContext(Context)
    return useQuery('postsArr', () => {
        return axios.get(`${postsUrl}_${blogPage}`)
            .then((res) => {
                dispatchPosts({
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



export const useGetSinglePost = (pages, postId) => {

    return useQuery('post', () => {
        return axios.get(`${postsUrl}_${pages}/${postId}`)
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



export const useDeletePost = () => {
    const queryClient = useQueryClient();
    return useMutation(
        ({ blogPage, blogPost }) => {
            return axios.delete(`${postsUrl}_${blogPage}/${blogPost.id}`)
                .then(res => res.data)
                .catch(err => {
                    throw new Error(err)
                })
        }, {
        onSuccess: (data) => {
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
        ({postCategory, blogPost}) => {
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


