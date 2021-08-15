import { RefreshIcon } from '@heroicons/react/outline';
import * as React from 'react';
import booksApi from './api/books-api';
import AddBookForm from './components/AddBookForm';
import SearchBox from './components/SearchBox';
import { Book } from './types';

function App() {
  const [book, setBook] = React.useState<Book | null>(null);
  const [error, setError] = React.useState<Error | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const onSearchSubmit = async (input: string) => {
    setIsLoading(true);
    setBook(null);
    setError(null);

    try {
      const bookData = await booksApi.getBook(input);
      setBook(bookData);
    } catch (error) {
      if (error instanceof Error) {
        setBook(null);
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onAddBookSubmit = async (book: Book) => {
    setIsLoading(true);

    try {
      await booksApi.addBook(book);
      setBook(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isSpinnerVisible = !book && isLoading;
  const isInfoTextVisible = !book && !isLoading;

  return (
    <div className="max-w-lg mx-auto text-gray-900">
      <header className="py-4">
        <h1 className="mb-4 text-4xl font-bold text-center">Get My Book</h1>

        <SearchBox onSearchSubmit={onSearchSubmit} />
        {error && <p>{error.message}</p>}
      </header>

      <main className="space-y-4">
        {isInfoTextVisible && (
          <p className="text-sm text-center text-gray-700">
            Please enter a link of a book that you want to get the data. For the
            time being we only support links from{' '}
            <a className="text-blue-500" href="https://lubimyczytac.pl">
              lubimyczytać.pl
            </a>
          </p>
        )}

        {isSpinnerVisible && (
          <div className="flex justify-center py-8 text-blue-500">
            <RefreshIcon className="w-16 h-16 animate-spin" />
          </div>
        )}

        {book && (
          <AddBookForm
            initialValues={book}
            onSubmit={onAddBookSubmit}
            isLoading={isLoading}
          />
        )}
      </main>
    </div>
  );
}

export default App;
