import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import './Post.css';
import PostMenu from './PostMenu/PostMenu';
import PostMenuDialog from './PostMenuDialog/PostMenuDialog';
import Dialog from '@mui/material/Dialog';
import PostMenuDialogStatus from './PostMenuDialog/PostMenuDialogStatus/PostMenuDialogStatus';

export const Post = (props) => {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const handleDialogOpen = () => setDialogOpen(true);
    const handleDialogClose = () => setDialogOpen(false);





   /*  isDeleted ? handleDialogStatusOpen() : handleDialogStatusClose() */
   /*  props.isDeleted ? console.log('yes') : console.log('no') */



    return (
        <div className="post" /*  onClick={() => {console.log(item); console.log(id)}} */>
            <div className="post__img">
                <img src={props.image} alt="" />
                <span>{props.category}</span>
                <div className="delete-icon" /* onClick={deletePost} */><PostMenu
                    category={props.category}
                    blogPost={props.item}
                    deletePost={props.deletePost}
                    dialogOpen={dialogOpen}
                    handleDialogOpen={handleDialogOpen}
                    handleDialogClose={handleDialogClose}
                />
                </div>
            </div>
            <div className="post__content">
                <div className="post__content-title">{props.title}</div>
                <div className="post__content-author">
                    <div className="post-author__avatar"><img src="https://kod.ru/content/images/size/w50/2020/04/------2.jpg" alt="" /></div>
                    <div className="post-author__info">
                        <div className="post-author-info__name">{props.author}</div>
                        <div className="post-author-info__date">
                            {props.publish_date}
                        </div>
                    </div>
                </div>
            </div>

            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
            >
                <PostMenuDialog
                    open={dialogOpen}
                    onClose={handleDialogClose}
                    blogPost={props.item}
                    deletePost={props.deletePost}

                   
                />
            </Dialog>

           
        </div>);
}

export default Post;