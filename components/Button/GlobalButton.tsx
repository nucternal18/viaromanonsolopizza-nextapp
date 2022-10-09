import React, { forwardRef, ReactNode } from "react";

export type Ref = HTMLButtonElement;

type ButtonProps = {
  disabled?: boolean;
  className?: string;
  color: string;
  type: "submit" | "button";
  children?: ReactNode;
  props?: any;
};

const Button: React.FunctionComponent<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > &
    ButtonProps
> = forwardRef<Ref, ButtonProps>(
  (
    { children, disabled, className, type, color, ...props }: ButtonProps,
    ref
  ) => (
    <button
      ref={ref}
      disabled={disabled}
      type={type}
      className={`${colors[color]} ${className} ${
        disabled ? "opacity-60 cursor-not-allowed" : ""
      }   focus:outline-none shadow rounded px-4 py-2 font-medium transition flex items-center justify-center ease-in duration-200`}
      {...props}
    >
      {children}
    </button>
  )
);

const colors = {
  primary: `border-blue-700 border-2 text-blue-700 active:bg-blue-700 active:text-white hover:bg-blue-700 hover:text-white`,
  success: `border-green-700 border-2 text-green-700 active:bg-green-700 active:text-white`,
  danger: `border-red-600 border text-red-600 active:bg-red-600 active:text-white`,
  dark: `border-black border text-gray-900 dark:text-gray-200 active:bg-black active:text-white hover:bg-black hover:text-white`,
  warning: `border-red-500 border text-red-500 hover:bg-red-500 hover:text-white`,
  indigo: `border-indigo-900 border-2 text-indigo-900 active:bg-indigo-900 active:text-white`,
  yellow: `border-yellow-500 border text-yellow-500 active:bg-yellow-500 active:text-white text-center hover:bg-yellow-500 hover:text-white`,
};

Button.displayName = "Button";

export default Button;
