import React, { useEffect } from "react";
import ProfileData from "./ProfileData/ProfileData";
import s from './Profile.module.css'
import ProfileMore from './ProfileTitle/ProfileTitle';
import ProfilePosts from './ProfilePosts/ProfilePosts';
import ProfileTitle from "./ProfileTitle/ProfileTitle";
import { Navigate, unstable_HistoryRouter } from "react-router-dom";
import { Context } from "../../../state";
import { useContext } from "react";
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

const Profile = () => {


    const { state, dispatch } = useContext(Context)
    const { posts, user } = state;
    const { authorized, userData } = user;

    if (!user.userData) return null
    /* console.log(user) */

    return user.userData ? (
        <div className={s.profile}>
            <div className="container">
                {(!user.userData && authorized) ?
                    <div className="progress"><CircularProgress /><Button variant="text">Загрузка...</Button></div>
                    :
                    <div className={s.body}>

                        <div className={s.column}>
                            <div className={s.title}>
                                <ProfileTitle />
                            </div>
                            <div className={s.data}>
                                <ProfileData />
                            </div>
                        </div>
                        <div className={s.column}>
                            <div className={s.posts}>
                                <ProfilePosts />
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    ) : (
        <Navigate replace to='/' />

    )
}

export default Profile;