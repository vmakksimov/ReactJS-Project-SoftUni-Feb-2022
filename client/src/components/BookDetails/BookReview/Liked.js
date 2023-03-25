export const Liked = (e, filledHeart, nonFilledHeart, bookId, likedByUser, user, newBook, currentLikedBook) => {
    let likesObject;
    if (e.target.className == nonFilledHeart && !likedByUser) {

        e.target.className = filledHeart
        // newBook.liked = "true"

        // if (bookId.length <= 1) {
        //     newBook.total_likes += 1
        //     newBook.liked_by.push(user._id)
        // } else {
        //     newBook.total_likes = Number(0)
        //     newBook.total_likes += 1
        //     newBook.liked_by = []
        //     newBook.liked_by.push(user._id)
        //     newBook = {...newBook}
        // }

        if (!currentLikedBook) {
            likesObject = { "user_liked": [], 'book_id': bookId, "total_likes": 0, "liked": true, "reviews": [] }
        } else {
            currentLikedBook.total_likes += 1
            currentLikedBook.user_liked.push(user._id)
            currentLikedBook.liked = true
        }



    } else if (e.target.className == filledHeart) {


        if (likedByUser){
            e.target.className = nonFilledHeart
            currentLikedBook.total_likes -= 1
            currentLikedBook.user_liked = currentLikedBook.user_liked.filter(e => e !== user._id);
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
    }


    return filledHeart, nonFilledHeart, bookId, likedByUser, user, newBook, currentLikedBook
}