
import * as request from "./request";

const baseUrl = 'http://localhost:3030/jsonstore/books';

const secondUrl = 'http://localhost:3030/data/books';

const likeUrl = 'http://localhost:3030/jsonstore/likes';

const usersUrl = 'http://localhost:3030/jsonstore/users';

// GET
export const getInitialBooks = () => request.get(baseUrl)

export const getBooks = () => request.get(secondUrl)

export const getFromStore = (bookId) => request.get(`${baseUrl}/${bookId}`)

export const getFromData = (bookId) => request.get(`${secondUrl}/${bookId}`)

export const getUsers = () => request.get(usersUrl)

// POST

export const createUser = (userData) => request.post(usersUrl, userData)

export const create = (booksData) => request.post(secondUrl, booksData)

export const like = (booksData) => request.post(likeUrl, booksData)
export const likeUpdate = (likeId, currentLikedBook) => request.put(`${likeUrl}/${likeId}`,currentLikedBook)


// UPDATE

export const editInitial = (bookId, finalBook) => request.put(`${baseUrl}/${bookId}`, finalBook)


export const editBooks = (bookId, booksData) => request.put(`${secondUrl}/${bookId}`, booksData)

// DELETE

export const removeInitialBook = (bookId) => request.del(`${baseUrl}/${bookId}`)

export const removeBook = (bookId) => request.del(`${secondUrl}/${bookId}`)

export const removeLiked = (newId) => request.del(`${likeUrl}/${newId}`)