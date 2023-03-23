import uniqid from 'uniqid';



export const SubmitReview = (review, user, newBook, bookId, clearFiled) => {

    const reviewedBookData = {}

    if (!(reviewedBookData.hasOwnProperty(user.username))) {
        reviewedBookData[user.username] = [review,]
        reviewedBookData['_id'] = uniqid()
    } else {
        reviewedBookData[user.username].push(review)
    }

    if (newBook.reviews.length > 0) {
        newBook.reviews.push(reviewedBookData)
    } else {
        newBook.reviews = []
        newBook.reviews.push(reviewedBookData)
    }

    clearFiled.value = ''

    const objectId = Number(bookId) - 1

    
    return review, user, newBook, bookId, clearFiled
}