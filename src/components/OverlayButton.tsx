import clsx from 'clsx';
import { ButtonBaseProps } from '../types';

interface OverlayButtonProps extends ButtonBaseProps {
  label: string;
  show?: boolean;
}

function OverlayButton({ label, show = true, ...rest }: OverlayButtonProps) {
  return (
    <button
      className={clsx(
        'fixed bottom-0 left-0 w-full p-6 text-base font-medium uppercase',
        'text-white  bg-blue-500 hover:bg-blue-600',
        'transition transform ease-in-out duration-300',
        show ? 'translate-y-0' : 'translate-y-full',
      )}
      {...rest}
    >
      {label}
    </button>
  );
}

export default OverlayButton;
