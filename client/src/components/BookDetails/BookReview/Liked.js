export const Liked = (e, filledHeart, nonFilledHeart, user, likedByUser, currentLikedBook, likeId, likesObject) => {

    if (e.target.className == nonFilledHeart && !likedByUser) {

        e.target.className = filledHeart

        if (currentLikedBook) {
            currentLikedBook.total_likes += 1
            currentLikedBook.user_liked.push(user._id)
            currentLikedBook.liked = true
        } else {
            likesObject.total_likes += 1
            likesObject.user_liked.push(user._id)
            likesObject.liked = true
        }



    } else if (e.target.className == filledHeart && likedByUser) {

        e.target.className = nonFilledHeart
        if (currentLikedBook) {
            currentLikedBook.total_likes -= 1
            currentLikedBook.user_liked = currentLikedBook.user_liked.filter(e => e !== user._id);
            likeId = currentLikedBook._id
        } else {
            likesObject.total_likes -= 1
            likesObject.user_liked = currentLikedBook.user_liked.filter(e => e !== user._id);
            likeId = likesObject._id
        }


    }


    return e, filledHeart, nonFilledHeart, user, likedByUser, currentLikedBook, likeId, likesObject
}