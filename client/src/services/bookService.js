
import * as request from "./request";
const baseUrl = 'http://localhost:3030/jsonstore/books';

export const getBooks = () => request.get(baseUrl)