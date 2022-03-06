import React from "react";

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & { label?: string };

const FormRowInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ onChange, onBlur, name, label, ...props }, ref) => {
    return (
      <div className="mb-4 w-full">
        <label
          htmlFor="position"
          className="block mb-2 text-base font-bold text-gray-900 dark:text-gray-200"
        >
          {label}
        </label>
        <input
          className="w-full px-3 py-2 leading-tight text-gray-900 border rounded shadow-md appearance-none focus:outline-none focus:shadow-outline dark:bg-white"
          id={name}
          aria-label={`${name}-input`}
          aria-errormessage={`${name}-error`}
          name={name}
          aria-invalid="true"
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
          {...props}
        />
      </div>
    );
  }
);

FormRowInput.displayName = "FormRowInput";
export default FormRowInput;
