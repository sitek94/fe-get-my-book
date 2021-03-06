import { InputBaseProps } from '../types';

interface TextFieldProps extends InputBaseProps {
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

export default TextField;
