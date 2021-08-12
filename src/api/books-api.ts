import { Book } from '../types';
import http from './http';

const booksApi = {
  getBook,
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

export default booksApi;
