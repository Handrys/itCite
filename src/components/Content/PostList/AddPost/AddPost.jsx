import React, { useState, useEffect, useContext, useReducer } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ManImg from './home.png'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormLabel from '@mui/material/FormLabel';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import './AddPost.css'
import axios from "axios";
import { Context, reducer } from '../../../../state'
import postsReducer from './../../../../state/postsReducer';


const AddPost = (props) => {


    const { postsState, dispatchPosts } = useContext(Context)
    const { data, isPending } = postsState;
    const { dispatchData, dispatchIsPending } = dispatchPosts;
    console.log(postsState)

    const [form, setForm] = React.useState({
        category: '',
        title: '',
        description: ''
    })
    const update = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };
    const curTime = new Date().toLocaleString();


    const [alignment, setAlignment] = React.useState('web');

    const handleChangeButton = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const createPost = () => {
        const post = {
            id: postsState.length + 1,
            category: props.category,
            title: form.title,
            description: form.description,
            image: "https://kod.ru/content/images/size/w1250/2022/01/Tesla.png",
            publish_date: curTime,
            author: "Программист Программистов"
        }

/*         console.log(props.postListArr) */



/*         dispatchPosts({ type: 'upd', payload: post }) */
        console.log(post)
        addNewPost(post)
    }

    const addNewPost = (blogPost) => {

        axios.post(`https://61fe8fc6a58a4e00173c98db.mockapi.io/posts_news`, blogPost)
            .then((response) => {
                console.log('Post is create =>', response.data)
                props.fetchPosts()
            })
            .catch((err) => {
                console.log('ПОСТ НЕ СОЗДАН!', err)
            })
    }

    const Input = styled('input')({
        display: 'none',
    });

    const [postImage, setPostImage] = React.useState(ManImg);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setPostImage(URL.createObjectURL(file));
        console.log(postImage)
    };

    return (
        <div className='add-post'>
            <div className="container">
                <div className="add-post__body">
                    <div className="add-post__form">
                        <form>
                            <div className="form-top" >
                                <div className="form-top__img">
                                    <img src={postImage} alt="" style={{ width: '100%' }} />
                                    <Box sx={{ position: 'absolute', right: '0', bottom: '0' }}>
                                        <label htmlFor="icon-button-file"  >
                                            <Input accept="image/*" id="icon-button-file" type="file" onChange={handleImageChange} />
                                            <IconButton color="primary" aria-label="upload picture" component="span">
                                                <PhotoCamera sx={{ fontSize: '42px', color: 'rgb(16, 105, 165)' }} />
                                            </IconButton>
                                        </label>
                                    </Box>

                                </div>
                            </div>
                            <div className="form-content">

                                <FormControl sx={{ mt: 3, width: '100%' }} variant="standard">
                                    <TextField id="post-name" label="Название поста" variant="outlined" required style={{ width: '100%' }} onChange={update} value={form.title} name='title' />
                                </FormControl>
                                <FormControl sx={{ mt: 3, width: '100%' }} variant="standard">
                                    <TextField id="post-text" label="Описание" variant="outlined" required multiline rows={7} style={{ width: '100%' }} onChange={update} value={form.description} name='description' />
                                </FormControl>
                                <FormControl sx={{ mt: 3, width: '100%' }} variant="standard">
                                    <TextField id="select" label="Раздел:" value={form.category} select style={{ width: '100%' }} onChange={update} name='category'>
                                        <MenuItem value="10">Новости</MenuItem>
                                        <MenuItem value="20">Статьи</MenuItem>
                                        <MenuItem value="20">Обзоры</MenuItem>
                                    </TextField>
                                </FormControl>
                                <FormControl sx={{ mt: 3, width: '100%' }} variant="standard">
                                    <FormLabel id="demo-row-radio-buttons-group-label">Тематика</FormLabel>
                                    <ToggleButtonGroup
                                        aria-label="label"
                                        id='toggle-button'
                                        color="primary"
                                        value={alignment}
                                        exclusive
                                        onChange={handleChangeButton}
                                        sx={{ mt: 1 }}
                                    >
                                        <ToggleButton value="media">Медиа</ToggleButton>
                                        <ToggleButton value="tehnology">Технологии</ToggleButton>
                                        <ToggleButton value="sport">Спорт</ToggleButton>
                                        <ToggleButton value="sport">Политика</ToggleButton>
                                        <ToggleButton value="medical">Медицина</ToggleButton>
                                    </ToggleButtonGroup>
                                </FormControl>
                                <div className='button-enter'>
                                    <Button variant="contained" style={{ width: '200px', height: '50px' }} onClick={() => { createPost() }} >Добавить пост</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default AddPost;