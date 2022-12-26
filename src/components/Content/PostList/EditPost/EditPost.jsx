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
import axios from '../../../../shared/axios'
import { Context } from '../../../../state'
import { InitialApp } from '../../../../state/context';

import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import { Navigate, NavLink, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
import { Controller, set, useForm, useWatch } from 'react-hook-form';
import { FormHelperText } from '@mui/material';





const EditPost = (props) => {
    const { postId } = useParams();
    const navigate = useNavigate()

    const [isPending, setIsPending] = React.useState(false);



    const { state, dispatch } = useContext(Context)

    const [dialogType, setDialogType] = useState(null)

    const [postImage, setPostImage] = React.useState();

    /*  console.log(postId) */
 /*    console.log('ID SSILKI: ', postId) */
    const { status, isLoading, data: post, error, isFetching, isMutating, isSuccess, refetch } = useGetSinglePost(postId);
    const setOpacity = !isSuccess ? 0.5 : 1


    const editPostMutation = useEditPost();

    const curTime = new Date().toLocaleString();


    const [form, setForm] = React.useState({
        category: '',
        categoryPresent: '',
        title: '',
        description: '',
        _id: '',
        image: '',
        author: {}
        /*    ...postInit */
    })


    useEffect(() => {
        if (post) {
         /*    console.log(post._id, postId) */
            if (post._id != postId) refetch()
        }
    }, [post])

    useEffect(() => {
/*         console.log(status)
        console.log(post) */
        if (post) {
           /*  console.log(post._id, postId) */
            setForm({
                category: post.category,
                categoryPresent: post.categoryPresent,
                title: post.title,
                description: post.description,
                _id: post._id,
                image: post.image,
                author: post.author
            });
            /*             console.log('ID POSTA:', post._id)
                        console.log('ID PARAMSA:', postId) */
        }
    }, [post])
    
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
        setValue,
        getValues,
        setError,
        clearErrors,
        watch,
        reset,
        control
    } = useForm({
        mode: 'onChange',
        /*   defaultValues: form, */
    })





    /*     useEffect(() => {
            console.log(status)
        },[status]) */





    //================================== Отправляем пост на сервер  ========================================//
    const editPost = (data) => {

        const blogPost = {
            ...data,
            _id: post._id,
            categoryPresent: form.categoryPresent,
            image: postImage,
        }
     /*    console.log(form.image)
        console.log(blogPost) */

        editPostMutation.mutateAsync({ blogPost })
            .then(() => {
                setDialogType(true)
                goodDialogOpen()
                setIsPending(false)
                navigate(`/posts/${postId}`)
                console.log(errors)
            })
            .catch((err) => {
                setDialogType(false)
                badDialogOpen()
                setIsPending(false)

            })
    }
    //===================================================================================================================



    const goodDialogOpen = () => dispatch({
        type: 'isOpenDialog',
        payload: {
            isOpen: true,
            variant: 'succes',
            dialogTitle: 'Информация:',
            dialogText: 'Пост успешно изменен!'
        }
    });

    const badDialogOpen = () => dispatch({
        type: 'isOpenDialog',
        payload: {
            isOpen: true,
            variant: 'error',
            dialogTitle: 'Ошибка',
            dialogText: 'При редактировании поста произошла ошибка!'
        }
    });


    const update = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };




    const Input = styled('input')({
        display: 'none',
    });





    //====================== Для работы "description" (Пребразовуем красивый текст в обычную хтмл разметку и записываем в стейт) ============//

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty())

    useEffect(() => {

        const blocksFromHTML = convertFromHTML(form.description);
        const blocksFromHtml = htmlToDraft(form.description);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        const newEditorState = EditorState.createWithContent(contentState);
        setEditorState(newEditorState)
    }, [form._id]);

    const handleEditorChange = (state) => {
        setEditorState(state);
        const descriptionText = draftToHtml(convertToRaw(state.getCurrentContent()))
        console.log(descriptionText)
        setValue('description', descriptionText)
        setForm({
            ...form,
            description: draftToHtml(convertToRaw(state.getCurrentContent()))
        });
        console.log(getValues('description'));

    }


