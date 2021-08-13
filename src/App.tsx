import * as React from 'react';
import booksApi from './api/books-api';
import { Book } from './types';
import { XIcon } from '@heroicons/react/outline';
import clsx from 'clsx';

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
        <TagInputExample />
      </main>
    </div>
  );
}

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

function TextField({ id, label, ...rest }: TextFieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 label">
        {label}
      </label>
      <input id={id} className="input" {...rest} />
    </div>
  );
}

const dummyTags = ['autobiography', 'nonfiction', 'motivation'];

interface TagProps {
  children: React.ReactNode;
}

function Tag({ children }: TagProps) {
  return (
    <span
      className={clsx(
        'border text-gray-700 bg-white border-gray-300',
        'inline-flex items-center p-2 text-base rounded-full ',
      )}
    >
      <span className="ml-2 mr-1">{children}</span>
      <button className="p-1 bg-transparent rounded-full hover hover:bg-gray-300">
        <XIcon className="w-4 h-4" />
      </button>
    </span>
  );
}

function AddBookForm() {
  return (
    <form className="space-y-2">
      <TextField id="title" label="Title" />
      <TextField id="author" label="Author" />
      <TextField id="pagesCount" type="number" label="Pages count" />
      <div>
        <label className="mb-1 label">Tags</label>
        <div className="flex space-x-2">
          {dummyTags.map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
    </form>
  );
}

function TagInputExample() {
  const [input, setInput] = React.useState('');
  const [tags, setTags] = React.useState(dummyTags);
  const [isKeyReleased, setIsKeyReleased] = React.useState(true);

  const onKeyDown = (event: React.KeyboardEvent) => {
    const { key } = event;
    const trimmedInput = input.trim();

    // Add new tag when pressing comma
    if (key === ',' && trimmedInput && !tags.includes(trimmedInput)) {
      event.preventDefault();

      setTags(tags.concat(trimmedInput));
      setInput('');
    }

    // Remove tag when pressing backspace
    if (key === 'Backspace' && !input && tags.length && isKeyReleased) {
      event.preventDefault();

      const tagsCopy = [...tags];
      const poppedTag = tagsCopy.pop();

      setTags(tagsCopy);
      setInput(poppedTag || '');
    }

    setIsKeyReleased(false);
  };

  const deleteTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  return (
    <div>
      {tags.map(tag => (
        <div key={tag}>
          <span>{tag}</span>
          <button onClick={() => deleteTag(tag)}>X</button>
        </div>
      ))}
      <input
        className="w-full"
        value={input}
        placeholder="Enter a tag"
        onKeyDown={onKeyDown}
        onKeyUp={() => setIsKeyReleased(true)}
        onChange={e => setInput(e.target.value)}
      />
    </div>
  );
}

export default App;
