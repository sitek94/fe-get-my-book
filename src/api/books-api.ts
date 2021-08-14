import { Book } from '../types';
import http from './http';

const booksApi = {
  // TODO: Probably more suitable method name would be "scrapeBook" as this
  // is what is actually happening there
  getBook,
  addBook,
};

/**
 * Gets scraped book's data from URL.
 */
async function getBook(url: string) {
  const res = await http.get<Book>('/', {
    params: {
      url,
    },
  });

  return res.data;
}

/**
 * Adds the book to Notion DB
 */
async function addBook(book: Book) {
  const res = await http.post<Book>('/book', book);

  return res.data;
}

export default booksApi;
