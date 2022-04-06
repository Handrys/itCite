import axios from "axios";
import { Context, reducer } from '../../state'
import React, { useReducer, useState, useEffect, useContext } from 'react'

const FetchPosts = () => {
    const { postsState, dispatchPosts } = useContext(Context)

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


export default FetchPosts;
