import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Context } from '../../../../state';
import { useDeleteLike, useAddLike, useGetLikes, useMutationLikes } from '../../../../shared/queries';

export const Likes = ({ postId, postLikes, refetchPost }) => {

    const { state, dispatch } = React.useContext(Context)
    const { posts, user } = state;
    const { data, isPending } = posts;
    const { authorized, userData } = user;
    const { status, isLoading, data: likeList, error, isFetching, refetch } = useGetLikes(postId);


    const label = { inputProps: { 'aria-label': '111' } };
    const [likes, setLikes] = React.useState([])
    const [isLiked, setIsLiked] = React.useState({status: false})
    /* const [likes, setLikes] = React.useState([]) */



    React.useEffect(() => {
        if (likeList) {
            setLikes(likeList)
            setIsLiked({status: false})
            console.log(likes)
            console.log(likeList)
            likes.map((item, index) => {
                if (userData) {
               
                    userData._id === item.user._id && setIsLiked({status: true, id: item._id})
                    console.log(isLiked)

                }

            })
        }

    }, [likeList])

    /*   const useLikesMutation = useMutationLikes(); */
    const useLikeAdd = useAddLike();
    const useLikeDelete = useDeleteLike();


    console.log(isLiked)



    /*   const changeLike = () => {
          const likesList = likes;
  
          const addLike = () => {
              likesList.push(userData)
              setLikes(likesList)
              setIsLiked(true)
          }
  
          const deleteLike = () => {
              likesList.map((item, index) => {
                  item._id === userData._id && likesList.splice(index, 1   )
              })
              setLikes(likesList)
              setIsLiked(false)
          }
  
          isLiked ? deleteLike() : addLike()
  
  
  
  
          console.log(likesList)
          useLikesMutation.mutateAsync({ postId, likesList })
              .then(() => {
                  console.log('ok')
                 
              })
              .catch((err) => {
               
              })
  
      } */

    const changeLike = () => {
        const userId = userData._id
        const likeId = isLiked.id
        const data = {userId,postId,likeId}

        const addLike = () => {
            useLikeAdd.mutateAsync(data)
                .then(() => {
                    refetch()
                })
                .catch((err) => {
                    /* refetch() */
                })

        }

        const removeLike = () => {
            useLikeDelete.mutateAsync(data)
                .then(() => {
                    console.log('ok')
                   /*  setIsLiked({status:false}) */
                    refetch()
                })
                .catch((err) => {
                    /*  badDialogOpen() */
                })

        }

        isLiked.status ? removeLike() : addLike()



    }
 
    const likesPeople = likes.slice(0, 2).map((item, index, key) => {
        console.log(item)
        return (
            <img style={{ width: '24px', height: '24px', borderRadius: '50%', margin: '3px' }} src={item.user.avatarUrl} alt="" />
        );
    })


    return (
        <Box sx={{ display: 'flex', alignItems: 'center', alignSelf: 'flex-end' }}>
            <Button>Нравится</Button>
            {likesPeople}
            <Button style={{ minWidth: '30px' }}>{likes.length}</Button>



            <Checkbox disabled={!authorized} onClick={changeLike} {...label} checked={isLiked.status} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
        </Box>
    );
}