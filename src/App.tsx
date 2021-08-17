import * as React from 'react';

import booksApi from './api/books-api';
import SearchBox from './components/SearchBox';
import AddBookForm from './components/AddBookForm';
import {
  ErrorMessage,
  LoadingMessage,
  Message,
  SuccessMessage,
} from './components/Message';
import Link from './components/Link';
import { Book } from './types';

function App() {
  const [isInitialState, setIsInitialState] = React.useState(true);
  const [book, setBook] = React.useState<Book | null>(null);
  const [isScrapingBook, setIsScrapingBook] = React.useState(false);
  const [isScrapingSuccess, setIsScrapingSuccess] = React.useState(false);
  const [isSubmittingBook, setIsSubmittingBook] = React.useState(false);
  const [isSubmittingSuccess, setIsSubmittingSuccess] = React.useState(false);
  const [error, setError] = React.useState<Error | null>(null);

  const onSearchSubmit = async (input: string) => {
    setIsInitialState(false);
    setIsScrapingBook(true);
    setIsScrapingSuccess(false);
    setBook(null);
    setError(null);

    try {
      const bookData = await booksApi.scrapeBookData(input);
      setBook(bookData);
      setIsScrapingSuccess(true);
    } catch (error) {
      if (error instanceof Error) {
        setBook(null);
        setError(error);
      }
    } finally {
      setIsScrapingBook(false);
    }
  };

  const onAddBookSubmit = async (book: Book) => {
    setIsSubmittingBook(true);
    setIsSubmittingSuccess(false);

    try {
      await booksApi.addBook(book);
      setBook(null);
      setIsSubmittingSuccess(true);
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    } finally {
      setIsSubmittingBook(false);
    }
  };

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

        {isInitialState && (
          <Message
            title="Hey there!"
            description={
              <>
                Enter a link of a book that you want to get the data. For the
                time being we only support links from{' '}
                <Link to="https://lubimyczytac.pl">lubimyczytać.pl</Link>
              </>
            }
          />
        )}

        {isScrapingBook && (
          <LoadingMessage
            className="pt-8"
            title="Loading..."
            description="Please wait, we scrape your book's data."
          />
        )}

        {isScrapingSuccess && book && (
          <AddBookForm
            initialValues={book}
            onSubmit={onAddBookSubmit}
            isLoading={isSubmittingBook}
          />
        )}

        {isSubmittingSuccess && (
          <SuccessMessage
            title="Success!"
            description="The book was added to the database."
          />
        )}
      </main>
    </div>
  );
}

export default App;
