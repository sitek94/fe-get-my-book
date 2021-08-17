import * as React from 'react';
import { Book } from '../types';
import OverlayButton from './OverlayButton';
import TagsField from './TagsField';
import TextField from './TextField';

interface AddBookFromProps {
  initialValues: Book;
  isLoading: boolean;
  onSubmit: (book: Book) => void;
}

function AddBookForm({ initialValues, isLoading, onSubmit }: AddBookFromProps) {
  const [title, setTitle] = React.useState(initialValues.title);
  const [author, setAuthor] = React.useState(initialValues.author);
  const [pagesCount, setPagesCount] = React.useState(initialValues.pagesCount);
  const [tags, setTags] = React.useState(initialValues.tags);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const book = {
      title,
      author,
      pagesCount,
      tags,
    };

    onSubmit(book);
  };

  const isFormValid = !!(title && author);

  return (
    <form className="space-y-2" onSubmit={handleSubmit}>
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
        <TagsField tags={tags} setTags={setTags} />
      </div>

      <OverlayButton
        type="submit"
        label="Submit"
        show={isFormValid}
        isLoading={isLoading}
      />
    </form>
  );
}

export default AddBookForm;
