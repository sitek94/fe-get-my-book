import * as React from 'react';
import { SearchIcon } from '@heroicons/react/outline';

import booksApi from './api/books-api';
import SearchBox from './components/SearchBox';
import AddBookForm from './components/AddBookForm';
import ErrorMessage from './components/ErrorMessage';
import Link from './components/Link';
import { Book } from './types';

function App() {
  const [book, setBook] = React.useState<Book | null>(null);
  const [isSubmittingSearch, setIsSubmittingSearch] = React.useState(false);
  const [isSubmittingForm, setIsSubmittingForm] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const onSearchSubmit = async (input: string) => {
    setIsSubmittingSearch(true);
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
      setIsSubmittingSearch(false);
    }
  };

  const onAddBookSubmit = async (book: Book) => {
    setIsSubmittingForm(true);

    try {
      await booksApi.addBook(book);
      setBook(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    } finally {
      setIsSubmittingForm(false);
    }
  };

  const isInfoMsgVisible =
    !book && !isSubmittingForm && !error && !isSubmittingSearch;

  return (
    <div className="max-w-lg mx-auto text-gray-700">
      <header className="py-4">
        <h1 className="mb-4 text-4xl font-bold text-center">Get My Book</h1>
        <SearchBox onSearchSubmit={onSearchSubmit} />
      </header>

      <main className="space-y-4">
        {error && (
          <ErrorMessage
            title="Something went wrong"
            description={error.message}
          />
        )}

        {isInfoMsgVisible && (
          <p className="text-sm text-center text-gray-700">
            Please enter a link of a book that you want to get the data. For the
            time being we only support links from{' '}
            <Link to="https://lubimyczytac.pl">lubimyczytać.pl</Link>
          </p>
        )}

        {isSubmittingSearch && (
          <div className="flex justify-center py-8 text-blue-500">
            <SearchIcon className="w-24 h-24 animate-bounce" />
          </div>
        )}

        {book && (
          <AddBookForm
            initialValues={book}
            onSubmit={onAddBookSubmit}
            isLoading={isSubmittingForm}
          />
        )}
      </main>
    </div>
  );
}

export default App;
