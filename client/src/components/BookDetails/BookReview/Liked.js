export const Liked = (e, active, user, likedByUser, currentLikedBook, likeId, likesObject, deleteLikeHandler, currentHeart) => {

    // if (e.target.className == nonFilledHeart && !likedByUser) {

    //     e.target.className = filledHeart

    //     if (currentLikedBook) {
    //         currentLikedBook.total_likes += 1
    //         currentLikedBook.user_liked.push(user._id)
    //         currentLikedBook.liked = true
    //     } else {
    //         likesObject.total_likes += 1
    //         likesObject.user_liked.push(user._id)
    //         likesObject.liked = true
    //     }

    if (!active && !likedByUser){
        console.log('active??')
        currentHeart = 'false'
        if (currentLikedBook) {
            currentLikedBook.total_likes += 1
            currentLikedBook.user_liked.push(user._id)
            currentLikedBook.liked = true
        } else {
            likesObject.total_likes += 1
            likesObject.user_liked.push(user._id)
            likesObject.liked = true
        }
    
    } else if (active && likedByUser){
        console.log('hereeee')
        currentHeart = 'true'
        if (currentLikedBook) {
            currentLikedBook.total_likes -= 1
            if (currentLikedBook.total_likes <= 0){
                currentLikedBook.liked = false
              
                // if (currentLikedBook.reviews.length <= 0){
                    
                //     bookService.removeLiked(currentLikedBook._id)
                //     deleteLikeHandler(currentLikedBook._id)
                // }
            }
            currentLikedBook.user_liked = currentLikedBook.user_liked.filter(e => e !== user._id);
            likeId = currentLikedBook._id
        } else {
            likesObject.total_likes -= 1
            if (currentLikedBook.total_likes <= 0){
                likesObject.liked = false
              
                // if (likesObject.reviews.length <= 0){
                //     bookService.removeLiked(likesObject._id)
                //     deleteLikeHandler(likesObject._id)
                // }
            }
            likesObject.user_liked = currentLikedBook.user_liked.filter(e => e !== user._id);
            likeId = likesObject._id
        }
    }
    // } else if (e.target.className == filledHeart && likedByUser) {

    //     e.target.className = nonFilledHeart
    //     if (currentLikedBook) {
    //         currentLikedBook.total_likes -= 1
    //         if (currentLikedBook.total_likes <= 0){
    //             currentLikedBook.liked = false
              
    //             // if (currentLikedBook.reviews.length <= 0){
                    
    //             //     bookService.removeLiked(currentLikedBook._id)
    //             //     deleteLikeHandler(currentLikedBook._id)
    //             // }
    //         }
            
            
    //         currentLikedBook.user_liked = currentLikedBook.user_liked.filter(e => e !== user._id);
    //         likeId = currentLikedBook._id
    //     } else {
    //         likesObject.total_likes -= 1
    //         if (currentLikedBook.total_likes <= 0){
    //             likesObject.liked = false
              
    //             // if (likesObject.reviews.length <= 0){
    //             //     bookService.removeLiked(likesObject._id)
    //             //     deleteLikeHandler(likesObject._id)
    //             // }
    //         }
    //         likesObject.user_liked = currentLikedBook.user_liked.filter(e => e !== user._id);
    //         likeId = likesObject._id
    //     }


    // }

    console.log(currentHeart)
    return e, active, user, likedByUser, currentLikedBook, likeId, likesObject, currentHeart
}