import { forwardRef, FunctionComponent, ReactNode } from "react";

export type Ref = HTMLButtonElement;

type ButtonProps = {
  disabled?: boolean;
  className?: string;
  color?: string;
  type?: "submit" | "button";
  children?: ReactNode;
  props?: any;
};

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const TableButton: FunctionComponent<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > &
    ButtonProps
> = forwardRef<Ref, ButtonProps>(
  ({ children, className, ...rest }: ButtonProps, ref) => (
    <button
      ref={ref}
      type="button"
      className={classNames(
        "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50",
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
);

export const PageButton: FunctionComponent<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > &
    ButtonProps
> = forwardRef<Ref, ButtonProps>(
  ({ children, className, ...rest }: ButtonProps, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={classNames(
          "relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50",
          className
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

TableButton.displayName = "Button";
PageButton.displayName = "PageButton";
