
import React from "react";
import AddPost from "./AddPost/AddPost";
import Post from './Post/Post';
import postListJSON from "../../../JSON/response-news-main-page.json";

const PostList = () => {

    const [blogArr, setBlogArr] = React.useState(postListJSON);
    const [showAddForm, setShowAddForm] = React.useState(true);


    /*     const handleShowAddForm = () => {
            setShowAddForm({
                showAddForm: true
            })
        }
    
        const handleHideAddForm = () => {
            setShowAddForm({
                showAddForm: false
            })
        }
     */


    const addNewPost = (blogPost) => {
        const temp = [...blogArr];
        temp.push(blogPost);
        setBlogArr(temp)
    }

    const posts = blogArr.map((item, pos) => {
        return (
            <Post
                title={item.title}
                image={item.image}
                author={item.author}
                publish_date={item.publish_date}
                deletePost={() => this.deletePost(pos)}
                
            />
        )
    })

    return (
        <div className="post-list">
            {
                showAddForm ? <AddPost blogArr={blogArr} addNewPost = {addNewPost} />
                    : null
            }
            {posts}
        </div>
    );
}

export default PostList

//Сделать проверку.В зависимости от того что в пропсах - берем данные или из одного файла или из другого УСЛОВНЫЙ РЕНДЕРИНГ