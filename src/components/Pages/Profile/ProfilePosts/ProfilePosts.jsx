import Box from '@mui/material/Box';
import s from './ProfilePosts.module.css'
import InstallDesktopIcon from '@mui/icons-material/InstallDesktop';
import sadImg from '../../../../img/pages/profile-sad.png'

const ProfilePosts = () => {
    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '15px',
                    backgroundColor: '#EAEAEA',
                    boxShadow: '3px 5px 4px rgba(0, 0, 0, 0.25)',
                    padding: '25px',
                    boxSizing: 'border-box',
                    /* '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7],
                    }, */
                }}
            >
                <div className={s.top}>
                    <div className={s.title}>Мои посты</div>
                    <div className={s.subtitle}>
                        <InstallDesktopIcon color="action" />
                        <div className={s.subtitle__value}>0</div>
                    </div>
                </div>
                <div className={s.content}>
                    <div className={s.content__none}>
                        <img src={sadImg} alt="" />
                        <span>Вы не создали ни одного поста... <br/> Не пора-ли это исправить?</span>
                    </div>
                </div>
            </Box>
        </>
    );
}

export default ProfilePosts;