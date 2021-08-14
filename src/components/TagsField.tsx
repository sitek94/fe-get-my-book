import * as React from 'react';
import Tag from './Tag';

interface TagsFieldProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

function TagsField({ tags, setTags }: TagsFieldProps) {
  const [input, setInput] = React.useState('');
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
    <div className="space-y-4">
      <input
        className="input"
        value={input}
        placeholder="Enter a tag"
        onKeyDown={onKeyDown}
        onKeyUp={() => setIsKeyReleased(true)}
        onChange={e => setInput(e.target.value)}
      />
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <Tag key={tag} label={tag} onDeleteClick={() => deleteTag(tag)} />
        ))}
      </div>
    </div>
  );
}

export default TagsField;
