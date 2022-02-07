import Content from "../../Content/Content";
import PagesDescription from "../PagesDescription/PagesDescription";
import postListReviews from "../../../JSON/response_test_3.json";
import React from "react";

const Reviews = () => {
const [postList, setPostList] = React.useState(postListReviews);
const [category, setCategory] = React.useState('reviews')
const postWidth = '30%'
    return ( 
        <div className="reviews">
            <div className="container">
                <div className="reviews__body">
                <PagesDescription/>
                <Content postListArr = {postList} postWidth={postWidth} category = {category}/>
                </div>
            </div>
        </div> 
    );
}

export default Reviews;