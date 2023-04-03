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
                    <div className={s.infoName}>
                        <div className={s.firstName}>{userData.firstName}</div>
                        <div className={s.lastName}>{userData.lastName}</div>
                    </div>
                    <div className={s.userName}>@{userData.nickName}
                        <span style={styles.role} className={`${s.role}`}>{`(${user.userData.role})`}</span>
                    </div>
                
                    <div className={s.infoDescription}>
                        <div className={s.descriptionTitle}></div>
                        <div className={s.descriptionText}>{user.userData.description}</div>
                    </div>
                </div>
           
        </div>
    );
}

export default ProfileTitle;
