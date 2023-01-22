import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useQuery, useQueryClient, useMutation } from "react-query";
import axios from './axios';
import { Context } from '../state';
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

const postsUrl = 'https://61fe8fc6a58a4e00173c98db.mockapi.io/posts'



/* export const useGetPosts = (blogPage) => {
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
} */
export const useGetPosts = (blogPage) => {
    const { state, dispatch } = useContext(Context)
    return useQuery('post', () => {
        return axios.get(`/posts`)
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

/* export const useGetSinglePost = async(blogPage, postId) => {
    const { data } = await axios.get(`/posts/${postId}`)
    .then((res) => {
        console.log(res.data)
        return res.json()
    })
    .catch(err => {
        throw new Error(err)
    })
} */

export const useGetSinglePost = (postId) => {
        /* console.log('Получение поста..' + postId) */
    const queryClient = useQueryClient();
    return useQuery('postSingle', async() => {
        return axios.get(`/posts/${postId}`)
            .then((res) => {
                /* console.log(res.data) */
                /* res.data.createdAt = 'test' */
                return res.data
            })
            .catch(err => {
                throw new Error(err)
            })

    }, {
        onSuccess: (data) => {
          /*   console.log(data) */
       /*      queryClient.invalidateQueries('postSingle', data._id); */

        }
    },
        {
            refetchOnWindowFocus: true,
        })
}
/* export const useGetSinglePost = (blogPage, postId) => {

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
} */



export const useDeletePost = (blogPage, isFullpost) => {
    const queryClient = useQueryClient();
    const history = useNavigate()
    return useMutation(
        ({ blogPage, blogPost }) => {
            return axios.delete(`/posts/${blogPost._id}`)
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
            return axios.post(`/posts`, blogPost)
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

export const useEditPost = () => {
    const queryClient = useQueryClient();
    const history = useNavigate()
    return useMutation(
        ({ blogPost }) => {
            return axios.patch(`/posts/${blogPost._id}`, blogPost)
                .then(res => res.data)
                .catch(err => {
                    console.log(blogPost)
                    throw new Error(err)

                })
        }, {
        onSuccess: (data) => {
            /* queryClient.invalidateQueries('post'); */

        },
        onError: (error) => {
            console.log(error)

        },
    }
    )
}

export const useMutationComments = () => {
    const queryClient = useQueryClient();
    const history = useNavigate()
    return useMutation(
        ({ postId, commentsList }) => {
            return axios.patch(`/posts/${postId}/addComment`, commentsList)
                .then(res => res.data)
                .catch(err => {
                    console.log(commentsList)
                    throw new Error(err)

                })
        }, {
        onSuccess: (data) => {
            /* queryClient.invalidateQueries('post'); */

        },
        onError: (error) => {
            console.log(error)

        },
    }
    )
}

export const useLogin = () => {
    const { state, dispatch } = useContext(Context)
    return useMutation('', (params) => {
        /* params = JSON.stringify(params) */
        return axios.post(`/auth/login`, params)
            .then((res) => {
                console.log(res.data)
                if ('token' in res.data) {
                    dispatch({
                        type: 'user',
                        payload: {
                            authorized: true,
                            userData: res.data
                        },
                    })
                    localStorage.setItem('authorized', true)
                    localStorage.setItem('userData', res.data)
                    console.log('Токен записан')
                    localStorage.setItem('token', res.data.token)
                } else {
                    console.log(res.response.data.message)

                }
            })
            .catch((res, err) => {
                let errText = 'Ошибка сервера, попробуйте позже!'
                if (res.response.data.message != null | undefined) errText = res.response.data.message

                dispatch({
                    type: 'errors',
                    payload: { auth: errText }
                })
                throw new Error(err)
            })

    }, {
        refetchOnWindowFocus: false,
    })
}


export const fetchAuthMe = async () => {
    const { data } = await axios.get('/auth/me')
    /*     console.log(data) */
    return data;
}




export const useRegistration = () => {
    const { state, dispatch } = useContext(Context)
    return useMutation('', (params) => {
        /*         params = JSON.stringify(params)
                params = JSON.parse(params) */
        console.log(params)
        return axios.post(`/auth/register`, params)
            .then((res) => {
                console.log(res.data)
                if ('token' in res.data) {
                    console.log('Токен записан')
                    dispatch({
                        type: 'user',
                        payload: {
                            authorized: true,
                            userData: res.data
                        },
                    })
                    localStorage.setItem('authorized', true)
                    localStorage.setItem('userData', res.data)

                    localStorage.setItem('token', res.data.token)
                } else {
                    console.log('Токен не найден')

                }
            })
            .catch((res, err) => {
                let errText = 'Ошибка сервера, попробуйте позже!'
                if (res.response.data.message != null | undefined) errText = res.response.data.message

                dispatch({
                    type: 'errors',
                    payload: { auth: errText }
                })
                throw new Error(err)
            })

    }, {
        refetchOnWindowFocus: false,
    })
}



export const useEditProfile = () => {
    const queryClient = useQueryClient();
    const history = useNavigate()
    return useMutation(
        ({ profile }) => {
            return axios.patch(`/profile/${profile._id}`, profile)
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


/* export const fetchPosts = async() => {
    const { data } = await axios.get('/posts/fetchPosts')
    console.log(data)
    return data;
} */
