import Box from '@mui/material/Box';
import avatar from '../../../../img/pages/avatar.jpg'
import s from './ProfileData.module.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { alpha, styled } from '@mui/material/styles';

const ProfileData = () => {

    const CssTextField = styled(TextField)({
        '& label.Mui-focused': {
            color: 'white',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'green',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'none',
            },
            '&:hover fieldset': {
                borderColor: 'none',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'none',
            },
        },
    });




    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '15px',
                    backgroundColor: '#06b4cf',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '30px',
                    boxSizing: 'border-box'
                    /* '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7],
                    }, */
                }}
            >
                <div className={s.top}>
                    <div className={s.avatar}>
                        <img src={avatar} alt="" />
                    </div>
                    <div className={s.info}>
                        <div className={s.firstName}>Программист</div>
                        <div className={s.lastName}>Программистов</div>
{/*                         <CssTextField label="" id="custom-css-outlined-input" />
                        <CssTextField label="" id="custom-css-outlined-input" /> */}
                        <div className={s.isOnline}>Онлайн*</div>
                    </div>
                </div>
                <div className={s.bottom}>
                    <div className={s.item}>
                        <span className={s.item__name}>Фамилия:</span>
                        <TextField style={{ color: 'white' }} id="standard-basic" label="" variant="standard" />
                    </div>
                    <div className={s.item}>
                        <span className={s.item__name}>Имя:</span>
                        <TextField className={s.item__input} id="standard-basic" label="" variant="standard" />
                    </div>
                    <div className={s.item}>
                        <span className={s.item__name}>E-mail:</span>
                        <TextField id="standard-basic" label="" variant="standard" />
                    </div>
                    <div className={s.item}>
                        <span className={s.item__name}>Логин:</span>
                        <TextField id="standard-basic" label="" variant="standard" />
                    </div>
                    <div className={s.item}>
                        <span className={s.item__name}>Пароль:</span>
                        <TextField id="standard-basic" label="" variant="standard" />
                    </div>
                    <div className={s.item}>
                        <span className={s.item__name}>Дата регистрации:</span>
                        <div>05.05.2022</div>
                    </div>
                    <div className={s.button}>
                        <Button variant="contained">Сохранить</Button>
                    </div>
                </div>



            </Box>
        </>
    );
}

export default ProfileData;