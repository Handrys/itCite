import './PagesDescription.css'
import Button from '@mui/material/Button';

const PagesDescription = (handleShowAddForm) => {
    return ( 
        <div className="pages-description">
            <div className="pages-description__body">
                <div className="pages-description__title">Новости</div>
                <div className="pages-description__text">
                Главные события вокруг российской и мировой IT-индустрии. Только свежая и ценная информация.
                </div>
                <div className="pages-description__value">9358 публикаций</div>

            </div>
        </div>
    );
}

export default PagesDescription;