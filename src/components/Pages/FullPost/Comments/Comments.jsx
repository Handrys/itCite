import { useContext } from 'react';
import { Context } from '../../../../state';
import { Author } from '../../../Author/Author';
import s from './Comments.module.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import SendIcon from '@mui/icons-material/Send';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { Comment } from './Comment/Comment';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useAddComment, useDeleteComment, useGetComments } from '../../../../shared/queries';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useEffect } from 'react';


export const Comments = ({ postId, refetchPost }) => {

    const { state, dispatch } = useContext(Context)
    const { posts, user } = state;
    const { authorized, userData } = user;
    const { status, isLoading, data: commentList, error, isFetching, refetch } = useGetComments(postId);

    const [comments, setComments] = useState([]);
    const [commentsView, setCommentsView] = useState(9)
    const [commentsCount, setCommentsCount] = useState(comments.length)
    
    /* if (!userData) return null */

    const addCommentsView = () => { setCommentsView(commentsView + 9) }

    const {
        register,
        getValues,
        handleSubmit,
        onSubmit,
        formState: { errors, isValid },
        setValue,
        control
    } = useForm({
        mode: 'onChange',
        /*         reValidateMode: 'onSubmit', */
    });

    const badDialogOpen = () => dispatch({
        type: 'isOpenDialog',
        payload: {
            isOpen: true,
            variant: 'error',
            dialogTitle: 'Создание комментария',
            dialogText:'Ошибка! Комментарий не добавлен.'
        }
    });

    useEffect(() => {
        if (commentList) {
            setComments(commentList)         
        }

    }, [commentList])



    const useCommentAdd = useAddComment();
    const useCommentDelete = useDeleteComment();

    const addComment = (text) => {
        const publishDate = new Date().toLocaleString();
        const data = {
            userId: userData._id,
            postId: postId,
            text: text.text, 
            createdAt: publishDate
        }

        useCommentAdd.mutateAsync(data)
            .then(() => {
                console.log('ok')
                refetchPost()
            })
            .catch((err) => {
                badDialogOpen()
            })
        setValue('text','')    
    }

    const confirmCommentDelete = (id) => dispatch({
        type: 'isOpenDialog',
        payload: {
            isOpen: true,
            variant: 'confirm',
            dialogTitle: 'Подтверждение',
            dialogText: 'Вы действительно хотите удалить этот комментарий?',
            propsDialog: {
                isConfirmed: () => deleteComment(id)
            }
        }
    });

    const deleteComment = (id) => {
        const data = {
            userId: userData._id,
            postId: postId,
            commentId: id
        }
        useCommentDelete.mutateAsync(data)
            .then(() => {
                console.log('ok')
                refetchPost()
            })
            .catch((err) => {
            })
    }
    


    if (isFetching) return null
    console.log(comments)

    return (
        <div className={s.comments}>
            <h2 className={s.title}>Комментарии</h2>
            <div className={s.list}>
                {/*   <Comment avatarUrl={userData.avatarUrl} fullName={'Вячеслав Кабачков'} commentText={'Неплохо, наконец-то годная обнова!'} publishDate={'15.01.2023'} /> */}
                {
                    commentList.slice().reverse().slice(0, commentsView).map((item, pos) => {

                     return (
                            <Comment
                                key={pos}
                                item = {item}
                                deleteComment = {deleteComment}
                                confirmCommentDelete = {confirmCommentDelete}
                              /*   isAuthor = {item.author._id === userData._id || user.userData.role === 'admin'} */
                                />
                        );

                    })
                }
            </div>
            <div className={s.more}>
                <Button disabled={commentsCount <= commentsView} onClick={addCommentsView} /* disabled */ size='small' color="primary" variant="text">Еще...</Button>
            </div>
            {(authorized && userData) &&
                <div className={s.new}>
                    <form onSubmit={handleSubmit(addComment)} action="">
                        <Box component="span" sx={{ p: 3, border: '1px solid #E6E6E6', display: 'flex', alignItems: 'center' /* , justifyContent: 'center'  */ }}>
                            <TextField
                                {...register('text', {
                                    required: {
                                        value: true,
                                        message: '*Обязательное поле'
                                    },
                                    /*                                 pattern: {
                                                                        value: /^[a-z,A-Z,А-Я,а-я,0-9 ]{3,24}$/,
                                                                        message: 'Введите корректные данные'
                                                                    } */
                                    maxLength: {
                                        value: 200,
                                        message: 'Максимум 200 символов'
                                    },
                                    minLength: {
                                        value: 3,
                                        message: 'Минимум 3 символа'
                                    }
                                })}
                                /* helperText={errors.text ? errors.text.message : ''} */
                                error={errors.text}
                                id="outlined-multiline-flexible"
                                label= {errors.text ? errors.text.message : 'Новый комментарий'}
                                /* size='small' */
                                fullWidth
                                style={{ borderRadius: '20px' }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <IconButton>
                                                <Avatar sx={{ width: 36, height: 36 }} alt="Remy Sharp" src={userData.avatarUrl} />
                                            </IconButton>

                                        </InputAdornment>
                                    )
                                }}
                            />

                            <Fab type='submit' color="primary" aria-label="add" size='small' sx={{ backgroundColor: '#01579b', marginLeft: '7px' }}>
                                <SendIcon fontSize='small' />
                            </Fab>


                        </Box>
                    </form>

                </div>
            }
        

        </div>
    );
}