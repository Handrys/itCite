import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Context } from '../../../../state';
import { useMutationLikes } from '../../../../shared/queries';

export const Likes = ({ postId, postLikes, refetchPost }) => {

    const { state, dispatch } = React.useContext(Context)
    const { posts, user } = state;
    const { data, isPending } = posts;
    const { authorized, userData } = user;

    const label = { inputProps: { 'aria-label': '111' } };

    const [isLiked, setIsLiked] = React.useState(false)
    const [likes, setLikes] = React.useState(postLikes)



    React.useEffect(() => {
        if (likes) {
            likes.map((item, index) => {
                userData._id === item._id ? setIsLiked(true) : setIsLiked(false)
            })
        }

    }, [likes.length])

    const useLikesMutation = useMutationLikes();


    const changeLike = () => {
        const likesList = likes;

        const addLike = () => {
            likesList.push(userData)
            setLikes(likesList)
            setIsLiked(true)
        }

        const deleteLike = () => {
            likesList.map((item, index) => {
                item._id === userData._id && likesList.splice(index, 1)
            })
            setLikes(likesList)
            setIsLiked(false)
        }

        isLiked ? deleteLike() : addLike()




        console.log(likesList)
        useLikesMutation.mutateAsync({ postId, likesList })
            .then(() => {
                console.log('ok')
                /* refetchPost() */
            })
            .catch((err) => {
                /*  badDialogOpen() */
            })

    }

    const likesPeople = likes.slice(0, 2).map((item, index) => {
        console.log(item)
        return (
            <img style={{ width: '24px', height: '24px', borderRadius: '50%', margin: '3px' }} src={item.avatarUrl} alt="" />
        );
    })


    return (
        <Box sx={{ display: 'flex', alignItems: 'center', alignSelf: 'flex-end' }}>
            <Button>Нравится</Button>
            {likesPeople}
            <Button style={{ minWidth: '30px' }}>{likes.length}</Button>



            <Checkbox onClick={changeLike} {...label} checked={isLiked} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
        </Box>
    );
}