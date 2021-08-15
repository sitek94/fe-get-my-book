import * as React from 'react';

interface SearchBoxProps {
  onSearchSubmit: (input: string) => void;
}

function SearchBox({ onSearchSubmit }: SearchBoxProps) {
  const [input, setInput] = React.useState('');

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSearchSubmit(input);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        className="input"
        name="url"
        type="text"
        placeholder="Enter URL with book's data..."
        value={input}
        onChange={e => setInput(e.currentTarget.value)}
      />
    </form>
  );
}

export default SearchBox;
