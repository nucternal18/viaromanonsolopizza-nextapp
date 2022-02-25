import React from "react";
import { FaCaretDown } from "react-icons/fa";
import { Path, useForm, UseFormRegister, SubmitHandler } from "react-hook-form";
interface IFormRowSelect {
  name: string;
  type: string;
  list: string[];
  register: any;
}

interface IFormValues {
  list: string[];
}

const FormRowSelect = React.forwardRef<
  HTMLSelectElement,
  { label: string; list: string[] } & ReturnType<UseFormRegister<IFormValues>>
>(({ onChange, onBlur, name, label, list }, ref) => {
  return (
    <div className="mb-4 w-full">
      <label
        htmlFor={name}
        className="block mb-2 text-base font-bold text-gray-900 dark:text-gray-200"
      >
        {label}
      </label>
      <div className="flex items-center bg-white border rounded shadow-md px-2">
        <select
          className="w-full px-3 py-2 leading-tight text-gray-900  appearance-none focus:outline-none focus:shadow-outline dark:bg-white"
          id={name}
          aria-label={`${name}-input`}
          aria-errormessage={`${name}-error`}
          name={name}
          aria-invalid="true"
          ref={ref}
          onChange={onChange}
          onBlur={onBlur}
        >
          {list?.map((itemValue, index) => {
            return (
              <option key={`${index} + ${itemValue}`} value={itemValue}>
                {itemValue}
              </option>
            );
          })}
        </select>
        <FaCaretDown />
      </div>
    </div>
  );
});

FormRowSelect.displayName = "FormRowSelect";

export default FormRowSelect;
