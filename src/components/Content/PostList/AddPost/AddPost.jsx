import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import './AddPost.css'

const AddPost = (props) => {

    const [form, setForm] = React.useState({
        category: '',
        title: '',
        description: ''
    })
    const update = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const createPost = () => {
        const post = {
            title: form.title,
            image: "https://kod.ru/content/images/size/w1250/2022/01/Tesla.png",
            publish_date: "2022-01-19T10:09:36.245909Z",
            author: "Программист Программистов"
        }
        console.log(post)
        console.log(props)
        props.addNewPost(post)
    }

    return (
        <div className='add-post'>
            <div className="add-post__form">
                <FormControl fullWidth className='' label="Категория:">
                    <div className="form-top">
                        <div className="form-top__close">X</div>
                    </div>
                    <div className="form-content">
                        <div>
                            <TextField id="post-name" error label="Название поста" variant="outlined" required style={{ width: '100%' }} onChange={update} value={form.title} name='title' />
                        </div>
                        <div>
                            <TextField id="post-text" label="Описание" variant="outlined" required multiline style={{ width: '100%', margin: '20px 0' }} onChange={update} value={form.description} name='description' />
                        </div>
                        <div>
                            <TextField id="select" label="Категория:" value={form.category} select style={{ width: '100%' }} onChange={update} name='category'>
                                <MenuItem value="10">Новости</MenuItem>
                                <MenuItem value="20">Статьи</MenuItem>
                                <MenuItem value="20">Обзоры</MenuItem>
                            </TextField>
                        </div>
                        <div className='button-enter'>
                            <Button variant="contained" style={{}} onClick={createPost} >Добавить пост</Button>
                        </div>
                    </div>
                </FormControl>
            </div>
            <div className="overlay"></div>

        </div>
    );
}

export default AddPost;