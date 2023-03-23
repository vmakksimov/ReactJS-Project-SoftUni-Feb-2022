export const Liked = (e, filledHeart, nonFilledHeart, bookId, likedByUser, user, newBook) => {

    if (e.target.className == nonFilledHeart && !likedByUser) {

        e.target.className = filledHeart
        newBook.liked = "true"

        if (bookId.length <= 1) {
            newBook.total_likes += 1
            newBook.liked_by.push(user._id)
        } else {
            newBook.total_likes = Number(0)
            newBook.total_likes += 1
            newBook.liked_by = []
            newBook.liked_by.push(user._id)
        }

    } else if (e.target.className == filledHeart && newBook.total_likes >= 1) {
        e.target.className = nonFilledHeart
        newBook.liked = "false"

        if (bookId.length <= 1) {
            newBook.total_likes -= 1
            newBook.liked_by = newBook.liked_by.filter(e => e !== user._id);
        } else {
            newBook.total_likes = Number(newBook.total_likes)
            newBook.total_likes -= 1
            newBook.liked_by = []
            newBook.liked_by = newBook.liked_by.filter(e => e !== user._id);
        }
    }

    
    return filledHeart, nonFilledHeart, bookId, likedByUser, user, newBook
}