import clsx from 'clsx';
import {
  EmojiSadIcon,
  CheckCircleIcon,
  SearchIcon,
} from '@heroicons/react/outline';
import { DivBaseProps, HeroIcon } from '../types';

interface MessageBaseProps extends DivBaseProps {
  title: string;
  description?: React.ReactNode;
  iconClasses?: string;
  Icon?: HeroIcon;
}

interface MessageProps extends Omit<MessageBaseProps, 'Icon' | 'iconClasses'> {}

export function Message({
  title,
  description,
  className,
  Icon,
  iconClasses,
  ...rest
}: MessageBaseProps) {
  return (
    <div className={clsx('space-y-2 text-center', className)} {...rest}>
      {Icon && <Icon className={clsx('inline-block w-24 h-24', iconClasses)} />}
      <h2 className="text-2xl font-medium">{title}</h2>
      {description && <p className="text-sm">{description}</p>}
    </div>
  );
}

export function ErrorMessage(props: MessageProps) {
  return <Message Icon={EmojiSadIcon} iconClasses="text-red-500" {...props} />;
}

export function SuccessMessage(props: MessageProps) {
  return (
    <Message Icon={CheckCircleIcon} iconClasses="text-green-500" {...props} />
  );
}

export function LoadingMessage(props: MessageProps) {
  return (
    <Message
      Icon={SearchIcon}
      iconClasses="text-blue-500 animate-bounce"
      {...props}
    />
  );
}
