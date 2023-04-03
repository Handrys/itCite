import s from './Author.module.css'


export const Author = ({avatarUrl, fullName, publishDate, publishTime}) => {
    return (
        <div className={s.author}>
            <div className={s.avatar}><img src={avatarUrl} alt="" /></div>
            <div className={s.info}>
                <div className={s.name}>{fullName}</div>
                <div className={s.date}>
                    Создано: {publishDate} в {publishTime}
                </div>
            </div>
        </div>
    );
}