/*     useEffect(() => {
        const editorText = editorState.getCurrentContent().getPlainText();
        const hasText = editorState.getCurrentContent().hasText();
        console.log(editorText.split(''))
        editorText.split('').length < 160 ? setError('description', { type: 'custom', message: 'Минимальная длинна 160 символов' }) : clearErrors('description');
    }, [editorState.getCurrentContent().getPlainText().length]); */

    //===========================================================================================================================================

    //==============Записываем во встроенный стейт ReachHookForm данные, когда они появились в кастомном стейте формы =========================//
    useEffect(() => {
        if (form._id) {
            setValue('title', form.title)
            setValue('description', form.description)
            setValue('category', form.category)
            setValue('image', post.image)
            reset({ 'category': form.category })
            setPostImage(form.image)
        }

    }, [form._id])
    //===========================================================================================================================================



    const handleImageChange = async (e) => {
        console.log('work')
        try {
            const formData = new FormData();
            const file = e.target.files[0];
            formData.append('image', file)
            setPostImage(URL.createObjectURL(file));

            const { data } = await axios.post('/upload', formData)
            console.log(data.url)
            setForm({ ...form, ['image']: `${process.env.REACT_APP_API_URL}${data.url}` });
        } catch (err) {
            console.warn(err)
            console.log('Error')
        }

    };





    return (
        /*         isFetching ? <div className="progress">  <CircularProgress /></div>
                : */
        <>
            <div className='add-post'>
                <div className="container">
                    <div className="add-post__body">
                        {(!form._id || form._id != postId) ? <div className="progress"><CircularProgress /><Button variant="text">Загрузка...</Button></div>
                            :
                            <div className="add-post__form" style={{ opacity: setOpacity }}>
                                <form onSubmit={handleSubmit(editPost)}>
                                    <div className="form-top" >
                                        <div className="form-top__img">
                                            <img src={postImage} alt="" style={{ width: '100%' }} />
                                            <Box sx={{ position: 'absolute', right: '0', bottom: '0' }}>
                                                <label htmlFor="icon-button-file"  >
                                                    <input hidden accept="image/*" id="icon-button-file" type="file" onChange={handleImageChange} />
                                                    <IconButton color="primary" aria-label="upload picture" component="span">
                                                        <PhotoCamera sx={{ fontSize: '42px', color: 'rgb(16, 105, 165)' }} />
                                                    </IconButton>
                                                </label>
                                            </Box>

                                        </div>
                                    </div>
                                    <div className="form-content">
                                        <FormControl sx={{ mt: 3, width: '100%' }} variant="standard">
                                            <TextField  {...register('title', {
                                                required: {
                                                    value: true,
                                                    message: 'Это обязательное поле*'
                                                },
                                                minLength: {
                                                    value: 10,
                                                    message: 'Название должно иметь от 10 до 100 символов'
                                                },
                                                maxLength: {
                                                    value: 100,
                                                    message: 'Название должно иметь от 10 до 100 символов'
                                                }
                                            })}
                                                id="post-name" label="Название поста"
                                                variant="outlined" style={{ width: '100%' }}
                                                /*  onChange={update} */
                                                /*value={form.title}  */
                                                name='title'
                                                error={errors.title} helperText={errors.title ? errors.title.message : ''} />
                                        </FormControl>
                                        <FormControl sx={{ mt: 3, width: '100%' }} variant="standard" aria-labelledby="form-description-label" error={errors.description}>
                                            {/*  <TextField name='description'  error={errors.description} id="post-text" label="Описание" variant="outlined" multiline rows={10} value={editorState.getCurrentContent().getPlainText()} /> */}
                                            <Controller
                                                control={control}
                                                name="description"  
                                                rules={{
                                                    required: {
                                                        value: true,
                                                        message: 'Это обязательное поле*'
                                                    },
                                                    minLength: {
                                                        value: 160,
                                                        message: 'Название должно иметь от 160 до 10 000 символов'
                                                    },
                                                    maxLength: {
                                                        value: 10000,
                                                        message: 'Название должно иметь от 160 до 10 000 символов'
                                                    }
                                                }}                                              
                                                render={({
                                                    field: { onChange, onBlur, value = editorState.getCurrentContent().getPlainText(), name, ref },
                                                    fieldState: { invalid, isTouched, isDirty, error },
                                                    formState,
                                                    
                                                }) => (
                                                    <Editor
       /*                                              {...register('description', {
                                                        required: {
                                                            value: true,
                                                            message: 'Это обязательное поле*'
                                                        }
                                                    })} */
                                                    /* value={editorState.getCurrentContent().getPlainText()} */
                                                    wrapperClassName={errors.description ? "wrapper-class-error" : "wrapper-class"}
                                                    editorClassName="editor-class"
                                                    toolbarClassName="toolbar-class"
                                                    editorState={editorState}
                                                    onEditorStateChange={handleEditorChange}
                                                    name= {name}
    
                                                    /* toolbarOnFocus */
                                                    toolbar={{
                                                        options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
                                                        /* option: {
                                                            className: 'toolbarBtn'
                                                        } */
                                                    }}
                                                />
                                                )}
                                            />
                                            



                                            <FormHelperText sx={{ color: '#d32f2f' }} id="form-description-label">{errors.description ? errors.description.message : ''}</FormHelperText>
                                        </FormControl>


                                        <FormControl sx={{ mt: 3, width: '100%' }} variant="standard" required>
                                            <TextField {...register('category', {
                                                required: true,
                                            })}
                                                id="select"
                                                label="Раздел:"
                                                /* value={getValues('category')}  */
                                                defaultValue={form.category}
                                                select
                                                style={{ width: '100%' }}

                                                name='category'
                                                error={errors.category}
                                                /*  disabled */
                                                helperText={errors.category ? 'Выберите один из вариантов' : ''}>
                                                <MenuItem value="news">Новости</MenuItem>
                                                <MenuItem value="articles">Статьи</MenuItem>
                                                <MenuItem value="reviews">Обзоры</MenuItem>
                                            </TextField>
                                        </FormControl>

                                        <div className='button-enter'>
                                            <Button /* disabled={!isValid} */ variant="contained" style={{ width: '200px', height: '50px' }} type='submit' /* onClick={() => { createPost() }} */ >
                                                Сохранить
                                            </Button>
                                        </div>

                                    </div>
                                </form>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <CustomDialog />

        </>
    );
}

export default EditPost;