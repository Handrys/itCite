import TextField from '@mui/material/TextField';

const Login =  () => {
    return ( 
        <div className="login">
            <div className="container">
                <div className="login__body">
                    <div className="login__window">
                        <div className="login-window__top"></div>
                        <div className="login-window__form">
                            <form action="">
                                <TextField id="outlined-basic" label="Имя пользователя" variant="outlined" />
                                <TextField id="outlined-basic" label="Пароль" variant="outlined" />
                            </form>
                        </div>
                        <div className="login-window__bottom"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;