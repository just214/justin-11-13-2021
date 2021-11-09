// Base button...just bring your favorite Tailwind color
import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "info";
}

const classNamesMap = {
  primary: "bg-purple-700 hover:bg-purple-800",
  info: "bg-gray-700 hover:bg-gray-800",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { children, className, variant = "primary", ...restOfProps } = props;
    return (
      <button
        ref={ref}
        className={`px-8 py-2 text-white rounded-md transition-colors ${classNamesMap[variant]} ${className}`}
        {...restOfProps}>
        {props.children}
      </button>
    );
  }
);
