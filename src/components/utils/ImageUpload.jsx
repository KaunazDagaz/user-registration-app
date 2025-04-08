import { useCallback, useState } from "react"

export default function ImageUpload({ onChange, error, wrapperClassName, ...props }) {
  const [image, setImage] = useState(undefined);

  const handleFileUpload = useCallback(async (event) => {
    const file = event.target?.files?.[0]
    setImage(file)
    onChange(file)
  }, [onChange])

  return (
    <div className={wrapperClassName}>
      <label 
        className={
          "isolate flex w-full outline -outline-offset-1 outline-gray rounded-sm" +
          (error ? " !outline-error-red outline-2 -outline-offset-2" : "")
        }
      >
        <span 
          className={
            "block cursor-pointer z-10 px-3.75 py-3.5 outline -outline-offset-1 outline-black rounded-l-sm" +
            (error ? " !outline-error-red outline-2 -outline-offset-2" : "")
          }
        >
          Upload
        </span>
        <span 
          className={
            "block w-full truncate grow px-4 py-3.5 text-darkgray" +
            (image ? " !text-black" : "")
          }
        >
          {image ? image.name : props.placeholder}
        </span>
        <input 
          {...props}
          type="file" 
          accept="image/jpeg,image/jpg" 
          className="hidden" 
          onChange={handleFileUpload}
        />
      </label>
      {error && (
        <span className="text-error-red text-helper mx-4 mt-1">{error}</span>
      )}
    </div>
  )
}