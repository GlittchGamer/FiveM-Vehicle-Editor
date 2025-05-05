import * as React from 'react';

import { cn } from '@/lib/utils';
import { IconDefinition } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputAdornment?: IconDefinition;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <div className="relative flex items-center w-full rounded-md">
      {props.inputAdornment && (
        <span className="p-[1rem] text-sm text-white bg-slate-900 h-9 flex items-center align-middle rounded-l-md border border-input border-r-0">
          <FontAwesomeIcon icon={props.inputAdornment} />
        </span>
      )}
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-slate-900 text-white py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-200 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          props.inputAdornment && 'rounded-l-none border-l-0 pl-0',
          className,
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});
Input.displayName = 'Input';

export { Input };
