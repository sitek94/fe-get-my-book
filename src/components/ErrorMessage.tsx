import { EmojiSadIcon } from '@heroicons/react/outline';

interface ErrorMessageProps {
  title: string;
  description?: string;
}

function ErrorMessage({ title, description }: ErrorMessageProps) {
  return (
    <div className="space-y-2 text-center">
      <EmojiSadIcon className="inline-block w-24 h-24 text-red-400" />
      <h2 className="text-2xl font-medium">{title}</h2>
      {description && <p className="text-sm">{description}</p>}
    </div>
  );
}

export default ErrorMessage;
