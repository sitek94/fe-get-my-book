import * as React from 'react';
import booksApi from './api/books-api';
import AddBookForm from './components/AddBookForm';
import { Book } from './types';

function App() {
  const [input, setInput] = React.useState('');
  const [book, setBook] = React.useState<Book | null>(null);
  const [error, setError] = React.useState<Error | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const bookData = await booksApi.getBook(input);
      setBook(bookData);
    } catch (error) {
      if (error instanceof Error) {
        setBook(null);
        setError(error);
      }
    }
  };

  return (
    <div className="max-w-lg mx-auto text-gray-900">
      <header className="py-4">
        <h1 className="mb-4 text-4xl font-bold text-center">Get My Book</h1>

        <form onSubmit={handleSubmit}>
          <input
            className="input"
            name="url"
            type="text"
            placeholder="Enter URL with book's data..."
            value={input}
            onChange={e => setInput(e.currentTarget.value)}
          />
        </form>
        {error && <p>{error.message}</p>}
      </header>

      <main className="space-y-4">
        {book && <AddBookForm initialValues={book} />}
      </main>
    </div>
  );
}

export default App;
