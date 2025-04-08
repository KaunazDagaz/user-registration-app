import React from "react";

export default function Button({ children, className, ...props}) {
  return (
    <button
      className={`block py-1 w-fit px-4.75 min-w-[100px] bg-primary rounded-[80px] hover:bg-button-hover transition-colors duration-300 disabled:bg-disabled disabled:text-text-disabled ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
}
