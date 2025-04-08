export default function RadioButton({ label, className, ...props }) {
  return (
    <label className="flex items-center">
      <input 
        type="radio" 
        className={`peer sr-only ${className || ''}`}
        {...props}
      />
      <span className="flex justify-center items-center rounded-full w-5 h-5 outline -outline-offset-1 outline-gray peer-checked:outline-secondary transition-all duration-500 bg-white after:rounded-full after:w-2.5 after:h-2.5 after:bg-secondary after:opacity-0 peer-checked:after:opacity-100 after:transition-opacity after:duration-500">
      </span>
      <span className="ml-3">{label}</span>
    </label>
  )
}