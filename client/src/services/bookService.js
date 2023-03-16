
import * as request from "./request";

const baseUrl = 'http://localhost:3030/jsonstore/books';

const secondUrl = 'http://localhost:3030/data/books';

export const getInitialBooks = () => request.get(baseUrl)

export const getBooks = () => request.get(secondUrl)

export const getFromStore = (bookId) => request.get(`${baseUrl}/${bookId}`)

export const getFromData = (bookId) => request.get(`${secondUrl}/${bookId}`)

export const create = (booksData) => request.post(secondUrl, booksData)