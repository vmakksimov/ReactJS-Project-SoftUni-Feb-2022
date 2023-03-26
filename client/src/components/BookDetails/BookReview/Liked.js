export const Liked = (e, filledHeart, nonFilledHeart, bookId, likedByUser, user, newBook, currentLikedBook, likeId, likesObject) => {


    if (e.target.className == nonFilledHeart && !likedByUser) {

        e.target.className = filledHeart

        if (!currentLikedBook) {
            likesObject = { "user_liked": [user._id], 'book_id': bookId, "total_likes": 1, "liked": true, "reviews": [], "title": newBook['title'], "image": newBook['image'] }
        } else {
            currentLikedBook.total_likes += 1
            currentLikedBook.user_liked.push(user._id)
            currentLikedBook.liked = true
        }

    } else if (e.target.className == filledHeart) {

        e.target.className = nonFilledHeart
        if (likedByUser) {
            currentLikedBook.total_likes -= 1
            currentLikedBook.user_liked = currentLikedBook.user_liked.filter(e => e !== user._id);
            likeId = currentLikedBook._id
        }

    }
        
        // newBook.liked = "false"
        // newBook.total_likes >= 1

        // if (bookId.length <= 1) {
        //     newBook.total_likes -= 1
        //     newBook.liked_by = newBook.liked_by.filter(e => e !== user._id);
        // } else {
        //     newBook.total_likes = Number(newBook.total_likes)
        //     newBook.total_likes -= 1
        //     newBook.liked_by = []
        //     newBook.liked_by = newBook.liked_by.filter(e => e !== user._id);
        //     newBook = { ...newBook }
        // }
    


    return likesObject, likeId
}