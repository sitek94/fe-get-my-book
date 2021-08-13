import * as React from 'react';
import booksApi from './api/books-api';
import ControlledTagsField, {
  useTagsField,
} from './components/ControlledTagsField';
import TextField from './components/TextField';
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
    <div className="max-w-lg mx-auto text-gray-900">
      <header className="py-12">
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
        <AddBookForm />
      </main>
    </div>
  );
}

const dummyTags = ['autobiography', 'nonfiction', 'motivation'];

function AddBookForm() {
  const [title, setTitle] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [pagesCount, setPagesCount] = React.useState(0);
  const tagsFieldProps = useTagsField(dummyTags);
  const { tags } = tagsFieldProps;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      title,
      author,
      pagesCount,
      tags,
    };
    console.log(body);
  };

  return (
    <form className="space-y-2">
      <TextField
        id="title"
        label="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <TextField
        id="author"
        label="Author"
        value={author}
        onChange={e => setAuthor(e.target.value)}
      />
      <TextField
        id="pagesCount"
        type="number"
        label="Pages count"
        value={pagesCount}
        onChange={e => setPagesCount(Number(e.target.value))}
      />
      <div>
        <label className="mb-1 label">Tags</label>
        <ControlledTagsField {...tagsFieldProps} />
      </div>
      <button onClick={onSubmit}>Submit</button>
    </form>
  );
}

export default App;
