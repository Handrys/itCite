import Box from '@mui/material/Box';
import s from './ProfileTitle.module.css'
import avatar from '../../../../img/pages/avatar.jpg'
import { flexbox } from '@mui/system';
import { Context } from '../../../../state';
import { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';




const ProfileTitle = () => {

    const { state, dispatch } = useContext(Context)
    const { posts, user } = state;
    const { authorized, userData } = user;

    const [styles, setStyles] = useState({
        role: {
            color: '#1976d2'
        }
    })
    
    useEffect(() => {
        if (user.userData){
            user.userData.role === 'user' && setStyles({role:{color:'#1976d2'}})
            user.userData.role === 'admin' && setStyles({role:{color:'#a85446'}})
        }
    },[user])

    return (
        <div className={s.profileTitle}>

                <div className={s.avatar}>
                    <img src={user.userData.avatarUrl} alt="" />
                </div>
                <div className={s.info}>
                    <div className={s.info__name}>
                        <div className={s.info__firstName}>{userData.firstName}</div>
                        <div className={s.info__lastName}>{userData.lastName}</div>
                    </div>
                    <div className={s.info__userName}>@{userData.nickName}
                        <span style={styles.role} className={`${s.status__condition}`}>{`(${user.userData.role})`}</span>
                    </div>
                    {/*  <div className={s.info__status}>
                    {<div className={`${s.info__statusAccount} + ${s.info__statusElement}`}>
                        <div className={` ${s.statusAccount__title} + ${s.status__title}`}>Аккаунт: <span></span></div>
                        <div className={` ${s.statusAccount__condition} + ${s.status__condition}`}>Подтвержден</div>
                    </div>}
                   { <div className={`${s.info__statusRole} + ${s.info__statusElement}`}>
                        <div className={` ${s.statusRole__title} + ${s.status__title}`}>Статус:</div>
                        <div className={` ${s.statusRole__condition} + ${s.status__condition}`}>Администратор</div>
                    </div>}
                </div> */}
                    <div className={s.infoDescription}>
                        <div className={s.infoDescription__title}></div>
                        <div className={s.infoDescription__text}>{user.userData.description}</div>
                    </div>
                </div>
           
        </div>
    );
}

export default ProfileTitle;
