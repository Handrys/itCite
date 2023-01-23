import { useEffect } from 'react'
import { useState } from 'react'
import s from './Comment.module.css'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { useContext } from 'react';
import { Context } from '../../../../../state';
import CustomDialog from '../../../../CustomDialog/CustomDialog';


export const Comment = ({ item, confirmCommentDelete }) => {

    const { state, dispatch } = useContext(Context)
    const { posts, user } = state;
    const { data, isPending } = posts;
    const { authorized, userData } = user;
    const [isAuthor, setisAuthor] = useState(false)

    useEffect(() => {
        if (user.userData) {
            (user.userData._id === item.author._id || user.userData.role === 'admin') ? setisAuthor(true) : setisAuthor(false)
        }
    }, [])

    const [styles, setStyles] = useState({
        role: {
            color: '#1976d2'
        }
    })

    useEffect(() => {
        item.author.role === 'user' && setStyles({ role: { color: '#1976d2' } })
        item.author.role === 'admin' && setStyles({ role: { color: '#a85446' } })
    }, [item.author])

/*     const confirmCommentDelete = () => dispatch({
        type: 'isOpenDialog',
        payload: {
            isOpen: true,
            variant: 'confirm',
            dialogTitle: 'Подтверждение',
            dialogText: 'Вы действительно хотите удалить этот комментарий?',
            propsDialog: {
                isConfirmed: () => deleteComment(item._id)
            }
        }
    }); */

  
    return (
        <div className={s.comment}>
            <div className={s.author}>
                <div className={s.avatar}><img src={item.author.avatarUrl} alt="" /></div>
                <div className={s.info}>
                    <div className={s.name} style={styles.role}>{item.author.fullName}</div>
                    <div className={s.text}>{item.text}</div>

                </div>
            </div>
            <div className={s.addition}>
            <div className={s.date}>{item.createdAt}</div>
            {isAuthor && 
                 <div className={s.delete}><Button onClick={() => confirmCommentDelete(item._id)} /* endIcon={<DeleteIcon fontSize='large' />} */ size='small' color='error'>удалить</Button></div>
            }
           
            </div>
     
        </div>
       
    );
}


