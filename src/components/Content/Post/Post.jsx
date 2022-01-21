import DeleteIcon from '@mui/icons-material/Delete';
import './Post.css';

export const Post = ({
    title,
    image,
    author,
    publish_date,
}) => {
    return ( 
    <div className="post">
        <div className="post__img"><img src={image} alt="" /></div>
        <div className="post__content">
            <div className="post__content-title">{title}</div>
            <div className="post__content-author">
                <div className="post-author__avatar"><img src="https://kod.ru/content/images/size/w50/2020/04/------2.jpg" alt="" /></div>
                <div className="post-author__info">
                    <div className="post-author-info__name">{author}</div>
                    <div className="post-author-info__date">
                        {publish_date}
                    </div>
                </div>
            </div>
        </div>
    </div> );
}

export default Post;