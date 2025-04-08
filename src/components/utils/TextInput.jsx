import { React } from "react"

export default function TextInput({ placeholder, error, helperText, ...props }) {
  return (
    <div className={props.className}>
      <label 
        className={`relative flex w-full outline rounded-sm outline-gray -outline-offset-1 ${
          error ? '!outline-error-red !outline-2' : ''
        }`}
      >
        <input 
          {...props}
          type="text" 
          placeholder={placeholder}
          className="peer text-black w-full py-3.5 px-4 placeholder:opacity-0 focus:outline-none"
        />
        <span 
          className="absolute -top-2 left-4 text-helper bg-background px-1 cursor-text transition-all duration-300 text-darkgray peer-placeholder-shown:top-3.5 peer-placeholder-shown:px-0 peer-placeholder-shown:text-basic peer-focus:-top-2 peer-focus:px-1 peer-focus:text-helper"
        >
          {placeholder}
        </span>
      </label>
      {helperText && !error && (
        <span className="text-darkgray text-helper mx-4">{helperText}</span>
      )}
      {error && (
        <span className="text-error-red text-helper mx-4 mt-1">{error}</span>
      )}
    </div>
  )
}