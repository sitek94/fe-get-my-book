import * as React from 'react';
import { XIcon } from '@heroicons/react/outline';
import clsx from 'clsx';

interface TagProps {
  className?: string;
  label: React.ReactNode;
  onDeleteClick: () => void;
}

function Tag({ className, label, onDeleteClick }: TagProps) {
  return (
    <span
      className={clsx(
        'border text-gray-700 bg-white border-gray-300',
        'inline-flex items-center p-2 text-base rounded-full ',
        className,
      )}
    >
      <span className="ml-2 mr-1">{label}</span>
      <button
        className="p-1 bg-transparent rounded-full hover hover:bg-gray-300"
        onClick={onDeleteClick}
      >
        <XIcon className="w-4 h-4" />
      </button>
    </span>
  );
}

export default Tag;
