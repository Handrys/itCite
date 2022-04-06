import { createContext } from 'react'
import React, { useReducer, useState, useEffect, useContext } from 'react'
import axios from "axios";

export const Context = createContext()

export const InitialApp = () => {
    const { postsState, dispatchPosts } = useContext(Context)
    const { data, isPending } = postsState;
    
    console.log('test')


    dispatchPosts({ type: 'loading', payload: true })
    axios.get(`https://61fe8fc6a58a4e00173c98db.mockapi.io/posts_news`)
        .then((response) => {
            console.log('Посты получены!')
            dispatchPosts({ type: 'loading', payload: false })
            dispatchPosts({
                type: 'add',
                payload: response.data,
            })
            console.log(response.data)
        })
        .catch((err) => {
            console.log(err)
        })
}


