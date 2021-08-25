import booksApi from './api/books-api';
import SearchBox from './components/SearchBox';
import AddBookForm from './components/AddBookForm';
import Link from './components/Link';
import { Book } from './types';
import { useAsync } from './hooks/use-async';
import {
  ErrorMessage,
  LoadingMessage,
  Message,
  SuccessMessage,
} from './components/Message';

function App() {
  const searchState = useAsync<Book>();
  const bookState = useAsync();

  const onSearchSubmit = (input: string) => {
    bookState.reset();
    searchState.run(booksApi.scrapeBookData(input));
  };

  const onAddBookSubmit = (book: Book) => {
    bookState.run(booksApi.addBook(book));
  };

  const error = searchState.error || bookState.error;

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

        {searchState.status === 'idle' && (
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

        {searchState.status === 'pending' && (
          <LoadingMessage
            className="pt-8"
            title="Loading..."
            description="Please wait, we scrape your book's data."
          />
        )}

        {searchState.status === 'resolved' &&
          bookState.status !== 'resolved' &&
          searchState.data && (
            <AddBookForm
              initialValues={searchState.data}
              onSubmit={onAddBookSubmit}
              isLoading={bookState.status === 'pending'}
            />
          )}

        {bookState.status === 'resolved' && (
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
