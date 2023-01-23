import s from './Author.module.css'


export const Author = ({avatarUrl, fullName, publishDate}) => {
    return (
        <div className={s.author}>
            <div className={s.author__avatar}><img src={avatarUrl} alt="" /></div>
            <div className={s.author__info}>
                <div className={s.author__name}>{fullName}</div>
                <div className={s.author__date}>
                    Создано: {publishDate}
                </div>
            </div>
        </div>
    );
}

