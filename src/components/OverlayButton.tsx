import clsx from 'clsx';
import { ButtonBaseProps } from '../types';

interface OverlayButtonProps extends ButtonBaseProps {
  label: string;
  show: boolean;
  isLoading?: boolean;
}

function OverlayButton({
  label,
  show = true,
  isLoading,
  ...rest
}: OverlayButtonProps) {
  const baseClasses = 'bg-blue-500 hover:bg-blue-600';
  const loadingClasses = 'animate-pulse bg-gray-400';

  return (
    <button
      className={clsx(
        'fixed bottom-0 left-0 w-full p-6 text-base font-medium uppercase text-white',
        'transition transform ease-in-out duration-300',
        show ? 'translate-y-0' : 'translate-y-full',
        isLoading ? loadingClasses : baseClasses,
      )}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? 'Loading...' : label}
    </button>
  );
}

export default OverlayButton;
