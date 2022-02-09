import DeleteIcon from '@mui/icons-material/Delete';
import './Post.css';


export const Post = ({
    item,
    id,
    title,
    image,
    author,
    publish_date,
    postWidth,
    deletePost,
    category
}) => {
    return ( 
    <div className="post" style={{width: postWidth}}/*  onClick={() => {console.log(item); console.log(id)}} */>
        <div className="post__img">
            <img src={image} alt="" />
            <span>{category}</span>
            <div className="delete-icon" onClick={deletePost}>{/* <DeleteIcon style = {{fontSize: '42px', color: 'black'}} /> */}...</div>
        </div>
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