import React, { useState, useRef, useEffect, useContext } from 'react';
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
import './EditPost.css'
import axios from "axios";
import { Context } from '../../../../state'
import { InitialApp } from '../../../../state/context';

import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import { NavLink, useParams } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { useAddPost, useEditPost, useGetSinglePost } from '../../../../shared/queries';
import CustomDialog from '../../../CustomDialog/CustomDialog';

import { CompositeDecorator, ContentState, convertFromHTML, convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import description from './Description.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML } from 'draft-convert';
import draftToHtml from 'draftjs-to-html';
import { stateFromHTML } from 'draft-js-import-html';
import htmlToDraft from 'html-to-draftjs';





const EditPost = (props) => {

    const [isPending, setIsPending] = React.useState(false);

    const setOpacity = isPending ? 0.5 : 1

    const { blogPage, postId } = useParams();

    const { state, dispatch } = useContext(Context)

    const [dialogType, setDialogType] = useState(null)

    const { status, isLoading, data: post, error, isFetching, refetch } = useGetSinglePost(blogPage, postId);


    const editPostMutation = useEditPost(blogPage);


    const editPost = () => {

        const blogPost = {
            id: post.id,
            category: form.category,
            categoryPresent: form.categoryPresent,
            theme: form.theme,
            title: form.title,
            /* description: form.description, */
            description: form.description,
            image: "https://www.iphones.ru/wp-content/uploads/2021/09/%D0%A1%D0%BD%D0%B8%D0%BC%D0%BE%D0%BA-%D1%8D%D0%BA%D1%80%D0%B0%D0%BD%D0%B0-2021-09-07-%D0%B2-19.48.05.jpg",
            publish_date: curTime,
            author: "Программист Программистов"
        }

        editPostMutation.mutateAsync({ blogPage, blogPost })
            .then(() => {
                setDialogType(true)
                goodDialogOpen()
                setIsPending(false)

            })
            .catch((err) => {
                setDialogType(false)
                badDialogOpen()
                setIsPending(false)

            })
    }




    const goodDialogOpen = () => dispatch({
        type: 'isOpenDialog',
        payload: {
            isOpen: true,
            variant: 'EditPostStatusDialog',
            succes: true
        }
    });

    const badDialogOpen = () => dispatch({
        type: 'isOpenDialog',
        payload: {
            isOpen: true,
            variant: 'EditPostStatusDialog',
            succes: false
        }
    });

    const addPostMutation = useAddPost();

    const [form, setForm] = React.useState({
        category: post.category,
        categoryPresent: post.categoryPresent,
        title: post.title,
        description: post.description,
        theme: post.theme
    })


    const update = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const [theme, setTheme] = React.useState('');
    const handleChangeTheme = (event, newTheme) => {
        setTheme(newTheme);
    };

    const curTime = new Date().toLocaleString();

   /*  const descriptionNice = EditorState.createWithContent(stateFromHTML(form.description)) */



    const blocksFromHTML = convertFromHTML(post.description);


    const blocksFromHtml = htmlToDraft(post.description);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const newEditorState = EditorState.createWithContent(contentState);   

   /*  setEditorState(newEditorState) */
   const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty())

    useEffect(() => {
        setEditorState(newEditorState)
      },[]);

    const handleEditorChange = (state) => {
        setEditorState(state)
        setForm({
            ...form,
            description: draftToHtml(convertToRaw(state.getCurrentContent()))
        });
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


    /*     const saveBlogPostToStore = (description) => {
    console.log(description)
    const JSBlogPost = { ...description, content: JSON.stringify(convertToRaw(description.getCurrentContent() ))};
    this.props.dispatch(blogActions.saveBlogPostToStore(JSBlogPost));
    setConvertedContent(JSBlogPost)
    console.log(JSBlogPost)
}

const convertContentToHTML = () => {
    let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
    console.log(convertedContent)
   */
    /*         const JSBlogPost = { ...state, content: JSON.stringify(convertToRaw(state.getCurrentContent() ))};
            console.log(JSBlogPost) */


    /* draftToHtml(convertToRaw(state.getCurrentContent())) */


    return (
        <>
            <div className='add-post'>
                <div className="container">
                    <div className="add-post__body">
                        {isPending && <div className="progress"><CircularProgress /></div>}
                        <div className="add-post__form" style={{ opacity: setOpacity }}>
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
                                    {<FormControl sx={{ mt: 3, width: '100%' }} variant="standard">
                                        {/* <TextField id="post-text" label="Описание" variant="outlined" required multiline rows={10} style={{ width: '100%' }} onChange={update} value={form.description} name='description' /> */}

                                        <Editor
                                            name='description'
                                            wrapperClassName="wrapper-class"
                                            editorClassName="editor-class"
                                            toolbarClassName="toolbar-class"
                                            editorState={editorState}
                                            onEditorStateChange={handleEditorChange}
                                        />
                                    </FormControl>}


                                    <FormControl sx={{ mt: 3, width: '100%' }} variant="standard">
                                        <TextField id="select" label="Раздел:" value={form.category} select style={{ width: '100%' }} onChange={update} name='category'>
                                            <MenuItem value="news">Новости</MenuItem>
                                            <MenuItem value="articles">Статьи</MenuItem>
                                            <MenuItem value="reviews">Обзоры</MenuItem>
                                        </TextField>
                                    </FormControl>
                                    <FormControl sx={{ mt: 3, width: '100%' }} variant="standard">
                                        <FormLabel id="demo-row-radio-buttons-group-label">Тематика</FormLabel>
                                        <ToggleButtonGroup
                                            aria-label="label"
                                            id='toggle-button'
                                            color="primary"
                                            name='theme'
                                            value={theme}
                                            exclusive
                                            onChange={handleChangeTheme}
                                            sx={{ mt: 1 }}
                                        >
                                            <ToggleButton value="media">Медиа</ToggleButton>
                                            <ToggleButton value="tehnology">Технологии</ToggleButton>
                                            <ToggleButton value="sport">Спорт</ToggleButton>
                                            <ToggleButton value="politics">Политика</ToggleButton>
                                            <ToggleButton value="medical">Медицина</ToggleButton>
                                        </ToggleButtonGroup>
                                    </FormControl>
                                    <div className='button-enter'>
                                        <Button variant="contained" style={{ width: '200px', height: '50px' }} onClick={() => { editPost() }} >
                                            Сохранить
                                        </Button>
                                    </div>

                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
            <CustomDialog />
        </>
    );
}

export default EditPost;