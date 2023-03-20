
import * as request from "./request";

const baseUrl = 'http://localhost:3030/jsonstore/books';

const secondUrl = 'http://localhost:3030/data/books';

// GET
export const getInitialBooks = () => request.get(baseUrl)

export const getBooks = () => request.get(secondUrl)

export const getFromStore = (bookId) => request.get(`${baseUrl}/${bookId}`)

export const getFromData = (bookId) => request.get(`${secondUrl}/${bookId}`)

// POST

export const create = (booksData) => request.post(secondUrl, booksData)

// UPDATE

export const editInitial = (bookId, finalBook) => request.put(`${baseUrl}/${bookId}`, finalBook)


export const editBooks = (bookId, booksData) => request.put(`${secondUrl}/${bookId}`, booksData)

// DELETE

export const removeInitialBook = (bookId) => request.del(`${baseUrl}/${bookId}`)

export const removeBook = (bookId) => request.del(`${secondUrl}/${bookId}`)