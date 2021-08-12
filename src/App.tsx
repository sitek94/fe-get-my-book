import * as React from 'react';
import booksApi from './api/books-api';
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
        setError(error);
      }
    }
  };

  const createBook = () => {
    console.log(book);
    fetch('http://localhost:5000/book', {
      method: 'POST',
      body: JSON.stringify(book),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(console.log)
      .catch(console.log);
  };

  return (
    <div className="container text-gray-900">
      <header className="pt-12">
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
      {/* <main>
        {book && (
          <>
            <h2>Your book:</h2>
            <h3>Title: {book.title}</h3>
            <h3>Author: {book.author}</h3>
            <h3>Pages: {book.pagesCount}</h3>
            <h3>Tags:</h3>
            <ul>
              {book.tags.map(tag => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </>
        )}
        <button onClick={createBook}>CREATE</button>
      </main>
    */}
    </div>
  );
}

export default App;
