import Box from '@mui/material/Box';
import s from './ProfileTitle.module.css'
import avatar from '../../../../img/pages/avatar.jpg'
import { flexbox } from '@mui/system';

const ProfileTitle = () => {
    return(
    <>
        <Box
            sx={{
                width: '100%',
                height: '100%',
                backgroundColor: '#EAEAEA',
                borderRadius: '15px',
                padding: '25px',
                boxSizing: 'border-box',
                display: 'flex',
                boxShadow: '3px 5px 4px rgba(0, 0, 0, 0.25)'
                /* '&:hover': {
                    backgroundColor: 'primary.main',
                    opacity: [0.9, 0.8, 0.7],
                }, */
            }}
        >
            <div className={s.avatar}>
                <img src= {avatar} alt="" />
            </div>
            <div className={s.info}>
                <div className={s.info__name}>
                    <div className={s.info__firstName}>Дмитрий</div>
                    <div className={s.info__lastName}>Реактов</div>
                    <div className={s.info__userName}>@admin123</div>
                </div>
                <div className={s.info__status}>
                    <div className={`${s.info__statusAccount} + ${s.info__statusElement}`}>
                        <div className={` ${s.statusAccount__title} + ${s.status__title}`}>Аккаунт: <span></span></div>
                        <div className={` ${s.statusAccount__condition} + ${s.status__condition}`}>Подтвержден</div>
                    </div>
                    <div className={`${s.info__statusRole} + ${s.info__statusElement}`}>
                        <div className={` ${s.statusRole__title} + ${s.status__title}`}>Уровень:</div>
                        <div className={` ${s.statusRole__condition} + ${s.status__condition}`}>Администратор</div>
                    </div>
                </div>
            </div>
        </Box>
    </>
    );
}

export default ProfileTitle;
