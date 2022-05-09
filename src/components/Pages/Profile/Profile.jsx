import React from "react";
import ProfileData from "./ProfileData/ProfileData";
import s from './Profile.module.css'
import ProfileMore from './ProfileTitle/ProfileTitle';
import ProfilePosts from './ProfilePosts/ProfilePosts';
import ProfileTitle from "./ProfileTitle/ProfileTitle";


const Profile = () => {
    return (
        <div className={s.profile}>
            <div className="container">
                <div className={s.profile__body}>
                    <div className={s.column}>
                        <div className={s.title}>
                            <ProfileTitle/>
                        </div>
                        <div className={s.data}>
                            <ProfileData/>
                        </div>
                    </div>
                    <div className={s.column}>
                        <div className={s.posts}>
                        <ProfilePosts/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;