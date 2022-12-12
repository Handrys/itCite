import './PagesDescription.css'
import Button from '@mui/material/Button';

const PagesDescription = (props) => {
    return ( 
        <div className="pages-description">
            <div className="pages-description__body">
                <div className="pages-description__title">{props.categoryTitle}</div>
                <div className="pages-description__text">
                {props.categoryDescription}
                </div>
                <div className="pages-description__value">{props.postsCount} публикаций</div>

            </div>
        </div>
    );
}

export default PagesDescription;