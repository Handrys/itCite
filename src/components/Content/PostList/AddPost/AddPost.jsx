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
import './AddPost.css'
import axios from "axios";
import { Context } from '../../../../state'
import { InitialApp } from '../../../../state/context';
import AddPostDialog from './AddPostDialog/AddPostDialog';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import { NavLink } from "react-router-dom";
import CircularProgress from '@mui/material/CircularProgress';
import { useAddPost } from '../../../../shared/queries';
import CustomDialog from '../../../CustomDialog/CustomDialog';
import FormHelperText from '@mui/material/FormHelperText';

import { convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import description from './Description.css'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML } from 'draft-convert';
import draftToHtml from 'draftjs-to-html';

/* import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator'; */
import { useForm, Controller } from "react-hook-form";



const AddPost = (props) => {

    const [isPending, setIsPending] = React.useState(false);

    const setOpacity = isPending ? 0.5 : 1


    const { state, dispatch } = useContext(Context)

    const [dialogType, setDialogType] = useState(null)

    const goodDialogOpen = () => dispatch({
        type: 'isOpenDialog',
        payload: {
            isOpen: true,
            variant: 'AddPostStatusDialog',
            succes: true
        }
    });

    const badDialogOpen = () => dispatch({
        type: 'isOpenDialog',
        payload: {
            isOpen: true,
            variant: 'AddPostStatusDialog',
            succes: false
        }
    });

    const addPostMutation = useAddPost();

    const [form, setForm] = React.useState({
        category: '',
        categoryPresent: '',
        title: '',
        description: '',
        theme: ''
    })

    /*     const [errors, setErrors] = React.useState({}) */


    const update = (e) => {
        console.log(errors)
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }


    /*  const formValidator = (event) => {
         const { target: { value, name } } = event;
         const formTitle = /^[а-яa-z0-9_-]{6,24}$/
         const formCategory = (value !== '')
         console.log('job')
         if (!formTitle.test(value) && name === 'title') {setErrors({title: true})} else {setErrors({title: false}) };
         if (!formCategory && name === 'category') {setErrors({category: true})} else {setErrors({category: false}) };
         
     } */

    /*    const [formValidate, setFormValidate] = React.useState({
           title: /^[а-яa-z0-9_-]{6,24}$/,
           category: form.category === '',
       }) */




    const [theme, setTheme] = React.useState('media');
    const handleChangeTheme = (event, newTheme) => {
        setTheme(newTheme);
    };

    const curTime = new Date().toLocaleString();

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty())

    const [convertedContent, setConvertedContent] = useState('')

    const handleEditorChange = (state) => {
        setEditorState(state);
        /*   console.log(editorState.getCurrentContent().hasText()) */
        console.log(editorState.getCurrentContent().getPlainText().length)
        setForm({
            ...form,
            description: draftToHtml(convertToRaw(state.getCurrentContent()))
        });
    }


    const createPost = () => {
        /* event.preventDefault(); */
        console.log(errors)
        setIsPending(true)
        const post = {
            id: state.length + 1,
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
        console.log(post)
        addNewPost(post)

    }

    const addNewPost = (blogPost) => {
        const postCategory = blogPost.category
        addPostMutation.mutateAsync({ postCategory, blogPost })
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

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        watch,
        control
    } = useForm({
        mode: 'onSubmit',
        /*         reValidateMode: 'onSubmit', */
    });


    return (
        <>

            <div className='add-post'>
                <div className="container">
                    <div className="add-post__body">
                        {isPending && <div className="progress"><CircularProgress /></div>}
                        <div className="add-post__form" style={{ opacity: setOpacity }}>
                            <form onSubmit={handleSubmit(createPost)}>
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
                                        <TextField  {...register('title', { required: true, onChange: (e) => { }, pattern: /^[а-яa-z0-9_-]{6,24}$/ })} id="post-name" label="Название поста" variant="outlined" style={{ width: '100%' }} onChange={update} value={form.title} name='title' error={errors.title} helperText={errors.title ? 'Обязательное поле. Название должно иметь от 6 до 24 символов.' : ''} />
                                    </FormControl>
                                    <FormControl sx={{ mt: 3, width: '100%' }} variant="standard" aria-labelledby="form-description-label">
                                        <TextField name='description'  /* sx={{display: 'none'}} */ error={errors.description} id="post-text" label="Описание" variant="outlined" multiline rows={10} value={editorState.getCurrentContent().getPlainText()} />

                                        <Controller
                                            name="DraftJS"
                                            control={control}
                                            render={({ value, onChange }) => {
                                                return <Editor
                                                {...register('description', { required: true })}
                                                value={editorState.getCurrentContent().getPlainText()}
                                                wrapperClassName={errors.description ? "wrapper-class-error" : "wrapper-class"}
                                                editorClassName="editor-class"
                                                toolbarClassName="toolbar-class"
                                                error
                                                editorState={editorState}
                                                onEditorStateChange={handleEditorChange}
                                            />
                                            }}
                                        />
                                        <Editor
                                            /* {...register('description', { required: true })} */
                                            value={editorState.getCurrentContent().getPlainText()}
                                            wrapperClassName={errors.description ? "wrapper-class-error" : "wrapper-class"}
                                            editorClassName="editor-class"
                                            toolbarClassName="toolbar-class"
                                            error
                                            editorState={editorState}
                                            onEditorStateChange={handleEditorChange}
                                        />

                                        <FormHelperText sx={{ color: '#d32f2f' }} id="form-description-label">{errors.description ? 'Обязательное поле. Описание должно иметь не менее 200 символов' : ''}</FormHelperText>
                                    </FormControl>


                                    <FormControl sx={{ mt: 3, width: '100%' }} variant="standard" required>
                                        <TextField {...register('category', { required: true })} id="select" label="Раздел:" value={form.category} select style={{ width: '100%' }} onChange={update} name='category' error={errors.category} helperText={errors.category ? 'Выберите один из вариантов' : ''}>
                                            <MenuItem value="news">Новости</MenuItem>
                                            <MenuItem value="articles">Статьи</MenuItem>
                                            <MenuItem value="reviews">Обзоры</MenuItem>
                                        </TextField>
                                    </FormControl>
                                    <FormControl sx={{ mt: 3, width: '100%' }} variant="standard">
                                        <FormHelperText sx={{ color: '#d32f2f' }} id="demo-row-radio-buttons-group-label">{errors.theme ? 'Выберите один из вариантов' : ''}</FormHelperText>
                                        <ToggleButtonGroup
                                            {...register('theme'/* , {required: true, minLength: 1} */)}
                                            aria-label="label"
                                            id='toggle-button'
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            color="primary"
                                            value={form.theme}
                                            onChange={update}
                                            exclusive
                                            sx={{ mt: 1 }}
                                            name='theme'
                                            error={errors.theme}
                                        >
                                            <ToggleButton name='theme' value="media">Медиа</ToggleButton>
                                            <ToggleButton name='theme' value="tehnology">Технологии</ToggleButton>
                                            <ToggleButton name='theme' value="sport">Спорт</ToggleButton>
                                            <ToggleButton name='theme' value="politics">Политика</ToggleButton>
                                            <ToggleButton name='theme' value="medical">Медицина</ToggleButton>
                                        </ToggleButtonGroup>

                                    </FormControl>
                                    <div className='button-enter'>
                                        <Button /* disabled={!isValid} */ variant="contained" style={{ width: '200px', height: '50px' }} type='submit' /* onClick={() => { createPost() }} */ >
                                            Добавить пост
                                        </Button>
                                    </div>
                                    {/*                                <Dialog
                                    dialogType={dialogType}
                                    open={dialogOpen}
                                    onClose={handleDialogClose}
                                >
                                    <AddPostDialog
                                        dialogType={dialogType}
                                        open={dialogOpen}
                                        onClose={handleDialogClose}
                                        aria-labelledby="modal-modal-title"
                                        aria-describedby="modal-modal-description"
                                        pages = {form.category}
                                    />
                                </Dialog> */}

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

export default AddPost;